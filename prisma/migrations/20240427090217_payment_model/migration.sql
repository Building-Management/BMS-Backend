-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rent_price` VARCHAR(255) NOT NULL,
    `payment_date` VARCHAR(255) NOT NULL,
    `rentee_id` INTEGER NULL,
    `block_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_rentee_id_fkey` FOREIGN KEY (`rentee_id`) REFERENCES `Rentee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_block_id_fkey` FOREIGN KEY (`block_id`) REFERENCES `Block`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
