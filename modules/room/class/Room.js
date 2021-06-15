class Room {
    constructor(id, info) {
        this.id = id
        this.info = info
        this.players = new Map()
    }

    addPlayer(){}
    removePlayer(){}
    getRoomInfo(){}
    getAllPlayersInfo(){}
    kickOut(){}
    kickOutAll(){}
    broadcast(){}
    destroy(){}
}

module.exports = Room