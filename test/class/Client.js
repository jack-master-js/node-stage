const WebSocket = require('ws')

class Client {
    constructor (proto, loginName) {
        this.proto = proto
        this.loginName = loginName

        this.socket = null
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
        this.on('loginRes', (msg) => {
            if(msg.playerInfo.loginName) console.log(`${this.loginName} login success!`);
        })

        this.on('pong', (msg) => {
            console.log(msg);
        })
    }

    trigger(cmd, msg) {
        let handle = this.handlers.get(cmd)
        if(handle) handle(msg)
    }

    login(url) {
        this.socket = new WebSocket(url)
        this.socket.on('close', () => {
            console.log(`${this.loginName} disconnect!`);
        })

        this.socket.on('message', data => {
            const {cmd, msg} = this.proto.decode(data)
            if(cmd) this.trigger(cmd, msg)
        })
    }

    play() {
        setInterval(() => {
            console.log(`${this.loginName} ping`);
            this.emit('ping', {clientTime: Date.now()})
        },1000)
    }
}

module.exports = Client