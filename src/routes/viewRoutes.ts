import express from 'express';
import {
  getHomePage,
  getWelcomePage,
  getSignupPage,
  getSigninPage,
  getResetPasswordPage,
  getSendResetPasswordLinkPage,
  verifyAccount,
  getSendVerificationPage
} from './../controllers/viewController';
import { protect } from '../controllers/authController';


const router = express.Router();

router.get('/', getWelcomePage);
router.get('/signin', getSigninPage); 
router.get('/signup', getSignupPage);
router.get('/resetPassword', getResetPasswordPage);
router.get('/sendResetPasswordLink', getSendResetPasswordLinkPage);
router.get('/sendVerificationLink', getSendVerificationPage);
router.get('/verify-account',verifyAccount);
router.get('/home',protect, getHomePage);

export default router;
