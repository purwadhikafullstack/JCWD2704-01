import addressService from '@/services/address.service';
import { Controller } from './index.types';

class AddressController {
  userAddress: Controller = async (req, res, next) => {
    try {
      const address = await addressService.userAddress(req);
      res.send();
    } catch (error) {
      next(error);
    }
  };
}

export default new AddressController();
