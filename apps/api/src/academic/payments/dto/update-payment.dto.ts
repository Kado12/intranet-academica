import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsDateString } from 'class-validator';
import { PaymentStatus } from '@intranet/database';

export class UpdatePaymentDto {
  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.PAID })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ example: 'Efectivo', description: 'Método de pago', required: false })
  @IsString()
  @IsOptional()
  paymentMethod?: string;

  @ApiProperty({ example: 'Voucher #12345', description: 'Referencia', required: false })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiProperty({ example: 'Pago realizado por el padre', description: 'Notas', required: false })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ example: '2026-01-15', description: 'Fecha de pago', required: false })
  @IsDateString()
  @IsOptional()
  paidAt?: string;
}
