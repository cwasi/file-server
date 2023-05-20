import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// FUNCTIONS
export const changePasswordAfter = function (JWTTimestamp: any, user: any) {
  const passwordChangedAt: any = user.passwordChangedAt.getTime() / 1000;

  if (user.passwordChangedAt) {
    const changeTimeStamp = parseInt(passwordChangedAt, 10);
    return JWTTimestamp < changeTimeStamp;
  }
  // NOTE: if FALSE means password was NOT change
  return false;
};

export const correctPasswordResetToken = (user: any) => {
  const resetToken = crypto.randomBytes(32).toString('hex');

  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const comparePasswords = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const signToken = (id: string) => {
  const JWT_SECRET: any = process.env.JWT_SECRET;
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//
export const createAndSendToken = (
  user: any,
  statusCode: number,
  res: any,
  req: any
) => {
  const token = signToken(user.id);
  const JWT_COOKIE_EXPIRES_IN: any = process.env.JWT_COOKIE_EXPIRES_IN;
  const cookieOption: any = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  // secure cookie http in production
  if (process.env.NODE_ENV === 'production') {
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
