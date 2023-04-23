import { sendEmail } from '../controllers/emailController'
import express from 'express'

const router = express.Router()

router.route('/').post(sendEmail)

export default router