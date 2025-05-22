require('dotenv').config();
const express = require('express');
const jobRoutes = require('./routes/jobRoutes');
const { connectRabbitMQ } = require('../queue/rabbitMQ');

const app = express();
app.use(express.json());
app.use('/', jobRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectRabbitMQ(); // connect once before starting server
    app.listen(PORT, () => {
      console.log(`✅ Producer API running on port ${PORT}`);
    });
  } catch (err) {
    console.error('RabbitMQ connection failed', err);
    process.exit(1);
  }
}

startServer();
