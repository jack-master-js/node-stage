const logger = require('../../common/utils/logger')

module.exports = (player) => {
    player.on('ping', (msg) => {
        console.info(msg)
        player.emit('pong', {
            clientTime: msg.clientTime,
            serverTime: Date.now(),
        })
    })
}
