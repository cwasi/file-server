import { protect, restrictTo } from './../controllers/authController';
import { sendFile } from '../controllers/emailController';
import express from 'express';

const router = express.Router();

router.route('/send_file').post(protect, restrictTo('user'), sendFile);

export default router;
