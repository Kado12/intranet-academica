import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SedesService } from './sedes.service';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Sedes')
@Controller('academic/sedes')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SedesController {
  constructor(private readonly sedesService: SedesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Crear una nueva sede' })
  @ApiResponse({ status: 201, description: 'Sede creada exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe una sede con ese nombre' })
  create(@Body() createSedeDto: CreateSedeDto) {
    return this.sedesService.create(createSedeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las sedes activas' })
  @ApiResponse({ status: 200, description: 'Lista de sedes' })
  findAll() {
    return this.sedesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sede por ID' })
  @ApiResponse({ status: 200, description: 'Sede encontrada' })
  @ApiResponse({ status: 404, description: 'Sede no encontrada' })
  findOne(@Param('id') id: string) {
    return this.sedesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar una sede' })
  @ApiResponse({ status: 200, description: 'Sede actualizada' })
  @ApiResponse({ status: 404, description: 'Sede no encontrada' })
  update(@Param('id') id: string, @Body() updateSedeDto: UpdateSedeDto) {
    return this.sedesService.update(id, updateSedeDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar una sede (soft delete)' })
  @ApiResponse({ status: 200, description: 'Sede eliminada (marcada como inactiva)' })
  @ApiResponse({ status: 404, description: 'Sede no encontrada' })
  remove(@Param('id') id: string) {
    return this.sedesService.remove(id);
  }
}
