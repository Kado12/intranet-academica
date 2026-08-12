-- CreateTable
CREATE TABLE `teacher_attendances` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `status` ENUM('PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'VACATION', 'SICK_LEAVE') NOT NULL,
    `notes` VARCHAR(191) NULL,
    `teacherId` VARCHAR(191) NOT NULL,
    `sedeId` VARCHAR(191) NULL,
    `registeredById` VARCHAR(191) NULL,
    `excuseNote` VARCHAR(191) NULL,
    `excuseDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `teacher_attendances_teacherId_idx`(`teacherId`),
    INDEX `teacher_attendances_date_idx`(`date`),
    INDEX `teacher_attendances_sedeId_idx`(`sedeId`),
    UNIQUE INDEX `teacher_attendances_teacherId_date_key`(`teacherId`, `date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `teacher_attendances` ADD CONSTRAINT `teacher_attendances_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_attendances` ADD CONSTRAINT `teacher_attendances_sedeId_fkey` FOREIGN KEY (`sedeId`) REFERENCES `sedes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teacher_attendances` ADD CONSTRAINT `teacher_attendances_registeredById_fkey` FOREIGN KEY (`registeredById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
