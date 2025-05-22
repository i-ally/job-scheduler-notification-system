require('dotenv').config();
const amqp = require('amqplib');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');

async function consumeJobs() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('job_queue');

  channel.consume('job_queue', async (msg) => {
    if (msg !== null) {
      const job = JSON.parse(msg.content.toString());
      console.log('Processing job:', job);

      try {
        
        if (job.email) await sendEmail(job.email, job.message);
        // if (job.phone) await sendSMS(job.phone, job.message);
        channel.ack(msg);
      } catch (error) {
        console.error('Job failed:', error);
        channel.nack(msg, false, false); // discard or retry based on your strategy
      }
    }
  });
  console.log('🟢 Consumer started, waiting for jobs...');
}

consumeJobs().catch(err => {
  console.error('Error in consumer:', err);
  process.exit(1);
});
