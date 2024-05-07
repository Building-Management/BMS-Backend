-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone number` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `account number` INTEGER NOT NULL,
    `password` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Freelancer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone number` VARCHAR(20) NOT NULL,
    `self description` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `image url` VARCHAR(255) NOT NULL,
    `portfolio url` VARCHAR(255) NOT NULL,
    `password` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `freelancer_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rentee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone number` INTEGER NOT NULL,
    `kebele url` VARCHAR(255) NOT NULL,
    `contract url` VARCHAR(60) NOT NULL,
    `password` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `rentee_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Block` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `block status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Job` (
    `job_id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_description` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `rentee_id` INTEGER NULL,
    `block_id` INTEGER NULL,

    PRIMARY KEY (`job_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_rentee_id_fkey` FOREIGN KEY (`rentee_id`) REFERENCES `Rentee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_block_id_fkey` FOREIGN KEY (`block_id`) REFERENCES `Block`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
