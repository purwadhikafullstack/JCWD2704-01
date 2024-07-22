/*
  Warnings:

  - You are about to drop the column `store_admin_id` on the `stores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `stores` DROP COLUMN `store_admin_id`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_banned` BOOLEAN NOT NULL DEFAULT false;
