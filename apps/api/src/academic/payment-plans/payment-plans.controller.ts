import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PaymentPlansService } from './payment-plans.service';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Planes de Pago')
@Controller('academic/payment-plans')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentPlansController {
  constructor(private readonly paymentPlansService: PaymentPlansService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR)
  @ApiOperation({ summary: 'Crear un nuevo plan de pago' })
  @ApiResponse({ status: 201, description: 'Plan creado' })
  create(@Body() createDto: CreatePaymentPlanDto) {
    return this.paymentPlansService.create(createDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR, Role.DOCENTE)
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiOperation({ summary: 'Listar planes de pago' })
  findAll(@Query('sedeId') sedeId?: string) {
    return this.paymentPlansService.findAll(sedeId);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR)
  @ApiOperation({ summary: 'Obtener un plan de pago por ID' })
  findOne(@Param('id') id: string) {
    return this.paymentPlansService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar un plan de pago' })
  update(@Param('id') id: string, @Body() updateDto: Partial<CreatePaymentPlanDto>) {
    return this.paymentPlansService.update(id, updateDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar un plan de pago (soft delete)' })
  remove(@Param('id') id: string) {
    return this.paymentPlansService.remove(id);
  }
}
