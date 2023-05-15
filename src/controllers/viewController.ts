import { Op } from 'sequelize';
import catchAsync from './../utils/catchAsync';
import db from './../models';
import AppError from './../utils/appError';
import { createAndSendToken } from './../utils/helpers';

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

export const verifyAccount = catchAsync(
  async (req: any, res: any, next: any) => {
    const hash = req.params.hash;
    const token = await db.Token.findOne({
      where: {
        token: hash,
        expiresAt: { [Op.gt]: Date.now() },
      },
    });

    if (!token) {
      return next(new AppError('Invalid link', 400));
    }

    const id = token.UserId;
    const user = await db.User.findOne({ where: { id } });
    user.isVerified = true;
    await user.save();

    token.token = '';
    await token.save();

    // STEP:  log the user in, send jwt
    // createAndSendToken(user, 200, res);

    // req.params.hash;
    res.redirect(`http://127.0.0.1:5050/signin`);

    res.status(200).render('verifyAccount', {
      title: 'Verify Your Account',
    });
  }
);

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
  console.log('💥💥💥💥💥💥', req.params.token);

  res.status(200).render('resetPassword', {
    title: 'Reset Password',
  });
};
export const getforgotPasswordPage = (req: any, res: any, next: any) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot password',
  });
};
export const getSendEmailPage = (req: any, res: any, next: any) => {
  res.status(200).render('email', {
    title: 'Send Email',
  });
};
export const getAddFilePage = (req: any, res: any, next: any) => {
  res.status(200).render('addFile', {
    title: 'Add File',
  });
};
