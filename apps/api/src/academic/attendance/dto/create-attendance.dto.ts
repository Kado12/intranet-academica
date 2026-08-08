import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsOptional, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { AttendanceStatus } from '@intranet/database';

export class AttendanceItemDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del estudiante' })
  @IsString()
  studentId: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiProperty({ example: 'Llegó tarde por transporte', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateAttendanceDto {
  @ApiProperty({ example: '2026-01-15', description: 'Fecha de la asistencia' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del curso-sección' })
  @IsString()
  sectionCourseId: string;

  @ApiProperty({ type: [AttendanceItemDto], description: 'Lista de asistencias' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AttendanceItemDto)
  attendances: AttendanceItemDto[];
}
