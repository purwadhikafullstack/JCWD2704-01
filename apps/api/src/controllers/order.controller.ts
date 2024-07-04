import { NextFunction, Request, Response } from 'express';
import orderService from '@/services/order.service';

export class OrderController {
  async createCutomerOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await orderService.createOrder(req);
      res.status(201).send({
        message: 'success create order',
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
