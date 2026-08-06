import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del estudiante (usuario con rol ESTUDIANTE)' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID de la sección' })
  @IsString()
  @IsNotEmpty()
  sectionId: string;
}
