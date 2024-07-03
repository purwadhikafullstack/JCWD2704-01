import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import cartService from '@/services/cart.service';

export class CartController {
  async getCartByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cartService.getCartByUserId(req);
      res.send({
        message: 'fetch user cart',
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async upsetCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cartService.upsertCart(req);
      res.status(201).send({ message: 'success add or update cart', data });
    } catch (error) {
      next(error);
    }
  }

  async deleteFromCart(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await cartService.deleteProductInCart(req);
      res.send({ message: 'success add or update cart', data });
    } catch (error) {
      next(error);
    }
  }
}
