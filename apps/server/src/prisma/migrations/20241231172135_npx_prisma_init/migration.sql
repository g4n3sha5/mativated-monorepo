/*
  Warnings:

  - You are about to alter the column `location` on the `Session` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `Session_authorId_fkey` ON `Session`;

-- AlterTable
ALTER TABLE `Session` MODIFY `location` VARCHAR(191) NULL,
    MODIFY `notes` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `externalId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_externalId_key`(`externalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`externalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
