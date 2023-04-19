import express from 'express';
import {
  getHomePage,
  getSignupPage,
  getSigninPage,
  getResetPasswordPage,
  getSendResetPasswordLinkPage,
} from './../controllers/viewController';

const router = express.Router();

router.get('/', getHomePage);
router.get('/signin', getSigninPage);
router.get('/signup', getSignupPage);
router.get('/resetPassword', getResetPasswordPage);
router.get('/sendResetPasswordLink', getSendResetPasswordLinkPage);

export default router;
