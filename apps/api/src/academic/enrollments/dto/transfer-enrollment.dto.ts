import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class TransferEnrollmentDto {
  @ApiProperty({
    example: 'clxxxxxxxxxxxxx',
    description: 'ID de la nueva sección (asignación manual)',
    required: false,
  })
  @IsString()
  @IsOptional()
  sectionId?: string;

  @ApiProperty({
    example: 'clxxxxxxxxxxxxx',
    description: 'ID de la nueva sede (para auto-asignación)',
    required: false,
  })
  @IsString()
  @IsOptional()
  sedeId?: string;

  @ApiProperty({
    example: 'clxxxxxxxxxxxxx',
    description: 'ID del nuevo turno (para auto-asignación)',
    required: false,
  })
  @IsString()
  @IsOptional()
  turnId?: string;

  @ApiProperty({
    example: 'clxxxxxxxxxxxxx',
    description: 'ID del nuevo plan de pago',
    required: false,
  })
  @IsString()
  @IsOptional()
  paymentPlanId?: string;

  @ApiProperty({
    example: 'Cambio solicitado por el padre',
    description: 'Motivo del cambio',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
