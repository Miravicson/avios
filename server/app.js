import path from 'path';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { AppError } from '@utils';
import globalErrorHandler from '@controllers/errorController';
import { v1Router } from '@routes/index';
import { setSecurityMiddleWare } from '@utils/globalMiddleWare';

const app: express$Application<express$Request, express$Response> = express();
app.enable('trust proxy'); // allow our application to trust proxy
app.use(express.static(path.resolve('./server/public'))); // path for static files

// Implement cors
app.use(cors());

app.options('*', cors()); // enabling cors for preflight requests.

// 1) SECURITY MIDDLEWARE

setSecurityMiddleWare(app);

// 2) GLOBAL MIDDLEWARE

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(compression({}));

// API Routes
app.use('/api/v1', v1Router);
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
);

// 4) Error handler
app.all(
  '*',
  (req: express$Request, res: express$Response, next: express$NextFunction) => {
    const err = new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404
    );
    next(err);
  }
);

app.use(globalErrorHandler);

module.exports = app;
