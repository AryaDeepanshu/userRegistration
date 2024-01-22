//validate if user is logged in using jwt token

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if(token == null){
            return res.status(401).redirect('/auth/login');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "")
        if(!decoded){
            
            return res.status(401).redirect('/auth/login');
        }
        

        next();
    }
    catch (err: any) {
        res.status(400).json({
            error: err.message
        });
    }
};
export { isLoggedIn };