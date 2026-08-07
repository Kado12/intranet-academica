import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { Role } from '@intranet/database';

export class QueryUsersDto {
  @ApiProperty({ required: false, description: 'Filtrar por rol' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ required: false, description: 'Buscar por nombre o correo' })
  @IsOptional()
  @IsString()
  search?: string;
}
