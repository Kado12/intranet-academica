import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSectionCourseDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID de la sección' })
  @IsString()
  @IsNotEmpty()
  sectionId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del curso' })
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del docente asignado' })
  @IsString()
  @IsNotEmpty()
  teacherId: string;
}
