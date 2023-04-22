import express from 'express';
import {
  getHomePage,
  getWelcomePage,
  getSignupPage,
  getSigninPage,
  getResetPasswordPage,
  getSendResetPasswordLinkPage,
} from './../controllers/viewController';
import { protect } from '../controllers/authController';

const router = express.Router();

router.get('/', getWelcomePage);
router.get('/signin', getSigninPage); 
router.get('/signup', getSignupPage);
router.get('/resetPassword', getResetPasswordPage);
router.get('/sendResetPasswordLink', getSendResetPasswordLinkPage);
router.get('/home',protect, getHomePage);

export default router;
