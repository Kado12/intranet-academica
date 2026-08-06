import { Module } from '@nestjs/common';
import { SectionCoursesService } from './section-courses.service';
import { SectionCoursesController } from './section-courses.controller';

@Module({
  controllers: [SectionCoursesController],
  providers: [SectionCoursesService],
  exports: [SectionCoursesService],
})
export class SectionCourseModule {}
