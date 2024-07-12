import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { corsOptions, PORT } from './config';
import cartRouter from './routers/cart.router';
import orderRouter from './routers/order.router';
import { CustomError } from './utils/error';
import { ZodError } from 'zod';
import cron from 'node-cron';
import orderService from './services/order.service';
import superAdminRouter from './routers/super-admin.router';
import citiesRouter from './routers/cities.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
    this.autoSchedule();
  }

  private configure(): void {
    this.app.use(cors(corsOptions));
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send('Not found !');
      next();
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
    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/admin', superAdminRouter.getRouter());
    this.app.use('/cities', citiesRouter.getRouter());

    this.app.use(
      '/cart',
      /*Tambahin user only middleware ,*/
      cartRouter.getRouter(),
    );
    this.app.use('/order', orderRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }

  public autoSchedule() {
    cron.schedule('* * * * *', orderService.orderAutoHandler);
  }
}
