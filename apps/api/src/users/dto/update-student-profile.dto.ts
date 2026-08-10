import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateStudentProfileDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del estudiante', required: false })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del estudiante', required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'DNI', description: 'Tipo de documento', required: false })
  @IsString()
  @IsOptional()
  documentType?: string;

  @ApiProperty({ example: '12345678', description: 'Número de documento', required: false })
  @IsString()
  @IsOptional()
  documentNumber?: string;

  @ApiProperty({ example: '2008-05-15', description: 'Fecha de nacimiento', required: false })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ example: 'M', description: 'Género', required: false })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiProperty({ example: '+51 999 999 999', description: 'Teléfono', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Av. Principal 123', description: 'Dirección', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ example: 'juan.perez@email.com', description: 'Correo electrónico', required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'URL de la foto en Cloudinary', required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ description: 'ID público en Cloudinary', required: false })
  @IsString()
  @IsOptional()
  avatarPublicId?: string;
}
