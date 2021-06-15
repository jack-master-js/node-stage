const net = require('net')

const server = net.createServer((socket) => {
    console.log('client connected')

    socket.on('end', () => {
        console.log('client disconnected')
    })

    socket.write('hello\r\n')

    socket.pipe(socket)
})

server.on('error', (err) => {
    throw err
})

module.exports = server