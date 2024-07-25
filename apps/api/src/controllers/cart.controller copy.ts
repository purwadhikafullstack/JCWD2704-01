import reportService from '@/services/report.service';
import { EntityController } from './entity.controller';

export class ReportController extends EntityController {
  getSalesReport = this.sendResponse({
    service: reportService.getSalesReport,
    response: 'fetch cart',
  });
  getStockReport = this.sendResponse({
    service: reportService.getStockReport,
    response: 'fetch cart',
  });
}
export default new ReportController();
