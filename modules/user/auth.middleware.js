const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../const')
const userService = require('./user.service')

module.exports = async (req, res, next) => {
    // const token = req.headers.authorization
    const { token } = req.body
    try {
        const decode = jwt.verify(token, TOKEN_SECRET)
        const { account } = decode
        const user = await userService.dao.findOne({ account })

        if (user) {
            next()
        } else {
            throw Error('invalid token')
        }
    } catch (error) {
        res.error(error)
    }
}
