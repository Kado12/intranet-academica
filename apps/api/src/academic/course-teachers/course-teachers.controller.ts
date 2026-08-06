import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CourseTeachersService } from './course-teachers.service';
import { CreateCourseTeacherDto } from './dto/create-course-teacher.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Docentes por Curso')
@Controller('academic/course-teachers')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class CourseTeachersController {
  constructor(private readonly courseTeachersService: CourseTeachersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR)
  @ApiOperation({ summary: 'Asignar un docente a un curso (asignación global)' })
  @ApiResponse({ status: 201, description: 'Docente asignado al curso' })
  @ApiResponse({ status: 409, description: 'El docente ya está asignado a este curso' })
  create(@Body() createCourseTeacherDto: CreateCourseTeacherDto) {
    return this.courseTeachersService.create(createCourseTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las asignaciones docente-curso' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones' })
  findAll() {
    return this.courseTeachersService.findAll();
  }

  @Get('by-course')
  @ApiQuery({ name: 'courseId', required: true, description: 'ID del curso' })
  @ApiOperation({ summary: 'Obtener docentes asignados a un curso específico' })
  @ApiResponse({ status: 200, description: 'Docentes del curso' })
  findByCourse(@Query('courseId') courseId: string) {
    return this.courseTeachersService.findByCourse(courseId);
  }

  @Get('by-teacher')
  @ApiQuery({ name: 'teacherId', required: true, description: 'ID del docente' })
  @ApiOperation({ summary: 'Obtener cursos asignados a un docente específico' })
  @ApiResponse({ status: 200, description: 'Cursos del docente' })
  findByTeacher(@Query('teacherId') teacherId: string) {
    return this.courseTeachersService.findByTeacher(teacherId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR)
  @ApiOperation({ summary: 'Eliminar una asignación docente-curso (soft delete)' })
  @ApiResponse({ status: 200, description: 'Asignación eliminada' })
  remove(@Param('id') id: string) {
    return this.courseTeachersService.remove(id);
  }
}
