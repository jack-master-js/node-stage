const Sequelize = require('sequelize')
const { mysql_db } = require('../../config')

module.exports = new Sequelize(
    mysql_db.database,
    mysql_db.user,
    mysql_db.password,
    {
        host: mysql_db.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
)
