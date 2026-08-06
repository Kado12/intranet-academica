import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSedeDto {
  @ApiProperty({ example: 'Sede Central', description: 'Nombre de la sede' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Av. Principal 123', description: 'Dirección de la sede', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '+51 999 999 999', description: 'Teléfono de la sede', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: true, description: 'Estado activo de la sede', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
