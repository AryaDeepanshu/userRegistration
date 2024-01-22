import express, { Request, Response,Router} from 'express'
// import authRoute from './authRoute'
import {signupGetController, signupPostController, loginGetController, loginPostController} from '../controllers/authController'
import {getProfileController} from '../controllers/profileController'
import {sendMailController} from '../controllers/mailController'
import {sendSMSController} from '../controllers/smsController'
import {isLoggedIn} from '../utils/isLoggedIn'
const router :Router= express.Router()


router.get('/auth/signup' , signupGetController)
router.post('/auth/signup', signupPostController)
router.get('/auth/login', loginGetController)
router.post('/auth/login', loginPostController)

router.get('/profile', isLoggedIn, getProfileController)

router.get('/sendEmail', isLoggedIn, sendMailController)
router.get('/sendSms', isLoggedIn, sendSMSController)
router.get('/logout', isLoggedIn, (req:Request, res:Response)=>{
    res.clearCookie('jwt')
    res.redirect('/auth/login')
})
export {
    router,
    // authRoute
}