const express = require('express')
const router = express.Router()
const service = require('./user.service')
const auth = require('./auth.middleware')
const { graphqlHTTP } = require('express-graphql')
const UserSchema = require('./schema/User')

const isShowGraphiql = !process.env.NODE_ENV || process.env.NODE_ENV === 'dev'

router.post('/create', service.create)
router.post('/update', service.update)
router.post('/find', service.find)
router.post('/get', service.get)
router.post('/del', auth, service.del)
router.post('/login', service.login)

router.use(
    '/graphql',
    graphqlHTTP({ schema: UserSchema, graphiql: isShowGraphiql })
)

module.exports = router
