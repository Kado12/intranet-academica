import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'MAT', description: 'Código del curso' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Matemática', description: 'Nombre del curso' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Curso de matemática básica', description: 'Descripción del curso', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: true, description: 'Estado activo del curso', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
