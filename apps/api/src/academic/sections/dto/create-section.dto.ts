import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean, IsNotEmpty, Min } from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({ example: 'A', description: 'Nombre de la sección' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 30, description: 'Capacidad de la sección', required: false })
  @IsInt()
  @IsOptional()
  capacity?: number;

  @ApiProperty({
    example: 1,
    description: 'Prioridad de llenado (1 = se llena primero, 2 = segundo, etc.)',
    required: false,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  priority?: number;

  @ApiProperty({ example: true, description: 'Estado activo de la sección', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del salón' })
  @IsString()
  @IsNotEmpty()
  classroomId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del turno' })
  @IsString()
  @IsNotEmpty()
  turnId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del período académico' })
  @IsString()
  @IsNotEmpty()
  periodId: string;
}
