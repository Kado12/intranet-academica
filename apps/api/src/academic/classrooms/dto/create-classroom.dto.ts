import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({ example: 'Salón 7', description: 'Nombre del salón' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Segundo piso', description: 'Ubicación del salón', required: false })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 30, description: 'Capacidad del salón', required: false })
  @IsInt()
  @IsOptional()
  capacity?: number;

  @ApiProperty({ example: true, description: 'Estado activo del salón', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID de la sede a la que pertenece' })
  @IsString()
  @IsNotEmpty()
  sedeId: string;
}
