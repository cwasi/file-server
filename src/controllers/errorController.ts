import AppError from '../utils/appError';

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleValidationErrorDB = (err: any) => {
  const message = `Invalid input data.${err.message.split(':')[1]}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = () => {
  const message = `Duplicate field value. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: any, req: any, res: any) => {
  if (
    req.originalUrl.startsWith('/api') ||
    req.originalUrl.startsWith('/auth')
  ) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};
const sendErrorProd = (err: any, req: any, res: any) => {
  // NOTE: Operational errors trusted error: send message to client
  if (
    req.originalUrl.startsWith('/api') ||
    req.originalUrl.startsWith('/auth')
  ) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // NOTE: other unknown error: Don't leak error details
    }
    // STEP: LOG THE ERROR
    console.log('ERROR 💥💥💥', err);

    // STEP: SEND A GENERIC MESSAGE
    return res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

export default (err: any, req: any, res: any, next: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'SequelizeUniqueConstraintError') {
      error = handleDuplicateFieldsDB();
    }
    if (error.name === 'SequelizeValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (err.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
  next();
};
