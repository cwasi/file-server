import express from 'express';
import {
  signup,
  forgotPassword,
  resetPassword,
  protect,
  updateMe,
  signin,
  signOut,
  verifyEmail,
  adminRole,
} from '../controllers/authController';



const router = express.Router();

router.post('/signup', signup);
router.post('/admin_signup',adminRole, signup);
router.post('/signin', signin);
router.get('/signout', signOut);
router.post('/forgotPassword', forgotPassword);
router.patch('/password_reset/:token', resetPassword);
router.patch('/verify/:hash', verifyEmail);

// router.get('/updateMe', protect, updateMe);

export default router;
