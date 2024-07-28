import { getSalesReportSchema } from '@/libs/zod-schemas/order.schema';
import { AuthError } from '@/utils/error';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

class ReportService {
  async getSalesReport(req: Request) {
    if (!req.user) throw new AuthError();
    const { id, role } = req.user;
    if (role == 'customer') throw new AuthError();

    const { year, category, pn, store_id } = getSalesReportSchema.parse(req.query);
    const where: Prisma.OrderDetailWhereInput = {
      transaction: { status: 'sended', store_id },
      ...(year && {
        created_at: {
          gte: new Date(`${year}-01-01T00:00:00Z`),
        },
        lt: new Date(`${year + 1}-01-01T00:00:00Z`),
      }),
    };
  }
  async getStockReport(req: Request) {
    if (!req.user) throw new AuthError();
    const { id, role } = req.user;
    if (role == 'customer') throw new AuthError();
    const where: Prisma.CustomerOrdersWhereInput = {};
  }
}

export default new ReportService();
