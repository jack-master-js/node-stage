const { Schema } = require('mongoose')
const { mongoose, options } = require('../../../common/db/mongoose')

const schema = new Schema(
    {
        firstName: String,
        lastName: String,
        account: { type: String, unique: true },
        password: String,
        age: { type: Number, min: 18, max: 65 },
        meta: {
            votes: Number,
            favs: Number,
        },
        tags: [{ name: String, date: Date }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    options
)

//statics
schema.statics = {
    findByRole(role, cb) {
        return this.find({ role }, cb)
    },
}

//instance methods
schema.methods = {
    sayHi() {
        console.log(`Hi, welcome ${this.name}`)
    },
}

//query helpers
schema.query = {
    byName(name) {
        return this.where({ username: new RegExp(name, 'i') })
    },
    //useage: User.findOne().byName('someone').exec()
}

const UserModel = mongoose.model('User', schema)
module.exports = UserModel
