/*
  Warnings:

  - You are about to drop the `_sessiontouser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_sessiontouser` DROP FOREIGN KEY `_SessionToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_sessiontouser` DROP FOREIGN KEY `_SessionToUser_B_fkey`;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `authorId` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NULL;

-- DropTable
DROP TABLE `_sessiontouser`;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
