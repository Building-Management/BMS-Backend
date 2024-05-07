/*
  Warnings:

  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Freelancer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Rentee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `role` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Freelancer` ADD COLUMN `role` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `Rentee` ADD COLUMN `role` VARCHAR(30) NOT NULL;
