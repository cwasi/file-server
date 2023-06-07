import { Op } from 'sequelize';
import { numOfdownloadAndEmails } from './fileController';
import catchAsync from './../utils/catchAsync';
import db from './../models';
import AppError from './../utils/appError';
import crypto from 'crypto';
import axios from 'axios';
import { title } from 'process';

export const getWelcomePage = (req: any, res: any, next: any) => {
  res.status(200).render('welcome', {
    title: 'Welcome',
  });
};
export const getHomePage = catchAsync(async (req: any, res: any, next: any) => {
  const getAllFiles = await db.File.findAll();

  // Get the ids
  const getNumberOfFileDownloadsAndEmailSent = [];

  for (let i = 0; i < getAllFiles.length; i++) {
    const numberOfFileDownloads = await getAllFiles[i].countDownloads();
    const numberOfEmailSent = await getAllFiles[i].countEmails();

    getNumberOfFileDownloadsAndEmailSent.push({
      title: getAllFiles[i].title,
      numberOfFileDownloads,
      numberOfEmailSent,
    });
  }
  res.status(200).render('home', {
    title: 'Home',
    files: getAllFiles,
    downloadsAndEmails: getNumberOfFileDownloadsAndEmailSent,
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
export const getResetPasswordPage = catchAsync(
  async (req: any, res: any, next: any) => {
    // STEP: Get token from URL
    const hashToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await db.User.findOne({
      where: {
        passwordResetToken: hashToken,
        passwordResetExpires: { [Op.gt]: Date.now() },
      },
    });

    // STEP:  If token has not expired, and there is a user, set the new password
    if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
    }
    res.status(200).render('resetPassword', {
      title: 'Reset Password',
    });
  }
);
export const getforgotPasswordPage = (req: any, res: any, next: any) => {
  res.status(200).render('forgotPassword', {
    title: 'Forgot password',
  });
};
export const getSendEmailPage = async (req: any, res: any, next: any) => {
  const getAllFiles = await db.File.findAll();

  let files = getAllFiles.map((el: any, i: number) => {
    return { title: getAllFiles[i].title, slug: getAllFiles[i].slug };
  });
  

  res.status(200).render('email', {
    title: 'Send Email',
    options: files
  });
};
export const getAddFilePage = (req: any, res: any, next: any) => {
  res.status(200).render('addFile', {
    title: 'Add File',
  });
};
