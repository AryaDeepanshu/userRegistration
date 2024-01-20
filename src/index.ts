import express from 'express';
import dotenv from "dotenv";
import {connectDB} from './db/connect';
import {router} from './routes/routes';
import cookieParser from 'cookie-parser';
const app = express()
const port:Number = 3000
dotenv.config();
let MONGO_URI = process.env.MONGO_URI || "";

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.set('view engine', 'ejs')
app.set ('views', __dirname + '/views')

app.use('/', router)


try{
    connectDB(MONGO_URI);
    app.listen(port, ()=>{
        console.log(`Server is running at http://localhost:${port}`)
    })
}catch(err){
    console.log(err)
}


 
