const ampq = require('amqplib')
require('dotenv').config();
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS')

async function consumeJobs() {
    const connection = await ampq.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    channel.assertQueue('job_queue')

    channel.consume('job_queue', async (msg) => {
        if (msg !== null) {
            const job = JSON.parse(msg.content.toString())
            console.log("processing Job", job)
        }
        try {
            if (job.email) await sendEmail(job.email, job.message)
            // if (job.phone) await sendSMS(job.phone, job.message)
                channel.ack(msg)
        } catch (error) {
            channel.nack(msg,false,false)
        }
    })
}

consumeJobs().catch(console.error)