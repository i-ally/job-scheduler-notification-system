const express = require('express')
const router = express.Router();
const { getchannel } = require('../../queue/rabbitMQ');

router.post('/',(req,res) =>{
    const job = req.body;
    if (!job || Object.keys(job).length === 0) {
        return res.status(400).json({ error: 'Job payload is required' });
    }
    const channel = getchannel();
    if(!channel) return res.status(500).send("Queue not connected");

    channel.sendToQueue('job_queue', Buffer.from(JSON.stringify(job)))
    return res.status(200).json({message:'Job queued',job})
})
module.exports = router;