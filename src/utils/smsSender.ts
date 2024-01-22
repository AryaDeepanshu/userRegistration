import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const accountSid:string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken:string = process.env.TWILIO_AUTH_TOKEN || '';
const smsSender = twilio(accountSid, authToken);

// const smsSender = client.messages.create({
//     body: 'Hello from Node',
//     to: '+917206918462', 
//     from: process.env.TWILIO_PHONE_NUMBER || '' 
// })
// .then((message) => console.log(message));

export {
    smsSender
}


