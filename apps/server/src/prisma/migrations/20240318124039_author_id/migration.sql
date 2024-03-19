/*
  Warnings:

  - Made the column `time` on table `session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_authorId_fkey`;

-- AlterTable
ALTER TABLE `session` MODIFY `time` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`externalId`) ON DELETE RESTRICT ON UPDATE CASCADE;
