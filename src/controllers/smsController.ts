import {Request, Response} from 'express'
import {smsSender} from '../utils/smsSender'

const sendSMSController = (req:Request, res:Response) => {
    smsSender.messages.create({
        to: '+917206918462', 
        from: process.env.TWILIO_PHONE_NUMBER ,
        body: 'Hello from Node'

    })
    .then((message) => {
        console.log(message)
        return res.status(200).json({
            message: 'SMS sent'
        })
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).json({
            message: 'SMS not sent'
        })
    });
    
}

export {
    sendSMSController
}