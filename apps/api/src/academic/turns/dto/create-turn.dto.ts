import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateTurnDto {
  @ApiProperty({ example: 'Mañana', description: 'Nombre del turno' })
  @IsString()
  name: string;

  @ApiProperty({ example: '08:00', description: 'Hora de inicio', required: false })
  @IsString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({ example: '13:00', description: 'Hora de fin', required: false })
  @IsString()
  @IsOptional()
  endTime?: string;

  @ApiProperty({ example: true, description: 'Estado activo del turno', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}