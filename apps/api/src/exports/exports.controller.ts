import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ExportsService } from './exports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role, PaymentStatus } from '@intranet/database';

@ApiTags('Exportaciones')
@Controller('exports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Get('students-list')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR, Role.INFORMATICO)
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiQuery({ name: 'turnId', required: false })
  @ApiQuery({ name: 'classroomId', required: false })
  @ApiQuery({ name: 'sectionId', required: false })
  @ApiQuery({ name: 'periodId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Exportar lista de alumnos (Excel)' })
  async exportStudentsList(
    @Query('sedeId') sedeId?: string,
    @Query('turnId') turnId?: string,
    @Query('classroomId') classroomId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('periodId') periodId?: string,
    @Query('search') search?: string,
    @Res() res?: Response,
  ) {
    const buffer = await this.exportsService.exportStudentsList({
      sedeId,
      turnId,
      classroomId,
      sectionId,
      periodId,
      search,
    });

    const fileName = `lista-alumnos-${new Date().toISOString().split('T')[0]}.xlsx`;

    res?.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': buffer.length.toString(),
    });

    res?.send(buffer);
  }

  @Get('payment-status')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR)
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiQuery({ name: 'paymentPlanId', required: false })
  @ApiQuery({ name: 'paymentStatus', required: false, enum: PaymentStatus })
  @ApiQuery({ name: 'search', required: false })
  @ApiOperation({ summary: 'Exportar estado de pagos (Excel)' })
  async exportPaymentStatus(
    @Query('sedeId') sedeId?: string,
    @Query('paymentPlanId') paymentPlanId?: string,
    @Query('paymentStatus') paymentStatus?: PaymentStatus,
    @Query('search') search?: string,
    @Res() res?: Response,
  ) {
    const buffer = await this.exportsService.exportPaymentStatus({
      sedeId,
      paymentPlanId,
      paymentStatus,
      search,
    });

    const fileName = `estado-pagos-${new Date().toISOString().split('T')[0]}.xlsx`;

    res?.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': buffer.length.toString(),
    });

    res?.send(buffer);
  }

  @Get('summary')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR, Role.INFORMATICO)
  @ApiOperation({ summary: 'Exportar resumen de alumnos (Excel)' })
  async exportSummary(@Res() res?: Response) {
    const buffer = await this.exportsService.exportSummary();

    const fileName = `resumen-alumnos-${new Date().toISOString().split('T')[0]}.xlsx`;

    res?.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Length': buffer.length.toString(),
    });

    res?.send(buffer);
  }
}
