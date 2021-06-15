const express = require('express')
const router = express.Router()
const service = require('./server.service')
const sse = require('./sse.server')

router.get('/', service.home)
router.get('/sendServerEvent', (req, res) => {
    setInterval(() => {
        sse.send('content')
        sse.send('customEvent1 content', 'customEvent1')
        sse.send('customEvent2 content', 'customEvent2', 'customID')
        sse.serialize([
            'array',
            'to',
            'be',
            'sent',
            'as',
            'serialized',
            'events',
        ])
    }, 1000)

    res.send('send success')
})

module.exports = router
