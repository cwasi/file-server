import jwt from 'jsonwebtoken';

import crypto from 'crypto';
import db from './../models';
import bcrypt from 'bcryptjs';
import sendEmail from './../utils/email';

export const User = db.User;

// Hooks
User.beforeSave(async (user: any) => {
  if (!user.changed('password')) {
    return;
  }
  user.password = await bcrypt.hash(user.password, 12);
});

User.beforeSave(async (user: any) => {
  if (!user.changed('password')) {
    return;
  }
  user.passwordChangedAt = Date.now() - 1000;
});

// FUNCTIONS

const correctPasswordResetToken = (user: any) => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const comparePasswords = (candidatePassword: string, userPassword: string) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

const signToken = (id: string) => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user: any, statusCode: number, res: any) => {
  const token = signToken(user.id);
  const JWT_COOKIE_EXPIRES_IN: any = process.env.JWT_COOKIE_EXPIRES_IN;
  const cookieOption: any = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  // secure cookie http in production
  if (process.env.NODE_ENV) {
    cookieOption.secure = true;
  }

  // send cookie
  res.cookie('jwt', token, cookieOption);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};

// ROUTES HANDLERS
export const signup = async (req: any, res: any, next: any) => {
  try {
    console.log(req.body);
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
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      data: {
        error: error,
      },
    });
  }
};

export const login = async (req: any, res: any, next: any) => {
  const { email, password } = req.body;

  // STEP: chech if email and password is not empty
  if (!email || !password) {
    throw new Error('Please provide email or password');
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
  const passwords = await comparePasswords(password, user.password);
  if (!email || !passwords) {
    throw new Error('incorrect email or password');
  }

  // STEP: send token
  createAndSendToken(user, 200, res);
};

export const forgotPassword = async (req: any, res: any, next: any) => {
  // STEP: Get user based on posted email
  const email = req.body.email;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error(`There is no user with the email address ${email}`);
  }

  // STEP: Generate a random reset token
  const resetToken = correctPasswordResetToken(user);
  await user.save();

  // STEP:  send it to use's  email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

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

    throw new Error('There was an error sending the email. Try again later');
  }
};
