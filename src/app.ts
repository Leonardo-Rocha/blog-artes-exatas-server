import 'reflect-metadata';
import express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import './database';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(json());
app.use(cors());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
