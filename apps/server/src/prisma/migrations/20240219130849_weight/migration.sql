-- AlterTable
ALTER TABLE `session` ADD COLUMN `intensity` ENUM('LIGHT', 'MODERATE', 'HIGH', 'VERY_HIGH') NULL;
