import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import qs from 'qs';

import connectDB from './config/dbConnect.js';
import errorHandler from './middlewares/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

// connect back and front for deployment
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathdirname(__filename);

// Handle Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err}`);
  console.log('Shutting down due to Uncaught exception');
  process.exit(1);
});

connectDB();

const app = express();
app.set('query parser', (str) => qs.parse(str));

// app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: '1mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

app.use('/api/nj1', productRoutes);
app.use('/api/nj1', authRoutes);
app.use('/api/nj1', orderRoutes);
app.use('/api/nj1', paymentRoutes);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get(/'*'/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Using error middleware to handling errors
app.use(errorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handle Unhandled Promise rejections on server
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`);
  console.log('Shutting down server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});
