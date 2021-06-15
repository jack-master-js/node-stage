const WebSocket = require('ws')
const logger = require('../utils/logger')
const { getWsClientIp, getQueryStr } = require('../utils/util')
const queryString = require('querystring')

class WsServer {
    constructor(proto) {
        this.proto = proto
        this.onlinePlayers = new Map()
        this.offlinePlayers = new Map()
    }

    async start(server) {
        this.server = new WebSocket.Server({ server })
        this.server.on('connection', (socket, req) => {
            logger.info(`[ws server] connection origin: ${req.headers.origin}`)
            logger.info(`[ws server] connection url: ${req.url}`)

            socket.on('error', (e) => {
                logger.error(
                    `[ws server] ${socket.id} socket error: ${e.message}`
                )
            })

            // distribute the user from different path
            // if (req.url === '/login')
            this.handleConnection(socket, req)
        })
    }

    handleConnection(socket, req) {
        const ip = getWsClientIp(req)
        const queryStr = getQueryStr(req.url)
        const query = queryString.parse(queryStr)
        const { token } = query

        //check user
        const userID = this.checkUser(socket, token)

        try {
            if (!userID) throw Error('invalid user')
            socket.id = userID

            let onlinePlayer = this.onlinePlayers.get(userID)
            let offlinePlayer = this.offlinePlayers.get(userID)
            let player = onlinePlayer || offlinePlayer

            if (!player) {
                //new player
                player = this.newPlayer(socket)

                player.ip = ip
                player.id = userID

                player.onNewConnection(socket)
            } else {
                //old player
                if (onlinePlayer) {
                    throw Error('you already login somewhere else.')
                    // this.kickOut(
                    //     onlinePlayer.socket,
                    //     'you login somewhere else.'
                    // )
                    // player.onKickOut(socket)
                }

                if (offlinePlayer) {
                    this.offlinePlayers.delete(userID)
                }

                player.onReConnection(socket)
            }

            //用户上线
            player.online(socket, async () => {
                this.onlinePlayers.set(userID, player)

                this.socketMsg(socket, 'loginRes', {
                    playerInfo: player.info,
                })
            })

            //用户下线
            player.onOffline(socket, async () => {
                this.onlinePlayers.delete(userID)
                this.offlinePlayers.set(userID, player)
            })
        } catch (e) {
            this.kickOut(socket, e.message)
        }
    }

    checkUser(socket, token) {
        if (!token) this.kickOut(socket, 'need token')
        return ''
    }

    newPlayer() {}

    //当前建立连接的用户
    socketMsg(socket, cmd, msg) {
        socket.send(this.proto.encode(cmd, msg))
    }

    //所有用户
    broadcast(cmd, msg) {
        this.onlinePlayers.forEach((player) => {
            player.emit(cmd, msg)
        })
    }

    checkOnline(userID) {
        return this.onlinePlayers.get(userID)
    }

    kickOut(socket, message) {
        if (socket) {
            this.socketMsg(socket, 'systemNotice', { message })
            socket.close()
        }
    }

    kickOutAll(msg) {
        this.onlinePlayers.forEach((player) => {
            this.kickOut(player.socket, msg)
        })
    }

    async close() {
        logger.error(`[ws server] wsServer is closed.`)
    }
}

module.exports = WsServer
