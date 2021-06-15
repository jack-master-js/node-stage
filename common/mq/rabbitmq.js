const amqp = require('amqplib')
const logger = require('../utils/logger')

class RabbitMQ {
    constructor(url, queue) {
        this.url = url
        this.queue = queue
    }

    async getConnection() {
        const conn = await amqp.connect(this.url)
        return conn
    }

    async send(msg, option = { durable: true }) {
        const conn = await this.getConnection()
        const ch = await conn.createChannel()

        try {
            await ch.assertQueue(this.queue, option)
            await ch.sendToQueue(this.queue, Buffer.from(JSON.stringify(msg)))
            await ch.close()
            await conn.close()
        } catch (error) {
            logger.error(`[ rabbitMq ] error: ${error.message}`)
            await ch.close()
            await conn.close()
        }
    }

    async receiveWithNoAck(callback) {
        const conn = await this.getConnection()
        const ch = await conn.createChannel()

        try {
            await ch.assertQueue(this.queue)
            await ch.consume(this.queue, callback, { noAck: true })
        } catch (error) {
            logger.error(`[ rabbitMq ] error: ${error.message}`)
            await ch.close()
            await conn.close()
        }
    }
}

module.exports = new RabbitMQ(
    'amqp://root:123456@192.168.72.128:5672',
    'simplest'
)
