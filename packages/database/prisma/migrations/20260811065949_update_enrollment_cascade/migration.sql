-- DropForeignKey
ALTER TABLE `enrollments` DROP FOREIGN KEY `enrollments_studentId_fkey`;

-- AddForeignKey
ALTER TABLE `enrollments` ADD CONSTRAINT `enrollments_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
