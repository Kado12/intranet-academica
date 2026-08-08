/*
  Warnings:

  - A unique constraint covering the columns `[documentNumber]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `enrollments` ADD COLUMN `paymentPlanId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `profiles` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `avatarPublicId` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sections` ADD COLUMN `priority` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `mustChangePassword` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `passwordChangedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `payment_plans` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('FULL_PAYMENT', 'INSTALLMENTS', 'SIBLING_DISCOUNT', 'AGREEMENT', 'SCHOLARSHIP', 'OTHER') NOT NULL,
    `description` VARCHAR(191) NULL,
    `baseAmount` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `finalAmount` DOUBLE NOT NULL,
    `installments` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `sedeId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `payment_plans_sedeId_idx`(`sedeId`),
    INDEX `payment_plans_type_idx`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `enrollments_paymentPlanId_idx` ON `enrollments`(`paymentPlanId`);

-- CreateIndex
CREATE UNIQUE INDEX `profiles_documentNumber_key` ON `profiles`(`documentNumber`);

-- CreateIndex
CREATE INDEX `profiles_documentNumber_idx` ON `profiles`(`documentNumber`);

-- CreateIndex
CREATE INDEX `sections_priority_idx` ON `sections`(`priority`);

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_paymentPlanId_fkey` FOREIGN KEY (`paymentPlanId`) REFERENCES `payment_plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_plans` ADD CONSTRAINT `payment_plans_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
