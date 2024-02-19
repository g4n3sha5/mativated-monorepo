/*
  Warnings:

  - You are about to drop the column `fightTime` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `session` DROP COLUMN `fightTime`,
    ADD COLUMN `drillingTime` INTEGER NULL,
    ADD COLUMN `sparringTime` INTEGER NULL;
