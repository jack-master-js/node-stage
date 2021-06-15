const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const compression = require('compression')
const responseTime = require('response-time')
const timeout = require('connect-timeout')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const logger = require('../../common/utils/logger')
const sse = require('./sse.server')
const app = express()
const responser = require('../../common/middleware/responser')

// views
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

function registerHbs() {
    hbs.registerPartials(__dirname + '/views/components')
    hbs.registerHelper('css', function (str, option) {
        let cssList = this.cssList || []
        str = str.split(/[,，;；]/)
        str.forEach(function (item) {
            if (cssList.indexOf(item) < 0) {
                cssList.push(item)
            }
        })
        this.cssList = cssList.concat()
    })
    hbs.registerHelper('js', function (str, option) {
        let jsList = this.jsList || []
        str = str.split(/[,，;；]/)
        str.forEach(function (item) {
            if (jsList.indexOf(item) < 0) {
                jsList.push(item)
            }
        })
        this.jsList = jsList.concat()
    })
}

function hbsMiddleware(req, res, next) {
    registerHbs()
    next()
}

// scss && hbs
// if (process.env.NODE_ENV === 'dev') {
//     app.use(
//         sassMiddleware({
//             src: path.join(__dirname, 'styles'),
//             dest: path.join(__dirname, 'public'),
//             outputStyle: 'compressed',
//             sourceMap: true,
//             debug: true,
//         })
//     )
//     app.use(hbsMiddleware)
// } else {
//     registerHbs()
// }

// static
app.use(express.static(__dirname + '/public'))

// favicon
app.use(favicon(__dirname + '/public/favicon.ico'))

// cors
app.use(cors())

// session
const sess = {
    secret: 'sess key',
    name: 'session_id', //默认connect.sid
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 10 * 60 * 1000, //10分钟
    },
    rolling: true, //重置 cookie 过期时间
}
app.use(session(sess)) //req.session

// cookie
app.use(cookieParser()) //req.cookies || req.signedCookies

// request
app.use(bodyParser.json()) //req.body
app.use(bodyParser.urlencoded({ extended: true }))

// response
app.use(compression())
app.use(
    responseTime((req, res, time) =>
        logger.info(`[http server] request ${req.url} response time: ${time}ms`)
    )
)
app.use(timeout('3s')) //req.timeout

// routes
app.use(responser)
app.use('/', require('./server.router'))
app.use('/api', require('./api.router'))
app.use('/user', require('../user/user.router'))
app.use('/sse', sse.init)

// 404
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error
app.use(function (err, req, res, next) {
    res.error(err)
})

module.exports = app
