const jwt = require('jsonwebtoken')
const userDao = require('./user.dao')
const { TOKEN_SECRET } = require('../const')
const bcrypt = require('bcrypt')
const E = require('../../common/error')
const { v4: uuid } = require('uuid')

class UserService {
    constructor(dao) {
        this.dao = dao
    }
    /**
     * @api {post} /user/create 创建
     * @apiGroup User
     *
     * @apiUse UserModel
     */
    async create(req, res, next) {
        try {
            const user = req.body
            if (!user.password) throw Error(E.LACK_PARAMS)
            user.password = await bcrypt.hash(user.password, 10)
            user.id = uuid()
            await this.dao.create(user)
            res.success()
        } catch (error) {
            next(error)
        }
    }

    /**
     * @api {post} /user/update 修改
     * @apiGroup User
     *
     * @apiParam {String} id 用户ID
     */
    async update(req, res, next) {
        try {
            const { id, name } = req.body
            if (!name) throw Error(E.LACK_PARAMS)
            await this.dao.updateById(id, { name })
            res.success()
        } catch (error) {
            next(error)
        }
    }

    /**
     * @api {post} /user/find 查询所有
     * @apiGroup User
     *
     * @apiParam {String} page 页码
     * @apiParam {String} pageSize 数量
     */
    async find(req, res, next) {
        try {
            const { rows, count } = await this.dao.page()
            res.data(rows, count)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @api {post} /user/get 查询
     * @apiGroup User
     *
     * @apiParam {String} id 用户ID
     */
    async get(req, res, next) {
        try {
            const rst = await this.dao.findById(req.body.id)
            res.data(rst)
        } catch (error) {
            next(error)
        }
    }

    /**
     * @api {post} /user/del 删除
     * @apiGroup User
     *
     * @apiParam {String} id 用户ID
     */
    async del(req, res, next) {
        try {
            await this.dao.delById(req.body.id)
            res.success()
        } catch (error) {
            next(error)
        }
    }

    /**
     * @api {post} /user/login 登录
     * @apiGroup User
     *
     * @apiParam {String} account 账号
     * @apiParam {String} password 密码
     * @apiSuccess {String} token 令牌
     */
    async login(req, res, next) {
        try {
            const { account, password } = req.body
            const user = await this.dao.findOne({ account })
            if (!user) throw Error(E.NO_RECORD)
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = jwt.sign({ account }, TOKEN_SECRET, {
                    expiresIn: '24h',
                })
                res.data({ token })
            } else {
                throw Error(E.NOT_MATCH)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserService(userDao)
