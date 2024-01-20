import {Request, Response} from 'express'
import dotenv from 'dotenv'
import {UserModel, getUserByEmail} from '../models/UserModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {validatePassword, validateEmail} from '../utils/validation'
dotenv.config()

const getProfileController = (req:Request, res:Response) => {
    //if logged in, show profile
    console.log(req.cookies)
    const token = req.cookies.jwt;
    
    if (!token) {
        res.redirect('/auth/login')
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    res.locals.user = decoded;
    res.render('profile')
}

export {
    getProfileController
}