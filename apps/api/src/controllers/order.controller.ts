import orderService from '@/services/order.service';
import { EntityController } from './entity.controller';
import order2Service from '@/services/order2.service';

export class OrderController extends EntityController {
  createCutomerOrder = this.sendResponse({
    service: order2Service.createOrder,
    response: ({ res, data }) => {
      res.send({ message: 'Success create order', data });
    },
    status: 201,
  });

  getOrderList = this.sendResponse({
    service: orderService.getOrderList,
    response: 'fetch order list',
  });

  getShipCost = this.sendResponse({
    service: order2Service.getShipCost,
    response: 'fetch shipping cost',
  });

  getOrderByInv = this.sendResponse({
    service: orderService.getOrderByInv,
    response: 'fetch order',
  });

  uploadPaymentProof = this.sendResponse({
    service: orderService.uploadPaymentProof,
    status: 201,
    response: ({ res, data }) => {
      res.send({ message: 'Success upload payment', data });
    },
  });
}
export default new OrderController();
