const AWS = require('aws-sdk');
// const { params } = require('../producer/routes/jobRoutes');
AWS.config.update({region: process.env.job_queue})

const sns = new AWS.SNS();

module.exports = async function sendSMS(phone,message){
    const params = {
        Message:message,
        PhoneNumber: phone,
        MessageAttributes:{
            'AWS.SNS.SMS.SenderID':{
                DataType:'String',
                StringValue:process.env.SMS_SENDER_ID
            }
        }
    }
            return sns.publish(params).promise();
}