import { Prisma, PrismaClient } from '@prisma/client';

export const userTransactionOption = {
  maxWait: 5000,
  timeout: 10000,
  isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
};

const a = ['query', 'info', 'warn', 'error'];
export default new PrismaClient({ log: ['error'] });
