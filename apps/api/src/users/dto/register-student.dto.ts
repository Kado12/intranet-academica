import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { PaymentPlanType } from '@intranet/database';

export class RegisterStudentDto {
  // ===== DATOS PERSONALES =====
  @ApiProperty({ example: 'Juan', description: 'Nombre del estudiante' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del estudiante' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'juan.perez@email.com', description: 'Correo electrónico' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @ApiProperty({ example: 'DNI', description: 'Tipo de documento' })
  @IsString()
  @IsNotEmpty()
  documentType: string;

  @ApiProperty({ example: '12345678', description: 'Número de documento (único)' })
  @IsString()
  @IsNotEmpty()
  documentNumber: string;

  @ApiProperty({ example: '2008-05-15', description: 'Fecha de nacimiento', required: false })
  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ example: 'M', description: 'Género (M, F, Otro)', required: false })
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

  // ===== DATOS ACADÉMICOS =====
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID de la sede' })
  @IsString()
  @IsNotEmpty()
  sedeId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del período académico' })
  @IsString()
  @IsNotEmpty()
  periodId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del turno preferido' })
  @IsString()
  @IsNotEmpty()
  turnId: string;

  @ApiProperty({ 
    example: 'clxxxxxxxxxxxxx', 
    description: 'ID de la sección (opcional, si no se especifica se auto-asigna)', 
    required: false 
  })
  @IsString()
  @IsOptional()
  sectionId?: string;

  // ===== PLAN DE PAGO =====
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del plan de pago' })
  @IsString()
  @IsNotEmpty()
  paymentPlanId: string;

  // ===== FOTO =====
  @ApiProperty({ description: 'URL de la foto en Cloudinary', required: false })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ description: 'ID público en Cloudinary (número de documento)', required: false })
  @IsString()
  @IsOptional()
  avatarPublicId?: string;
}
