import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { SuperAdminRouter } from './routers/super-admin.router';
import { error } from 'console';
import {
  AuthError,
  BadRequestError,
  CustomError,
  InternalServerError,
  InvalidDataError,
  NotFoundError,
  PaymentError,
} from './utils/error';
import { ZodError } from 'zod';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
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
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          if (err instanceof ZodError) {
            const errorMessage = err.errors.map((err) => ({
              message: `${err.path.join('.')} is ${err.message}`,
            }));
          }
          if (err instanceof CustomError) {
            res.status(err.statusCode).send({ message: err.message });
          } else {
            res.status(500).send({ message: err.message });
          }
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const superAdminRouter = new SuperAdminRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/admin', superAdminRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
