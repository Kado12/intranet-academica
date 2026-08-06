import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TurnsService } from './turns.service';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Turnos')
@Controller('academic/turns')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TurnsController {
  constructor(private readonly turnsService: TurnsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Crear un nuevo turno' })
  @ApiResponse({ status: 201, description: 'Turno creado exitosamente' })
  create(@Body() createTurnDto: CreateTurnDto) {
    return this.turnsService.create(createTurnDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los turnos activos' })
  @ApiResponse({ status: 200, description: 'Lista de turnos' })
  findAll() {
    return this.turnsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un turno por ID' })
  @ApiResponse({ status: 200, description: 'Turno encontrado' })
  @ApiResponse({ status: 404, description: 'Turno no encontrado' })
  findOne(@Param('id') id: string) {
    return this.turnsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar un turno' })
  @ApiResponse({ status: 200, description: 'Turno actualizado' })
  update(@Param('id') id: string, @Body() updateTurnDto: UpdateTurnDto) {
    return this.turnsService.update(id, updateTurnDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar un turno (soft delete)' })
  @ApiResponse({ status: 200, description: 'Turno eliminado (marcado como inactivo)' })
  remove(@Param('id') id: string) {
    return this.turnsService.remove(id);
  }
}
