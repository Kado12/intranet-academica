import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateSectionCourseDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del nuevo docente', required: false })
  @IsString()
  @IsOptional()
  teacherId?: string;
}
