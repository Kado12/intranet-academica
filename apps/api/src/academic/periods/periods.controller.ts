import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Períodos Académicos')
@Controller('academic/periods')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR)
  @ApiOperation({ summary: 'Crear un nuevo período académico' })
  @ApiResponse({ status: 201, description: 'Período creado exitosamente' })
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los períodos académicos' })
  @ApiResponse({ status: 200, description: 'Lista de períodos' })
  findAll() {
    return this.periodsService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Obtener el período activo actual' })
  @ApiResponse({ status: 200, description: 'Período activo' })
  findActive() {
    return this.periodsService.findActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un período por ID' })
  @ApiResponse({ status: 200, description: 'Período encontrado' })
  @ApiResponse({ status: 404, description: 'Período no encontrado' })
  findOne(@Param('id') id: string) {
    return this.periodsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR)
  @ApiOperation({ summary: 'Actualizar un período académico' })
  @ApiResponse({ status: 200, description: 'Período actualizado' })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodsService.update(id, updatePeriodDto);
  }

  @Patch(':id/activate')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Activar un período académico' })
  @ApiResponse({ status: 200, description: 'Período activado' })
  activate(@Param('id') id: string) {
    return this.periodsService.activate(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar un período académico (solo DRAFT)' })
  @ApiResponse({ status: 200, description: 'Período eliminado' })
  remove(@Param('id') id: string) {
    return this.periodsService.remove(id);
  }
}