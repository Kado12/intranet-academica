import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ClassroomsService } from './classrooms.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Salones')
@Controller('academic/classrooms')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ClassroomsController {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Crear un nuevo salón' })
  @ApiResponse({ status: 201, description: 'Salón creado exitosamente' })
  create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomsService.create(createClassroomDto);
  }

  @Get()
  @ApiQuery({ name: 'sedeId', required: false, description: 'Filtrar por ID de sede' })
  @ApiOperation({ summary: 'Listar todos los salones activos' })
  @ApiResponse({ status: 200, description: 'Lista de salones' })
  findAll(@Query('sedeId') sedeId?: string) {
    return this.classroomsService.findAll(sedeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un salón por ID' })
  @ApiResponse({ status: 200, description: 'Salón encontrado' })
  @ApiResponse({ status: 404, description: 'Salón no encontrado' })
  findOne(@Param('id') id: string) {
    return this.classroomsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar un salón' })
  @ApiResponse({ status: 200, description: 'Salón actualizado' })
  update(@Param('id') id: string, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomsService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar un salón (soft delete)' })
  @ApiResponse({ status: 200, description: 'Salón eliminado (marcado como inactivo)' })
  remove(@Param('id') id: string) {
    return this.classroomsService.remove(id);
  }
}
