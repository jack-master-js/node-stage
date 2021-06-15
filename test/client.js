const grpc = require('grpc')
const grpc_proto = require('../modules/server/grpc.proto.js')
const grpcClient = new grpc_proto.Greeter(
    'localhost:3001',
    grpc.credentials.createInsecure()
)
const net = require('net')
const dgram = require('dgram')

//RPC client
// sayHello(call,callback)
grpcClient.sayHello({ name: 'world' }, (err, response) => {
    // callback的 err 是server 来返回的 如果无 null 说明无错误
    if (err === null) {
        // 说明server端没有出现错误 (两段式请求,只能通过 err 来判断)
    }
    // server端给返回的数据 response
    console.log(response)
})

//TCP client
const tcpClient = net.createConnection({ port: 3002 }, () => {
    console.log('connected to server!')
    tcpClient.write('world!\r\n')
})

tcpClient.on('data', (data) => {
    console.log(data)
    console.log(data.toString())
    tcpClient.end()
})

tcpClient.on('end', () => {
    console.log('disconnected from server')
})

//UDP client
const udpClient = dgram.createSocket('udp4')

udpClient.send(Buffer.from('Some bytes'), 41234, 'localhost', (err) => {
    console.log('Some bytes already send')
})

udpClient.on('message', (msg, rinfo) => {
    console.log(`udp client got: ${msg} from ${rinfo.address}:${rinfo.port}`)
    udpClient.close()
})
udpClient.on('error', (err) => {
    console.log(`udp client error:\n${err.stack}`)
    udpClient.close()
})
