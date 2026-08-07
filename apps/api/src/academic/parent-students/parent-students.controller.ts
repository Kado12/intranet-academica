import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ParentStudentsService } from './parent-students.service';
import { CreateParentStudentDto } from './dto/create-parent-student.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Padres y Estudiantes')
@Controller('academic/parent-students')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ParentStudentsController {
  constructor(private readonly parentStudentsService: ParentStudentsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Vincular un padre de familia con un estudiante' })
  @ApiResponse({ status: 201, description: 'Vinculación creada exitosamente' })
  @ApiResponse({ status: 409, description: 'El padre ya está vinculado a este estudiante' })
  create(@Body() createParentStudentDto: CreateParentStudentDto) {
    return this.parentStudentsService.create(createParentStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las vinculaciones padre-estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de vinculaciones' })
  findAll() {
    return this.parentStudentsService.findAll();
  }

  @Get('by-parent')
  @ApiQuery({ name: 'parentId', required: true, description: 'ID del padre' })
  @ApiOperation({ summary: 'Obtener estudiantes vinculados a un padre' })
  @ApiResponse({ status: 200, description: 'Estudiantes del padre' })
  findByParent(@Query('parentId') parentId: string) {
    return this.parentStudentsService.findByParent(parentId);
  }

  @Get('by-student')
  @ApiQuery({ name: 'studentId', required: true, description: 'ID del estudiante' })
  @ApiOperation({ summary: 'Obtener padres vinculados a un estudiante' })
  @ApiResponse({ status: 200, description: 'Padres del estudiante' })
  findByStudent(@Query('studentId') studentId: string) {
    return this.parentStudentsService.findByStudent(studentId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Eliminar una vinculación padre-estudiante' })
  @ApiResponse({ status: 200, description: 'Vinculación eliminada' })
  remove(@Param('id') id: string) {
    return this.parentStudentsService.remove(id);
  }
}
