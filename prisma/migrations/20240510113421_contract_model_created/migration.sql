-- CreateTable
CREATE TABLE `Contract` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` VARCHAR(255) NOT NULL,
    `end_date` VARCHAR(255) NOT NULL,
    `monthly_payment` INTEGER NOT NULL,
    `block_id` INTEGER NULL,
    `rentee_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_block_id_fkey` FOREIGN KEY (`block_id`) REFERENCES `Block`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_rentee_id_fkey` FOREIGN KEY (`rentee_id`) REFERENCES `Rentee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
