import {Request, Response} from 'express'
import dotenv from 'dotenv'
import {UserModel, getUserByEmail} from '../models/UserModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {validatePassword, validateEmail} from '../utils/validation'
dotenv.config()

const getProfileController = (req:Request, res:Response) => {
    
    res.render('profile')
}

export {
    getProfileController
}