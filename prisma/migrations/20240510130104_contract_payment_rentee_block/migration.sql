/*
  Warnings:

  - You are about to drop the column `block_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `rentee_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `contract url` on the `Rentee` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_block_id_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_rentee_id_fkey`;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `block_id`,
    DROP COLUMN `rentee_id`,
    ADD COLUMN `contract_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Rentee` DROP COLUMN `contract url`;

-- CreateIndex
CREATE INDEX `Payment_contract_id_fkey` ON `Payment`(`contract_id`);

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_contract_id_fkey` FOREIGN KEY (`contract_id`) REFERENCES `Contract`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
