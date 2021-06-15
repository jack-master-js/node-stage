const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('error', err => {
    console.log(`server error:\n${err.stack}`)
    server.close()
})

server.on('message', (msg, rinfo) => {
    console.log(`udp server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
    server.send(Buffer.from('server get the msg'), rinfo.port)
})

server.on('listening', () => {
    const address = server.address()
    console.log(`udp server listening ${address.address}:${address.port}`)
})

module.exports = server
