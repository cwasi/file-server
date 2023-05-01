import express from 'express';
import {
  getHomePage,
  getWelcomePage,
  getSignupPage,
  getSigninPage,
  getResetPasswordPage,
  getSendResetPasswordLinkPage,
  searchFilePage,
} from './../controllers/viewController';
import { protect } from '../controllers/authController';


const router = express.Router();

router.get('/', getWelcomePage);
router.get('/signin', getSigninPage); 
router.get('/signup', getSignupPage);
router.get('/resetPassword', getResetPasswordPage);
router.get('/sendResetPasswordLink', getSendResetPasswordLinkPage);
router.get('/home',protect, getHomePage);
router.get('/search-file',protect,searchFilePage);

export default router;
