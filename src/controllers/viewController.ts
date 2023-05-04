import { Op } from 'sequelize';
import catchAsync from './../utils/catchAsync';
import db from './../models';

export const getWelcomePage = (req: any, res: any, next: any) => {
  res.status(200).render('Welcome', {
    title: 'Welcome',
  });
};
export const getHomePage = catchAsync(async (req: any, res: any, next: any) => {
  const getAllFiles = await db.File.findAll();
  res.status(200).render('home', {
    title: 'Home',
    files: getAllFiles,
  });
});


export const verifyAccount = (req: any, res: any, next: any) => {

  res.status(200).render('verifyAccount', {
    title: 'Verify Your Account',
    message: "Please check your email for your verification code"
  });
};
export const getSignupPage = (req: any, res: any, next: any) => {
  res.status(200).render('signup', {
    title: 'Sign up',
  });
};

export const getSigninPage = (req: any, res: any, next: any) => {
  res.status(200).render('signin', {
    title: 'Sign in',
  });
};
export const getSendResetPasswordLinkPage = (req: any, res: any, next: any) => {
  res.status(200).render('sendResetPasswordLink', {
    title: 'Send reset password link',
  });
};
export const getSendVerificationPage = (req: any, res: any, next: any) => {
  res.status(200).render('sendVerificationLink', {
    title: 'Send verification link',
  });
};
export const getResetPasswordPage = (req: any, res: any, next: any) => {
  res.status(200).render('resetPassword', {
    title: 'Reset password',
  });
};
