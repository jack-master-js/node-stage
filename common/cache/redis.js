const Redis = require("ioredis")
const {redis} = require('../../config')

module.exports = new Redis(redis)
