import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SedesModule } from './academic/sedes/sedes.module';
import { TurnModule } from './academic/turns/turns.module';
import { PeriodModule } from './academic/periods/periods.module';
import { ClassroomModule } from './academic/classrooms/classrooms.module';
import { SectionModule } from './academic/sections/sections.module';
import { CourseModule } from './academic/courses/courses.module';
import { CourseTeacherModule } from './academic/course-teachers/course-teachers.module';
import { SectionCourseModule } from './academic/section-courses/section-courses.module';
import { EnrollmentModule } from './academic/enrollments/enrollments.module';
import { ParentStudentModule } from './academic/parent-students/parent-students.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    SedesModule,
    TurnModule,
    PeriodModule,
    ClassroomModule,
    SectionModule,
    CourseModule,
    ParentStudentModule,
    CourseTeacherModule,
    SectionCourseModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
