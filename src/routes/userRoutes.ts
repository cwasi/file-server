import express from 'express';
import {
  signup,
  forgotPassword,
  resetPassword,
  protect,
  updateMe,
  signin,
} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/updateMe', protect, updateMe);

export default router;
