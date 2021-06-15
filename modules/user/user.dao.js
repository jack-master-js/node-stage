const oracle = require('../../common/db/oracle')
const SequelizeDao = require('../../common/class/SequelizeDao')
// const MongooseDao = require('../../common/class/MongooseDao')
const User = require('./entity/User')
// const User = require('./model/User')
// const PrismaDao = require('../../common/class/PrismaDao')
// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()

class UserDao extends SequelizeDao {
    // class UserDao extends MongooseDao {
    // class UserDao extends PrismaDao {
    getUserByName(loginName) {
        const sql = `select * from users where LOGIN_NAME = :loginName`
        return oracle.execute(sql, { loginName })
    }

    insertManyUsers() {
        const users = [
            { loginName: 'a' },
            { loginName: 'b' },
            { loginName: 'c' },
        ]
        const sql = `insert into users values(:loginName)`
        return oracle.executeMany(sql, users)
    }

    getSomeUsers() {
        let tasks = []
        tasks.push({
            sql: 'select * from users where SEX = :sex',
            param: {
                sex: 1,
            },
        })
        tasks.push({
            sql: 'select * from users where AGE = :age',
            param: {
                age: 25,
            },
        })
        return oracle.atomic(tasks)
    }
}

module.exports = new UserDao(User)
// module.exports = new UserDao(prisma.user)
