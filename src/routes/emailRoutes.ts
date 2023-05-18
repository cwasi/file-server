import { protect, restictTo } from './../controllers/authController'
import { sendFile } from '../controllers/emailController'
import express from 'express'

const router = express.Router()

router.route('/send_file').post(protect, restictTo('user'), sendFile)

export default router