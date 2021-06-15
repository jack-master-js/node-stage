const AGame = require('../modules/game/class/AGame')

async function run() {
    const game = new AGame()
    game.start()
}

run()
