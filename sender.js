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
        let msg ="hello world"
        channel.sendToQueue(QUEUE, Buffer.from(msg));
        console.log(`Message send: ${msg}`)
        setTimeout(() => {
           connection.close() 
        },5000)
    })
})