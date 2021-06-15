const rabbitMq = require('../common/mq/rabbitmq')
setInterval(() => {
    rabbitMq.send('hello')
    rabbitMq.send({ name: 'test' })
}, 3000)

rabbitMq.receiveWithNoAck((msg) => {
    console.log('receive', msg.content.toString())
})
