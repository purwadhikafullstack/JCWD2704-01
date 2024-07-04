/*
  Warnings:

  - A unique constraint covering the columns `[inv_no]` on the table `customer_orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `customer_orders_inv_no_key` ON `customer_orders`(`inv_no`);
