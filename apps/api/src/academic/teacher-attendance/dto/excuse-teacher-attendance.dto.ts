import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ExcuseTeacherAttendanceDto {
  @ApiProperty({ example: 'Cita médica programada', description: 'Motivo de la justificación' })
  @IsString()
  @IsNotEmpty()
  excuseNote: string;
}
