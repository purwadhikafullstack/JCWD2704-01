import citiesService from '@/services/cities.service';
import { NextFunction, Request, Response } from 'express';
import { EntityController } from './entity.controller';
import addressService from '@/services/address.service';

export class AddressController extends EntityController {
  getUserAddresses = this.sendResponse({
    service: addressService.getUserAddresses,
    response: 'fetch user addresses',
  });
}
export default new AddressController();
