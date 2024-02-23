/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `intensity` on table `session` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_authorId_fkey`;

-- AlterTable
ALTER TABLE `session` MODIFY `intensity` ENUM('LIGHT', 'MODERATE', 'HIGH', 'VERY_HIGH') NOT NULL,
    MODIFY `authorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
