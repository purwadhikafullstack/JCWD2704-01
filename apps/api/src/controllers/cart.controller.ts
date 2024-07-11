import cartService from '@/services/cart.service';
import { EntityController } from './entity.controller';

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
    response: 'success update cart',
    service: cartService.upsertCart,
  });

  deleteFromCart = this.sendResponse({
    response: 'success remove product from cart',
    service: cartService.deleteProductInCart,
  });
}
