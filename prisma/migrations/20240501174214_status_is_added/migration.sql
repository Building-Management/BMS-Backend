-- AlterTable
ALTER TABLE `Admin` ADD COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `Freelancer` ADD COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE `Rentee` ADD COLUMN `status` VARCHAR(50) NOT NULL DEFAULT 'active';
