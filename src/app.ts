// system Modules
import path, { dirname } from 'path';

// Third party Modules
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Developer Modules
import userRouter from './routes/userRoutes';
import fileRouter from './routes/fileRouter';
import viewRouter from './routes/viewRoutes';
import emailRouter from './routes/emailRoutes';
import downloadRouter from './routes/downloadRouter';
import globalErrorHandler from './controllers/errorController';
import AppError from './utils/appError';

// Start express app
const app = express();

app.enable('trust proxy');

// Set up template engine PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../views'));

app.use(cors());
app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, '/bin')));
app.use(express.static(path.join('assets')));
app.use(express.static(path.join('public')));

// Body passer, reading data from body
app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

console.log('🚀🚀🚀🚀', process.env.NODE_ENV);

// Test middleware
// app.use((req, res, next) => {
//   console.log('MIDDLEWARE');
//   console.log('🦄🦄🦄🦄🦄', req.cookies);
//   next();
// });

// app.get('/', (req, res, next) => {
//   res.send('FILE SERVER');
// });

app.use((req: any, res: any, next: any) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);
app.use('/auth', userRouter);
app.use('/api/file', fileRouter);
app.use('/api/download', downloadRouter);
app.use('/api/email', emailRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
