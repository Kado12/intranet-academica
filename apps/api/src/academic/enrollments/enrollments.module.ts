import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { StudentCardService } from './student-card.service';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, StudentCardService],
  exports: [EnrollmentsService, StudentCardService],
})
export class EnrollmentModule {}
