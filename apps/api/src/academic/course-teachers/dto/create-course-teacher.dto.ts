import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCourseTeacherDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del curso' })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del docente (usuario con rol DOCENTE)' })
  @IsString()
  @IsNotEmpty()
  teacherId: string;
}
