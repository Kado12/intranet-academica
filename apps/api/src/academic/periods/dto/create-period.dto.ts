import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { PeriodStatus } from '@intranet/database';

export class CreatePeriodDto {
  @ApiProperty({ example: '2026-I', description: 'Nombre del período académico' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2026-03-01', description: 'Fecha de inicio' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-07-31', description: 'Fecha de fin' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: PeriodStatus, example: PeriodStatus.DRAFT, description: 'Estado del período', required: false })
  @IsEnum(PeriodStatus)
  @IsOptional()
  status?: PeriodStatus;
}
