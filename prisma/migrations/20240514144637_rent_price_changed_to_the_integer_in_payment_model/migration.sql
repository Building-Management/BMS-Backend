/*
  Warnings:

  - You are about to alter the column `rent_price` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Payment` MODIFY `rent_price` INTEGER NOT NULL;
