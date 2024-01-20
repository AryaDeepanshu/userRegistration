//validate if user is logged in using jwt token

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.status(401).json({
                error: 'Unauthorized'
            });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        res.locals.user = decoded;
        next();
    }
    catch (err: any) {
        res.status(400).json({
            error: err.message
        });
    }
};
export { isLoggedIn };