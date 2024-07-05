import orderService from '@/services/order.service';
import { resControl } from '@/utils/resControl';

export class OrderController {
  createCutomerOrder = resControl({
    msg: 'success create order',
    service: orderService.createOrder,
    status: 201,
  });

  getOrderList = resControl({
    msg: 'fetch order list',
    service: orderService.getOrderList,
  });

  getOrderByInv = resControl({
    msg: 'fetch order',
    service: orderService.getOrderByInv,
  });
}
