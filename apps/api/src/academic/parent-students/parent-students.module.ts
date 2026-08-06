import { Module } from '@nestjs/common';
import { ParentStudentsService } from './parent-students.service';
import { ParentStudentsController } from './parent-students.controller';

@Module({
  controllers: [ParentStudentsController],
  providers: [ParentStudentsService],
  exports: [ParentStudentsService],
})
export class ParentStudentModule {}
