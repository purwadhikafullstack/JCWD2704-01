/*
  Warnings:

  - The primary key for the `shopping_carts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `shopping_carts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `latitude` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `latitude` DOUBLE NOT NULL,
    ADD COLUMN `longitude` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `blob` MEDIUMBLOB NOT NULL;

-- AlterTable
ALTER TABLE `shopping_carts` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`user_id`, `store_stock_id`);

-- CreateIndex
CREATE UNIQUE INDEX `images_name_key` ON `images`(`name`);
