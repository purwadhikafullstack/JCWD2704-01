import cartService from '@/services/cart.service';
import { resControl } from '@/utils/resControl';

export class CartController {
  getCartByUserId = resControl({
    msg: 'fetch cart',
    service: cartService.getCartByUserId,
  });

  upsetCart = resControl({
    msg: 'success update cart',
    service: cartService.upsertCart,
  });

  deleteFromCart = resControl({
    msg: 'success remove product from cart',
    service: cartService.deleteProductInCart,
  });
}
