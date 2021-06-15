const WsServer = require('../../common/class/WsServer')
const Proto = require('../../common/class/Proto')
const proto = new Proto(__dirname + '/proto/ws.proto', 'stage', 'Body')
const StagePlayer = require('../user/class/StagePlayer')

class StageWsServer extends WsServer {
    constructor(...args) {
        super(...args)
    }

    //overwrite
    newPlayer(socket) {
        const playerInfo = {
            loginName: '',
        }
        let player = new StagePlayer(this.proto, socket, playerInfo)
        return player
    }
}

module.exports = new StageWsServer(proto)
