import express, { Request, Response,Router} from 'express'
// import authRoute from './authRoute'
import {signupGetController, signupPostController, loginGetController, loginPostController} from '../controllers/authController'
import {getProfileController} from '../controllers/profileController'
import {sendMailController} from '../controllers/mailController'
// import {sendSmsController} from '../controllers/smsController'
const router :Router= express.Router()


router.get('/auth/signup', signupGetController)
router.post('/auth/signup', signupPostController)
router.get('/auth/login', loginGetController)
router.post('/auth/login', loginPostController)

router.get('/profile', getProfileController)

router.get('/sendEmail', sendMailController)
// router.get('/sendSms', sendSmsController)
router.get('/logout', (req:Request, res:Response)=>{
    res.clearCookie('jwt')
    res.redirect('/auth/login')
})
export {
    router,
    // authRoute
}