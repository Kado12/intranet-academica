import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
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
import { AttendanceModule } from './academic/attendance/attendance.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { PaymentPlanModule } from './academic/payment-plans/payment-plans.module';
import { AuditModule } from './common/audit/audit.module';
import { PaymentsModule } from './academic/payments/payments.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TeacherAttendanceModule } from './academic/teacher-attendance/teacher-attendance.module';
import { ExportsModule } from './exports/exports.module';
import { ImportsModule } from './imports/imports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          name: 'short',
          ttl: 1000,
          limit: 10,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 50,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    CloudinaryModule,
    AuditModule,
    PrismaModule,
    AuthModule,
    UsersModule,
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
    AttendanceModule,
    PaymentPlanModule,
    PaymentsModule,
    StatisticsModule,
    TeacherAttendanceModule,
    ExportsModule,
    ImportsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
