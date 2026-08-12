import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString, IsOptional, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { TeacherAttendanceStatus } from '@intranet/database';

export class TeacherAttendanceItemDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del docente' })
  @IsString()
  teacherId: string;

  @ApiProperty({ enum: TeacherAttendanceStatus, example: TeacherAttendanceStatus.PRESENT })
  @IsEnum(TeacherAttendanceStatus)
  status: TeacherAttendanceStatus;

  @ApiProperty({ example: 'Llegó tarde por transporte', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateTeacherAttendanceDto {
  @ApiProperty({ example: '2026-01-15', description: 'Fecha de la asistencia' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID de la sede', required: false })
  @IsString()
  @IsOptional()
  sedeId?: string;

  @ApiProperty({ type: [TeacherAttendanceItemDto], description: 'Lista de asistencias' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => TeacherAttendanceItemDto)
  attendances: TeacherAttendanceItemDto[];
}
