const dev_config = require('./configs/config.dev')
const prod_config = require('./configs/config.prod')
const uat_config = require('./configs/config.uat')

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

function loadConfig() {
    const env = process.env.NODE_ENV
    console.log(`env: ${env}`)

    switch (env) {
        case 'prod':
            return prod_config
            break

        case 'uat':
            return uat_config
            break

        default:
            return dev_config
    }
}

module.exports = loadConfig()
