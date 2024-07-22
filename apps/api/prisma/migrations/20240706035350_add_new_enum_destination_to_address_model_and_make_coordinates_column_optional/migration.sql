/*
  Warnings:

  - You are about to drop the column `is_active` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `promo_id` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `unit_price` on the `product_variants` table. All the data in the column will be lost.
  - Added the required column `unit_price` to the `store_stock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product_variants` DROP FOREIGN KEY `product_variants_promo_id_fkey`;

-- DropIndex
DROP INDEX `product_variants_id_type_name_discount_idx` ON `product_variants`;

-- AlterTable
ALTER TABLE `addresses` MODIFY `type` ENUM('personal', 'store', 'destination') NOT NULL DEFAULT 'personal',
    MODIFY `latitude` DOUBLE NULL,
    MODIFY `longitude` DOUBLE NULL;

-- AlterTable
ALTER TABLE `customer_orders` ADD COLUMN `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `is_active`;

-- AlterTable
ALTER TABLE `product_variants` DROP COLUMN `discount`,
    DROP COLUMN `promo_id`,
    DROP COLUMN `unit_price`;

-- AlterTable
ALTER TABLE `store_stock` ADD COLUMN `discount` INTEGER NULL,
    ADD COLUMN `promo_id` VARCHAR(191) NULL,
    ADD COLUMN `unit_price` DOUBLE NOT NULL;

-- CreateIndex
CREATE INDEX `product_variants_id_type_name_idx` ON `product_variants`(`id`, `type`, `name`);

-- AddForeignKey
ALTER TABLE `store_stock` ADD CONSTRAINT `store_stock_promo_id_fkey` FOREIGN KEY (`promo_id`) REFERENCES `promotions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_orders` ADD CONSTRAINT `customer_orders_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
