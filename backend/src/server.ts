import 'reflect-metadata';
import './database/connection';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { ValidationError } from 'yup';
import cors from 'cors';

import uploadConfig from './config/upload';
import orphanagesRouter from './routes/orphanages.routes';
import AppError from './errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/orphanages', orphanagesRouter);
app.use('/uploads', express.static(uploadConfig.uploadsFolder));

interface ValidationErros {
  [key: string]: string[];
}

app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    console.error(error);

    if (error instanceof ValidationError) {
      const errors: ValidationErros = {};

      error.inner.forEach(err => {
        errors[err.path] = err.errors;
      });

      return response.status(400).json({ message: 'Validation fails', errors });
    }

    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
