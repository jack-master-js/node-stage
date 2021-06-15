const logger = require('../utils/logger')

class Player {
    constructor(proto, socket, info) {
        this.proto = proto
        this.socket = socket
        this.info = info

        this.handlers = new Map()
        this.handler()
    }

    on(cmd, callback) {
        this.handlers.set(cmd, callback)
    }

    emit(cmd, msg) {
        this.socket.send(this.proto.encode(cmd, msg))
    }

    handler() {
        this.socket.on('message', (data) => {
            const { cmd, msg } = this.proto.decode(data)
            if (cmd) this.trigger(cmd, msg, false)
        })
    }

    trigger(cmd, msg, fromSystem = true) {
        let handle = this.handlers.get(cmd)
        if (handle) {
            msg = msg || {}
            msg.fromSystem = fromSystem
            handle(msg)
        }
    }

    onNewConnection(socket) {
        logger.info(`[ Player ] ${socket.id} new connected!`)
    }

    onReConnection(socket) {
        logger.info(`[ Player ] ${socket.id} reconnected!`)
        this.socket = socket
        this.handler()
    }

    onKickOut(socket) {
        logger.info(`[ Player ] ${socket.id} was kick out!`)
    }

    async online(socket, playerOnline) {
        await playerOnline()
        logger.info(`[ Player ] ${socket.id} is online!`)

        this.joinRoom()
    }

    async onOffline(socket, playerOffline) {
        this.socket.on('close', async () => {
            if (socket === this.socket) {
                await playerOffline()
                logger.info(`[ Player ] ${socket.id} is offline!`)
            }
        })
    }
}

module.exports = Player
