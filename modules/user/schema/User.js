const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
} = require('graphql')

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLID,
            description: 'ID',
        },
        name: {
            type: GraphQLString,
            description: '姓名',
        },
        age: {
            type: GraphQLInt,
            description: '年龄',
        },
        sex: {
            type: GraphQLBoolean,
            description: '性别',
        },
    },
})

const outputType = new GraphQLObjectType({
    name: 'Output',
    fields: () => ({
        success: { type: GraphQLBoolean },
    }),
})

const inputType = new GraphQLInputObjectType({
    name: 'Input',
    fields: () => ({
        name: { type: GraphQLString },
    }),
})

const listFields = {
    name: 'get all users',
    description: '获取所有用户',
    type: new GraphQLList(userType),
    args: {},
    resolve(root, args, req) {
        return [{ name: 'test' }]
    },
}

const queryType = new GraphQLObjectType({
    name: 'Queries',
    description: '查询',
    fields: {
        lists: listFields,
        user: {
            name: 'get user info',
            description: '获取用户信息',
            type: userType,
            args: {
                id: {
                    type: GraphQLID,
                },
                name: {
                    type: GraphQLString,
                },
                age: {
                    type: GraphQLInt,
                },
                sex: {
                    type: GraphQLBoolean,
                },
            },
            resolve(root, args, req) {
                console.log('args', args)
                //TODO 查询数据库
                return { name: 'test' }
            },
        },
    },
})
// query {
// 	user(id: "id") {
// 	  id
// 	}
// }

let mutationType = new GraphQLObjectType({
    name: 'Mutations',
    description: '更改',
    fields: () => ({
        createUser: {
            type: outputType,
            description: '创建用户',
            args: {
                user: {
                    type: inputType,
                },
            },
            resolve: (value, args) => {
                console.log('args', args)
                //TODO 修改数据库
                return { success: true }
            },
        },
    }),
})
// mutation {
//     createUser(user:{name: "test"}) {
//       success
//     }
// }

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
})

module.exports = schema
