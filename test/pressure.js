const Client = require('./class/Client')
const wsProto = require('../modules/server/proto/ws.proto')

async function run(num, host) {
    for (let index = 0; index < num; index++) {
        let loginName = `${index}_player`
        const client = new Client(wsProto, loginName)

        let url = `${host}?loginName=${loginName}`
        client.login(url)
        client.play()
    }
}

run(500, 'ws://localhost:9000')
