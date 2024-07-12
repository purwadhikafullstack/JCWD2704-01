import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { ZodError } from 'zod';
import type { Express, Request, Response, NextFunction } from 'express';

import { BadRequestError, InternalServerError, NotFoundError } from './utils/error';
import { errorResponse } from './utils/message';
import { corsOptions, PORT } from './config';

import userRouter from './routers/user.router';
export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use('/api/users', userRouter.getRouter());

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof BadRequestError) {
        res.status(error.statusCode).send(errorResponse(error.message, error.cause));
      } else if (error instanceof NotFoundError) {
        res.status(error.statusCode).send(errorResponse(error.message, error.cause));
      } else if (error instanceof InternalServerError) {
        res.status(error.statusCode).send(errorResponse(error.message, error.cause));
      } else if (error instanceof ZodError) {
        const errorMessage = error.errors.map((err) => ({
          message: `${err.path.join('.')} is ${err.message}`,
        }));
        res.status(400).send({ error: 'Invalid Data Input', detail: errorMessage });
      }

      console.error('Unknown Error:', error);
      res.status(500).send(errorResponse(error.message, error.cause));
    });
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
