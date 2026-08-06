import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Secciones')
@Controller('academic/sections')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Crear una nueva sección' })
  @ApiResponse({ status: 201, description: 'Sección creada exitosamente' })
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsService.create(createSectionDto);
  }

  @Get()
  @ApiQuery({ name: 'periodId', required: false, description: 'Filtrar por ID de período' })
  @ApiQuery({ name: 'classroomId', required: false, description: 'Filtrar por ID de salón' })
  @ApiOperation({ summary: 'Listar todas las secciones activas' })
  @ApiResponse({ status: 200, description: 'Lista de secciones' })
  findAll(
    @Query('periodId') periodId?: string,
    @Query('classroomId') classroomId?: string,
  ) {
    return this.sectionsService.findAll(periodId, classroomId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sección por ID con sus relaciones' })
  @ApiResponse({ status: 200, description: 'Sección encontrada' })
  @ApiResponse({ status: 404, description: 'Sección no encontrada' })
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar una sección' })
  @ApiResponse({ status: 200, description: 'Sección actualizada' })
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionsService.update(id, updateSectionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar una sección (soft delete)' })
  @ApiResponse({ status: 200, description: 'Sección eliminada (marcada como inactiva)' })
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(id);
  }
}
