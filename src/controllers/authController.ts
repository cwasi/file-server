import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import crypto from 'crypto';
import db from './../models';
import sendEmail from './../utils/email';
import AppError from './../utils/appError';
import catchAsync from './../utils/catchAsync';
import {
  createAndSendToken,
  changePasswordAfter,
  correctPasswordResetToken,
  comparePasswords,
} from './../utils/helpers';

const User = db.User;

// MIDDLWARES
export const protect = catchAsync(async (req: any, res: any, next: any) => {
  // STEP:  Getting the token and checking if it exist
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('You are not signed in. Please sign to get access', 401)
    );
  }

  // STEP: Verification token
  // NOTE: We verfiy if the data was modified and if the token is expired
  const JWT_SECRET: any = process.env.JWT_SECRET;
  const decoded: any = jwt.verify(token, JWT_SECRET);

  const currentUser = await User.findByPk(decoded.id);

  // STEP:  Check if user still exist
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not exits', 401)
    );
  }

  // STEP:  Check user change password after the token was issued
  if (changePasswordAfter(decoded.iat, currentUser)) {
    next(
      new AppError('user recenty changed password!. Please log in again', 401)
    );
  }

  // STEP: GRANT ACCESS TO PROTECT ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

const isSignedIn = async (req: any, res: any, next: any) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const JWT_SECRET: any = process.env.JWT_SECRET;
      const decoded: any = jwt.verify(req.cookies.jwt, JWT_SECRET);

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (changePasswordAfter(decoded.iat, currentUser)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

const signOut = (req: any, res: any) => {
  res.cookie('jwt', 'signedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// ROUTES HANDLERS
export const signup = catchAsync(async (req: any, res: any, next: any) => {
  const newUser = await db.User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: 'success',
    data: { newUser },
  });
});

export const signin = catchAsync(async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  // STEP: chech if email and password is not empty
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 401));
  }

  const user = await User.findOne({
    where: { email },
    attributes: {
      exclude: [
        'passwordConfirm',
        'createdAt',
        'passwordChangedAt',
        'passwordResetToken',
        'passwordResetExpires',
        'updatedAt',
      ],
    },
  });

  // STEP: check if user exist && password is correct
  if (!user || !(await comparePasswords(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // STEP: send token
  console.log('💥💥💥💥💥💥');
  createAndSendToken(user, 200, res);
});

export const forgotPassword = async (req: any, res: any, next: any) => {
  // STEP: Get user based on posted email
  const email = req.body.email;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return next(
      new AppError(`There is no user with the email address ${email}`, 404)
    );
  }

  // STEP: Generate a random reset token
  const resetToken = correctPasswordResetToken(user);
  await user.save();

  // STEP:  send it to use's  email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/auth/resetPassword/${resetToken}`;

  const message = `Forgort your password?. Submit a PATCH request with you new password and passwordConfirm to ${resetURL}.
  \nIf your didn't forget your password, please ignore this email;`;

  try {
    sendEmail({
      email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    next(
      new AppError('There was an error sending the email. Try again later', 500)
    );
  }
};

export const resetPassword = async (req: any, res: any, next: any) => {
  // STEP: Get token from URL
  const hashToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    where: {
      passwordResetToken: hashToken,
      passwordResetExpires: { [Op.gt]: Date.now() },
    },
  });

  // STEP:  If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // STEP: 3) Update password propety for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  // STEP:  log the user in, send jwt
  createAndSendToken(user, 200, res);
};

export const updateMe = (req: any, res: any, next: any) => {
  res.status(200).json({
    status: 'success',
    message: 'Not implemenet',
  });
};
