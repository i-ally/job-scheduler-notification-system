const ampq = require("amqplib")

let channel;

async function connectRabbitMQ(params) {
    const connection = await ampq.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("job_queue")
    return channel
}

module.exports = {
    connectRabbitMQ,
    getchannel:() => channel
}