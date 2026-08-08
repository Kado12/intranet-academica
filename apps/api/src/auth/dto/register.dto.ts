import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
  Matches,
} from 'class-validator';
import { Role } from '@intranet/database';

export class RegisterDto {
  @ApiProperty({
    example: 'usuario@ejemplo.com',
    description: 'Correo electrnico del usuario',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 8 caracteres)',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo especial',
  })
  password: string;

  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: '12345678',
    description: 'Número de documento',
    required: false,
  })
  @IsString()
  @IsOptional()
  documentNumber?: string;

  @ApiProperty({
    example: 'DNI',
    description: 'Tipo de documento',
    required: false,
  })
  @IsString()
  @IsOptional()
  documentType?: string;

  @ApiProperty({
    enum: Role,
    example: Role.ESTUDIANTE,
    description: 'Rol del usuario',
  })
  @IsEnum(Role, { message: 'El rol no es válido' })
  role: Role;
}
