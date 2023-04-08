import express from 'express';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updateMe,
} from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/updateMe', protect, updateMe);

export default router;
