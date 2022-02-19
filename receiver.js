const amqp = require('amqplib/callback_api')
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError
    }
    connection.createChannel((ChannelError, channel) => {
        if (ChannelError) {
            throw ChannelError
        }
        const QUEUE = 'testq'
        channel.assertQueue(QUEUE);
        channel.consume(QUEUE, (msg) => {
            console.log(`Message Received: ${msg.content.toString()}`)
            channel.ack(msg)
        })
    })
})