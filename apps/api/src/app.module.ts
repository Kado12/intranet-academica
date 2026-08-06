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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
