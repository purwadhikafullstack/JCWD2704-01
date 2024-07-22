/*
  Warnings:

  - You are about to drop the column `province_id` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `images` table. All the data in the column will be lost.
  - You are about to drop the `user_details` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[image_id]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatar_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_details` DROP FOREIGN KEY `user_details_id_fkey`;

-- AlterTable
ALTER TABLE `cities` DROP COLUMN `province_id`;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `product_id`,
    DROP COLUMN `user_id`;

-- AlterTable
ALTER TABLE `product_variants` ADD COLUMN `image_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `promotions` MODIFY `type` ENUM('discount', 'voucher', 'referral_voucher', 'cashback', 'free_shipping') NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `avatar_id` VARCHAR(191) NULL,
    ADD COLUMN `dob` DATETIME(3) NULL,
    ADD COLUMN `full_name` VARCHAR(100) NULL,
    ADD COLUMN `gender` ENUM('male', 'female') NULL DEFAULT 'male',
    ADD COLUMN `phone_no` VARCHAR(25) NULL,
    ADD COLUMN `voucher_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `user_details`;

-- CreateIndex
CREATE UNIQUE INDEX `product_variants_image_id_key` ON `product_variants`(`image_id`);

-- CreateIndex
CREATE UNIQUE INDEX `users_avatar_id_key` ON `users`(`avatar_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_avatar_id_fkey` FOREIGN KEY (`avatar_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_voucher_id_fkey` FOREIGN KEY (`voucher_id`) REFERENCES `promotions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_variants` ADD CONSTRAINT `product_variants_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
