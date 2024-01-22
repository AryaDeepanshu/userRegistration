import {Request, Response} from 'express'
import dotenv from 'dotenv'
import {UserModel, getUserByEmail} from '../models/UserModel'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {validatePassword, validateEmail} from '../utils/validation'
dotenv.config()


const signupGetController = (req:Request, res:Response) => {
    if(req.cookies.jwt){
        res.redirect('/profile')
        return
    }
    res.render('signup')
}

const signupPostController = async (req:Request, res:Response) => {
    const {username, email, password, confirmPassword, phoneNumber} = req.body
    console.log(username, email, password, phoneNumber)
    if(!username || !email || !password || !confirmPassword || !phoneNumber){
        res.status(400).json({
            error: "All fields are required"
        })
        return
    }
    if (confirmPassword != password){
        res.status(400).json({
            error: "Password didn't match"
        })
        return
    }
    if(!validatePassword(password)){
        res.status(400).json({
            error: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
        })
        return
    }
    if(!validateEmail(email)){
        res.status(400).json({
            error: "Invalid email address"
        })
        return
    }
    const existingUser = await getUserByEmail(email)
    if(existingUser){
        res.status(400).json({
            error: "Email already exists"
        })
        return
    }
    
    //encrypt password
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const user = new UserModel({
        username,
        email,
        password: hash,
        phoneNumber
    })
    user.save()
    .then((user)=>{
        const access_token:string =  generateAccessToken({_id: user._id})
        const refresh_token:string = jwt.sign({_id: user._id}, process.env.REFRESH_SECRET as string)
        user.refreshToken = refresh_token
        user.save()
        res.cookie('access_token', access_token, {httpOnly: true})
        res.status(200).json({
            message: "User created successfully",
            user
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({
            error: "Something went wrong"
        })
    })
}

function generateAccessToken(_id: Object): string {
    return jwt.sign(_id, process.env.JWT_SECRET || "", { expiresIn: '15s' })
}

const loginGetController = (req:Request, res:Response) => {
    if(req.cookies.jwt){
        res.redirect('/profile')
        return
    }
    res.render('signup')
}

const loginPostController = async (req:Request, res:Response) => {
    const {email, password} = req.body
    console.log(email, password)
    if(!email || !password){
        res.status(400).json({
            error: "All fields are required"
        })
        return
    }
    if(!validateEmail(email)){
        res.status(400).json({
            error: "Invalid email address"
        })
        return
    }
    if(!validatePassword(password)){
        res.status(400).json({
            error: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
        })
        return
    }
    const user = await getUserByEmail(email)
    if(!user){
        res.status(400).json({
            error: "Invalid credentials"
        })
        return
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        res.status(400).json({
            error: "Invalid credentials"
        })
        return
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET || "")
    res.cookie('jwt', token, {httpOnly: true})
    res.status(200).json({
        message: "User logged in successfully",
        user
    })


}  

export  {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController
}