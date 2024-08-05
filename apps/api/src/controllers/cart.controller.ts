import cartService from '@/services/cart.service';
import { EntityController } from './entity.controller';
import { cookiesOpt } from '@/utils/cookiesOpt';

export class CartController extends EntityController {
  getCartByUserId = this.sendResponse({
    service: cartService.getCartByUserId,
    response: 'fetch cart',
  });
  getCountCart = this.sendResponse({
    service: cartService.getCountCart,
    response: 'fetch cart',
  });

  upsetCart = this.sendResponse({
    service: cartService.upsertCart,
    response: ({ res, data }) => {
      res.cookie('access_token', data, cookiesOpt).send({ message: 'success upsert', cookie: data });
    },
  });

  deleteFromCart = this.sendResponse({
    service: cartService.deleteProductInCart,
    response: ({ res, data }) => {
      res.cookie('access_token', data, cookiesOpt).send({ message: 'success remove product from cart', cookie: data });
    },
  });
}
