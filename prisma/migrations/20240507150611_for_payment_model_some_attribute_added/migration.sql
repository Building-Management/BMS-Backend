/*
  Warnings:

  - Added the required column `txRef` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `payment_status` VARCHAR(200) NOT NULL DEFAULT 'Pending',
    ADD COLUMN `txRef` VARCHAR(3000) NOT NULL;
