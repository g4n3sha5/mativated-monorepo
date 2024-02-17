-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `type` DATETIME(3) NOT NULL,
    `location` VARCHAR(255) NULL,
    `minutesLength` INTEGER NOT NULL,
    `notes` VARCHAR(191) NULL,
    `fightTime` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technique` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SessionToTechnique` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SessionToTechnique_AB_unique`(`A`, `B`),
    INDEX `_SessionToTechnique_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SessionToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SessionToUser_AB_unique`(`A`, `B`),
    INDEX `_SessionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SessionToTechnique` ADD CONSTRAINT `_SessionToTechnique_A_fkey` FOREIGN KEY (`A`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SessionToTechnique` ADD CONSTRAINT `_SessionToTechnique_B_fkey` FOREIGN KEY (`B`) REFERENCES `Technique`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SessionToUser` ADD CONSTRAINT `_SessionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SessionToUser` ADD CONSTRAINT `_SessionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User.email_unique` TO `User_email_key`;
