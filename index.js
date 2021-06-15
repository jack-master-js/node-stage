const { port, tcpPort, udpPort } = require('./config')
const logger = require('./common/utils/logger')
const httpServer = require('./modules/server/http.server')
const wsServer = require('./modules/server/ws.server')
const rpcServer = require('./modules/server/grpc.server')
const tcpServer = require('./modules/server/tcp.server')
const udpServer = require('./modules/server/udp.server')

const server = httpServer.listen(port, () => {
    logger.info(`httpServer listen on ${port}`)
})

wsServer.start(server).then(() => {
    logger.info(`wsServer is running.`)
})

rpcServer.start()

tcpServer.listen(tcpPort, () => {
    logger.info(`tcpServer is running.`)
})

udpServer.bind(udpPort)

process.on('uncaughtException', (err) => {
    logger.error(`Caught exception: ${JSON.stringify(err)}`)
})

process.on('SIGINT', async () => {
    await wsServer.close()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    await wsServer.close()
    process.exit(0)
})
