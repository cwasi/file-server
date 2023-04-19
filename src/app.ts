import path from 'path';

import express from 'express';
// Developer Modules
import morgan from 'morgan';
import userRouter from './routes/userRoutes';
import fileRouter from './routes/fileRouter';
import viewRouter from './routes/viewRoutes';

// Start express app
const app = express();

// Set up template engine PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));
app.use(express.static('node_modules'));

// Body passer, reading data from body
app.use(express.json());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

console.log('📍📍📍📍📍📍', process.env.NODE_ENV);

// Test middleware
app.use((req, res, next) => {
  console.log('MIDDLEWARE');
  next();
});

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

export default app;
