import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Res, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { TransferEnrollmentDto } from './dto/transfer-enrollment.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';
import { Response } from 'express';
import { StudentCardService } from './student-card.service';

@ApiTags('Matrículas')
@Controller('academic/enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly studentCardService: StudentCardService,
  ) {}

  @Post()
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Matricular un estudiante en una sección' })
  @ApiResponse({ status: 201, description: 'Estudiante matriculado exitosamente' })
  @ApiResponse({ status: 409, description: 'El estudiante ya está matriculado o tiene otra matrícula activa' })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @ApiQuery({ name: 'periodId', required: false })
  @ApiQuery({ name: 'sectionId', required: false })
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiQuery({ name: 'turnId', required: false })
  @ApiQuery({ name: 'paymentPlanId', required: false })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nombre, apellido o documento' })
  @ApiOperation({ summary: 'Listar matrículas con filtros' })
  findAll(
    @Query('periodId') periodId?: string,
    @Query('sectionId') sectionId?: string,
    @Query('sedeId') sedeId?: string,
    @Query('turnId') turnId?: string,
    @Query('paymentPlanId') paymentPlanId?: string,
    @Query('search') search?: string,
  ) {
    return this.enrollmentsService.findAll({
      periodId,
      sectionId,
      sedeId,
      turnId,
      paymentPlanId,
      search,
    });
  }

  @Get('by-student')
  @ApiQuery({ name: 'studentId', required: true, description: 'ID del estudiante' })
  @ApiOperation({ summary: 'Obtener matrículas de un estudiante' })
  @ApiResponse({ status: 200, description: 'Matrículas del estudiante' })
  findByStudent(@Query('studentId') studentId: string) {
    return this.enrollmentsService.findByStudent(studentId);
  }

  @Get('by-section')
  @ApiQuery({ name: 'sectionId', required: true, description: 'ID de la sección' })
  @ApiOperation({ summary: 'Obtener estudiantes matriculados en una sección' })
  @ApiResponse({ status: 200, description: 'Estudiantes de la sección' })
  findBySection(@Query('sectionId') sectionId: string) {
    return this.enrollmentsService.findBySection(sectionId);
  }

  @Get(':id/card')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA, Role.DOCENTE)
  @ApiOperation({ summary: 'Descargar ficha de matrícula en PDF (A4 con dos fichas A5)' })
  @ApiResponse({ status: 200, description: 'PDF generado' })
  async downloadCard(@Param('id') id: string, @Res() res: Response) {
    const pdf = await this.studentCardService.generateEnrollmentCardPdf(id);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=ficha-matricula-${id}.pdf`,
      'Content-Length': pdf.length.toString(),
    });

    res.send(pdf);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Actualizar el estado de una matrícula' })
  @ApiResponse({ status: 200, description: 'Matrícula actualizada' })
  update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Patch(':id/transfer')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Transferir estudiante a otra sección (cambio de turno/sede/sección)' })
  @ApiResponse({ status: 200, description: 'Transferencia realizada' })
  @ApiResponse({ status: 400, description: 'No hay cupo disponible' })
  transferEnrollment(
    @Param('id') id: string,
    @Body() transferDto: TransferEnrollmentDto,
    @Request() req,
  ) {
    return this.enrollmentsService.transferEnrollment(id, transferDto, req.user.id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Retirar a un estudiante de una sección (soft delete)' })
  @ApiResponse({ status: 200, description: 'Matrícula marcada como retirada' })
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }
}
