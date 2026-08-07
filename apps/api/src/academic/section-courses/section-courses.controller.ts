import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SectionCoursesService } from './section-courses.service';
import { CreateSectionCourseDto } from './dto/create-section-course.dto';
import { UpdateSectionCourseDto } from './dto/update-section-course.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Cursos por Sección')
@Controller('academic/section-courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SectionCoursesController {
  constructor(private readonly sectionCoursesService: SectionCoursesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Asignar un curso a una sección con un docente' })
  @ApiResponse({ status: 201, description: 'Curso asignado a la sección' })
  @ApiResponse({ status: 409, description: 'El curso ya está asignado a esta sección' })
  create(@Body() createSectionCourseDto: CreateSectionCourseDto) {
    return this.sectionCoursesService.create(createSectionCourseDto);
  }

  @Get()
  @ApiQuery({ name: 'periodId', required: false, description: 'Filtrar por ID de período' })
  @ApiOperation({ summary: 'Listar todas las asignaciones curso-sección' })
  @ApiResponse({ status: 200, description: 'Lista de asignaciones' })
  findAll(@Query('periodId') periodId?: string) {
    return this.sectionCoursesService.findAll(periodId);
  }

  @Get('by-section')
  @ApiQuery({ name: 'sectionId', required: true, description: 'ID de la sección' })
  @ApiOperation({ summary: 'Obtener cursos de una sección específica' })
  @ApiResponse({ status: 200, description: 'Cursos de la sección' })
  findBySection(@Query('sectionId') sectionId: string) {
    return this.sectionCoursesService.findBySection(sectionId);
  }

  @Get('by-teacher')
  @ApiQuery({ name: 'teacherId', required: true, description: 'ID del docente' })
  @ApiOperation({ summary: 'Obtener asignaciones de un docente específico' })
  @ApiResponse({ status: 200, description: 'Asignaciones del docente' })
  findByTeacher(@Query('teacherId') teacherId: string) {
    return this.sectionCoursesService.findByTeacher(teacherId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar el docente de una asignación curso-sección' })
  @ApiResponse({ status: 200, description: 'Asignación actualizada' })
  update(@Param('id') id: string, @Body() updateSectionCourseDto: UpdateSectionCourseDto) {
    return this.sectionCoursesService.update(id, updateSectionCourseDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR)
  @ApiOperation({ summary: 'Eliminar una asignación curso-sección (soft delete)' })
  @ApiResponse({ status: 200, description: 'Asignación eliminada' })
  remove(@Param('id') id: string) {
    return this.sectionCoursesService.remove(id);
  }
}
