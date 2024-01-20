import {Request, Response} from 'express'
import dotenv from 'dotenv'
import {UserModel, getUserByEmail} from '../models/UserModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {transporter} from '../utils/transporter'
import {validatePassword, validateEmail} from '../utils/validation'
import { AnyExpression } from 'mongoose'
dotenv.config()

const sendMailController = async (req:Request, res:Response) => {
    const token = req.cookies.jwt;
    
    if (!token) {
        res.redirect('/auth/login')
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    res.locals.user = decoded;
    // send mai to logged in user
    console.log(res.locals.user)
    const user:any = await UserModel.findById(res.locals.user._id) 

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Hello, ${user.username}`,
        text: `${user.username}, you are receiving this email because you have clicked on send mail`,
    })
    .then((info:any)=>{
        console.log(info)
        res.status(200).json({
            message: "Email sent successfully"
        })
    })
    .catch((err:any)=>{
        console.log(err)
        res.status(400).json({
            error: err.message
        })
    })
    
}

export {
    sendMailController
}