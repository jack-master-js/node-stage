const express = require('express')
const router = express.Router()
const service = require('./server.service')

router.post('/upload', service.upload)

module.exports = router
