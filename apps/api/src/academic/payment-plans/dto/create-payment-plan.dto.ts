import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, IsOptional, IsInt, Min, Max, IsBoolean } from 'class-validator';
import { PaymentPlanType } from '@intranet/database';

export class CreatePaymentPlanDto {
  @ApiProperty({ example: 'Plan Hermanos', description: 'Nombre del plan' })
  @IsString()
  name: string;

  @ApiProperty({ enum: PaymentPlanType, example: PaymentPlanType.SIBLING_DISCOUNT })
  @IsEnum(PaymentPlanType)
  type: PaymentPlanType;

  @ApiProperty({ example: 'Descuento del 20% para hermanos', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1500, description: 'Monto base de la matrícula' })
  @IsNumber()
  @Min(0)
  baseAmount: number;

  @ApiProperty({ example: 20, description: 'Porcentaje de descuento (0-100)' })
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({ example: 3, description: 'Número de cuotas (opcional)', required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  installments?: number;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID de la sede (opcional, global si no se especifica)', required: false })
  @IsString()
  @IsOptional()
  sedeId?: string;

  @ApiProperty({ example: true, description: 'Estado activo', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
