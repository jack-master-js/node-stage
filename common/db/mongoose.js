const Mongoose = require('mongoose')
const logger = require('../utils/logger')
const { mongo_db } = require('../../config')

/**
 * 使用 Node 自带 Promise 代替 Mongoose 的 Promise,否则会报错
 */
Mongoose.Promise = global.Promise
const url = `mongodb://${mongo_db.user}:${mongo_db.password}@${mongo_db.host}:${mongo_db.port}/${mongo_db.database}`
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true, //Server Discovery and Monitoring engine
    poolSize: 5, // 连接池中维护的连接数
    keepAlive: 120,
}
const options = {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
            delete ret._id
            return ret
        },
    },
}

const mongoose = Mongoose.createConnection(url, connectOptions)

mongoose.on('connected', () => {
    logger.info(`[mongodb connection] connected`)
})

mongoose.on('error', (err) => {
    logger.error(`[mongodb connection] ${err.message}`)
})

mongoose.on('disconnected', () => {
    logger.info(`[mongodb connection] disconnected`)
})

module.exports = {
    mongoose,
    options,
}
