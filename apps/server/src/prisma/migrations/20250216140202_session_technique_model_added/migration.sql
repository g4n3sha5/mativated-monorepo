/*
  Warnings:

  - You are about to drop the column `sessionId` on the `technique` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `technique` DROP FOREIGN KEY `Technique_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `technique` DROP FOREIGN KEY `Technique_userId_fkey`;

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `technique` DROP COLUMN `sessionId`,
    MODIFY `userId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `SessionTechnique` (
    `id` VARCHAR(191) NOT NULL,
    `sessionId` INTEGER NOT NULL,
    `techniqueId` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `drillingTime` INTEGER NULL,

    INDEX `SessionTechnique_sessionId_techniqueId_idx`(`sessionId`, `techniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Technique` ADD CONSTRAINT `Technique_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionTechnique` ADD CONSTRAINT `SessionTechnique_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SessionTechnique` ADD CONSTRAINT `SessionTechnique_techniqueId_fkey` FOREIGN KEY (`techniqueId`) REFERENCES `Technique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `_techniquetags` RENAME INDEX `_TechniqueTags_AB_unique` TO `_techniqueTags_AB_unique`;

-- RenameIndex
ALTER TABLE `_techniquetags` RENAME INDEX `_TechniqueTags_B_index` TO `_techniqueTags_B_index`;
