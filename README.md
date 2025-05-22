📬 Job Scheduler Notification System

This is a lightweight, message-driven notification system built with Node.js, Express, RabbitMQ, and AWS SES/SNS. It allows queuing and processing of jobs (like sending emails or SMS) using a producer-consumer model.

🛠️ Features

✅ Queue jobs using RabbitMQ

📤 Send emails via AWS SES

📱 Send SMS via AWS SNS (optional)

📦 Producer-Consumer pattern

🔁 Reliable message handling

❌ Retry logic with failure acknowledgment

🧱 Project Structure

job-scheduler-notification-system/
├── producer/                 # API to queue jobs
│   ├── routes/
│   ├── index.js
│   └── ...
├── queue/                   # RabbitMQ connection logic
├── utils/                   # Email & SMS sending logic
├── .env                     # Environment variables (NOT to be pushed)
└── README.md

📦 Prerequisites

Node.js (v18+)

RabbitMQ (running locally or on cloud)

AWS SES (email) + SNS (optional, for SMS)

Verified email in SES

IAM user with permissions: ses:SendEmail, sns:Publish

🚀 Setup & Run

Clone the repo

git clone https://github.com/i-ally/job-scheduler-notification-system.git
cd job-scheduler-notification-system

Install dependencies

npm install

Configure .env

Create a .env file at the root and add:

RABBITMQ_URL=amqp://localhost
EMAIL_SENDER=your-verified-ses-email@example.com
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-south-1

Start the producer API

node producer/index.js

It will start consuming jobs and expose an endpoint to submit them.

📬 API Usage

Queue a new job

POST /

{
  "email": "someone@example.com",
  "message": "Welcome to our service!"
}

🔐 Security Best Practices

Never push .env to GitHub

Use .env.example for placeholders

Use IAM roles with minimum required permissions

📈 Monitoring Tips

Use RabbitMQ UI at http://localhost:15672 to inspect queues

CloudWatch (if deployed on AWS) for SES/SNS logs

✅ To-Do / Improvements

Add retry logic with backoff

Add SMS notification using SNS

Add persistent job storage (like MongoDB or Redis)

Add cron-based scheduling

📄 License

MIT

👩‍💻 Author

Made with ❤️ by @i-ally
