/*
  Warnings:

  - You are about to alter the column `location` on the `session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - The primary key for the `technique` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_sessiontotechnique` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Technique` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Technique` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Technique` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_sessiontotechnique` DROP FOREIGN KEY `_SessionToTechnique_A_fkey`;

-- DropForeignKey
ALTER TABLE `_sessiontotechnique` DROP FOREIGN KEY `_SessionToTechnique_B_fkey`;

-- AlterTable
ALTER TABLE `session` MODIFY `location` VARCHAR(191) NULL,
    MODIFY `notes` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `technique` DROP PRIMARY KEY,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `giOnly` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sessionId` INTEGER NULL,
    ADD COLUMN `type` ENUM('CHOKE', 'TAKEDOWN', 'JOINT_LOCK', 'SWEEP', 'ESCAPE', 'TRANSITION', 'GUARD', 'GUARD_PASS', 'CONTROL', 'DEFENCE', 'POSITION', 'SUBMISSION') NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `_sessiontotechnique`;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Tag_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TechniqueTags` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_TechniqueTags_AB_unique`(`A`, `B`),
    INDEX `_TechniqueTags_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Technique_name_key` ON `Technique`(`name`);

-- AddForeignKey
ALTER TABLE `Technique` ADD CONSTRAINT `Technique_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Technique` ADD CONSTRAINT `Technique_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TechniqueTags` ADD CONSTRAINT `_TechniqueTags_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TechniqueTags` ADD CONSTRAINT `_TechniqueTags_B_fkey` FOREIGN KEY (`B`) REFERENCES `Technique`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
