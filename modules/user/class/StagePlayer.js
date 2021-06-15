const Player = require('../../../common/class/Player')
const playerRequests = require('../player.requests')

class StagePlayer extends Player {
    constructor(...args){
        super(...args)
        this.init()
    }

    init(){
        playerRequests(this)
    }

    joinRoom() {
        //to do something!!!
    }
}

module.exports = StagePlayer