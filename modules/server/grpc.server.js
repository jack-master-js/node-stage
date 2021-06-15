const grpc = require('grpc');
const grpcProto = require('./grpc.proto.js')
const {sayHello} = require('./grpc.service.js')
const {rpcPort} = require('../../config')

const server = new grpc.Server()
server.addService(
    grpcProto.Greeter.service, 
    { 
        sayHello,
    }
)
server.bind(`0.0.0.0:${rpcPort}`, grpc.ServerCredentials.createInsecure())

module.exports = server