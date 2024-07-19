import { EntityController } from './entity.controller';
import addressService from '@/services/address.service';

class AddressController extends EntityController {
  getUserAddresses = this.sendResponse({
    service: addressService.getUserAddresses,
    response: 'fetch user addresses',
  });
}

export default new AddressController()