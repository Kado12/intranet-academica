import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ParentRelationType } from '@prisma/client';

export class CreateParentStudentDto {
  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del padre (usuario con rol PADRE_DE_FAMILIA)' })
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({ example: 'clxxxxxxxxxxxxx', description: 'ID del estudiante (usuario con rol ESTUDIANTE)' })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({ enum: ParentRelationType, example: ParentRelationType.PADRE, description: 'Tipo de relación' })
  @IsEnum(ParentRelationType)
  relationType: ParentRelationType;

  @ApiProperty({ example: true, description: 'Indica si es el apoderado principal', required: false })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
