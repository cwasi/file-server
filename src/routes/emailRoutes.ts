import { protect, restictTo } from './../controllers/authController'
import { sendEmail } from '../controllers/emailController'
import express from 'express'

const router = express.Router()

router.route('/').post(protect, restictTo('user'), sendEmail)

export default router