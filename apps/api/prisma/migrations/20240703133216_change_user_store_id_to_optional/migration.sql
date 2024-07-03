-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_store_id_fkey`;

-- AlterTable
ALTER TABLE `users` MODIFY `store_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`address_id`) ON DELETE SET NULL ON UPDATE CASCADE;
