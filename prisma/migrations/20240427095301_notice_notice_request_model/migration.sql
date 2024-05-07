-- CreateTable
CREATE TABLE `Notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `issue` VARCHAR(2000) NOT NULL,
    `notice_date` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoticeRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noticeId` INTEGER NOT NULL,
    `renteeId` INTEGER NOT NULL,
    `block_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BlockToNotice` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BlockToNotice_AB_unique`(`A`, `B`),
    INDEX `_BlockToNotice_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_NoticeToRentee` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_NoticeToRentee_AB_unique`(`A`, `B`),
    INDEX `_NoticeToRentee_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NoticeRequest` ADD CONSTRAINT `NoticeRequest_noticeId_fkey` FOREIGN KEY (`noticeId`) REFERENCES `Notice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoticeRequest` ADD CONSTRAINT `NoticeRequest_renteeId_fkey` FOREIGN KEY (`renteeId`) REFERENCES `Rentee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoticeRequest` ADD CONSTRAINT `NoticeRequest_block_id_fkey` FOREIGN KEY (`block_id`) REFERENCES `Block`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlockToNotice` ADD CONSTRAINT `_BlockToNotice_A_fkey` FOREIGN KEY (`A`) REFERENCES `Block`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlockToNotice` ADD CONSTRAINT `_BlockToNotice_B_fkey` FOREIGN KEY (`B`) REFERENCES `Notice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NoticeToRentee` ADD CONSTRAINT `_NoticeToRentee_A_fkey` FOREIGN KEY (`A`) REFERENCES `Notice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_NoticeToRentee` ADD CONSTRAINT `_NoticeToRentee_B_fkey` FOREIGN KEY (`B`) REFERENCES `Rentee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
