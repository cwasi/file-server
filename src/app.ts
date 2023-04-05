import express from 'express';
// Developer Modules
import morgan from 'morgan';
import userRouter from './routes/userRoutes';

// Start express app
const app = express();

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


app.get('/', (req, res, next) => {
  res.send('FILE SERVER');
});

app.use((req:any, res:any, next:any) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/auth', userRouter);

export default app;
