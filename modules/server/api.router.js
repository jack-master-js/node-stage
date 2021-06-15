const express = require('express')
const router = express.Router()
const service = require('./server.service')
const uploader = require('../../common/middleware/uploader')

router.post('/upload', uploader.single('file'), service.upload)

module.exports = router
