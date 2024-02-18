/*
  Warnings:

  - You are about to alter the column `type` on the `session` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `Enum(EnumId(0))`.
  - Added the required column `time` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `session` ADD COLUMN `time` TIME NOT NULL,
    MODIFY `type` ENUM('GI', 'NO_GI', 'GYM', 'YOGA', 'MMA', 'BOXING', 'RUN', 'SWIM', 'BIKE', 'MEDITATION', 'OTHER') NOT NULL;
