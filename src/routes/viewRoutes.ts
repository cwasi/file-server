import express from 'express';
import {
  getHomePage,
  getWelcomePage,
  getSignupPage,
  getSigninPage,
  getResetPasswordPage,
  getSendResetPasswordLinkPage,
  verifyAccount,
  getSendVerificationPage,
  getforgotPasswordPage,
  getSendEmailPage,
  getAddFilePage,
} from './../controllers/viewController';
import { protect, restictTo } from './../controllers/authController';

const router = express.Router();

router.get('/', getWelcomePage);
router.get('/signin', getSigninPage);
router.get('/signup', getSignupPage);
router.get('/password_reset/:token', getResetPasswordPage);
router.get('/forgot_password', getforgotPasswordPage);
router.get('/sendResetPasswordLink', getSendResetPasswordLinkPage);
router.get('/sendVerificationLink', getSendVerificationPage);
router.get('/auth/verify/:hash', verifyAccount);

// router.use(protect);
router.get('/home', protect, getHomePage);
router.get('/add-file', protect, restictTo('admin'), getAddFilePage);
router.get('/send_email', protect, restictTo('user'), getSendEmailPage);

export default router;
