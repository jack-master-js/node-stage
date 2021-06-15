const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../../../common/db/sequelize')
const { STRING, TEXT, INTEGER, FLOAT, DOUBLE, DECIMAL, DATE, UUID } = DataTypes

const options = { sequelize, modelName: 'User', tableName: 'users' }
class UserModel extends Model {
    //static
    static sayHi() {
        return 'hi'
    }

    //instance methods
    getFullName() {
        return [this.firstName, this.lastName].join(' ')
    }
}

/**
 * @apiDefine UserModel
 * @apiParam {String} firstName 名
 * @apiParam {String} lastName 姓
 * @apiParam {Number} age 年龄
 * @apiParam {String} account 账号
 * @apiParam {String} password 密码
 */
UserModel.init(
    {
        id: {
            type: UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        firstName: STRING,
        lastName: STRING,
        age: INTEGER,
        account: STRING,
        password: STRING,
    },
    options
)

module.exports = UserModel
