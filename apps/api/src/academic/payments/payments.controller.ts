import { Controller, Get, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role, PaymentStatus } from '@intranet/database';

@ApiTags('Pagos')
@Controller('academic/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR, Role.INFORMATICO)
  @ApiQuery({ name: 'status', required: false, enum: PaymentStatus })
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOperation({ summary: 'Listar registros de pago con filtros' })
  findAll(
    @Query('status') status?: PaymentStatus,
    @Query('sedeId') sedeId?: string,
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.paymentsService.findAll({
      status,
      sedeId,
      search,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get('summary')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR, Role.INFORMATICO)
  @ApiOperation({ summary: 'Obtener resumen de pagos' })
  getSummary() {
    return this.paymentsService.getSummary();
  }

  @Get('enrollment/:enrollmentId')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR, Role.DOCENTE, Role.INFORMATICO)
  @ApiOperation({ summary: 'Obtener pagos de una matrícula' })
  findByEnrollment(@Param('enrollmentId') enrollmentId: string) {
    return this.paymentsService.findByEnrollment(enrollmentId);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.INFORMATICO)
  @ApiOperation({ summary: 'Actualizar estado de un pago' })
  updatePayment(
    @Param('id') id: string,
    @Body() updateDto: UpdatePaymentDto,
    @Request() req,
  ) {
    return this.paymentsService.updatePayment(id, updateDto, req.user.id);
  }
}
