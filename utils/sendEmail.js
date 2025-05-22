const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });

const ses = new AWS.SES();

module.exports = async function sendEmail(to, message) {
  console.log("Sending to:", to, "| Message:", message);

  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: message,
        },
      },
      Subject: {
        Data: 'Notification',
      },
    },
    Source: process.env.EMAIL_SENDER,
  };

  return ses.sendEmail(params).promise()
    .then(data => {
      console.log('✅ Email sent:', data.MessageId);
      return data;
    })
    .catch(err => {
      console.error('❌ SES error:', err);
      throw err;
    });
};
