import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ExcuseAttendanceDto } from './dto/excuse-attendance.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Asistencia')
@Controller('academic/attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('bulk')
  @Roles(Role.DOCENTE, Role.ADMIN, Role.COORDINADOR)
  @ApiOperation({ summary: 'Registrar asistencia masiva para una sección-curso' })
  @ApiResponse({ status: 201, description: 'Asistencia registrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  createBulkAttendance(@Body() createDto: CreateAttendanceDto, @Request() req) {
    return this.attendanceService.createBulkAttendance(createDto, req.user.id);
  }

  @Patch(':id/excuse')
  @Roles(Role.DOCENTE, Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Justificar una ausencia' })
  @ApiResponse({ status: 200, description: 'Asistencia justificada' })
  excuseAttendance(
    @Param('id') id: string,
    @Body() excuseDto: ExcuseAttendanceDto,
    @Request() req,
  ) {
    return this.attendanceService.excuseAttendance(id, excuseDto, req.user.id);
  }

  @Get('section-course/:sectionCourseId/date/:date')
  @Roles(Role.DOCENTE, Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({ summary: 'Obtener asistencia de una sección-curso en una fecha' })
  @ApiResponse({ status: 200, description: 'Asistencia obtenida' })
  findBySectionCourseAndDate(
    @Param('sectionCourseId') sectionCourseId: string,
    @Param('date') date: string,
  ) {
    return this.attendanceService.findBySectionCourseAndDate(sectionCourseId, date);
  }

  @Get('student/:studentId/course/:sectionCourseId')
  @Roles(Role.DOCENTE, Role.ADMIN, Role.COORDINADOR, Role.ESTUDIANTE, Role.PADRE_DE_FAMILIA)
  @ApiOperation({ summary: 'Obtener asistencia de un estudiante en un curso' })
  findByStudentAndCourse(
    @Param('studentId') studentId: string,
    @Param('sectionCourseId') sectionCourseId: string,
  ) {
    return this.attendanceService.findByStudentAndCourse(studentId, sectionCourseId);
  }

  @Get('student/:studentId/stats')
  @Roles(Role.DOCENTE, Role.ADMIN, Role.COORDINADOR, Role.ESTUDIANTE, Role.PADRE_DE_FAMILIA)
  @ApiQuery({ name: 'sectionCourseId', required: false })
  @ApiOperation({ summary: 'Obtener estadísticas de asistencia de un estudiante' })
  getStudentStats(
    @Param('studentId') studentId: string,
    @Query('sectionCourseId') sectionCourseId?: string,
  ) {
    return this.attendanceService.getStudentStats(studentId, sectionCourseId);
  }

  @Get('report/:sectionCourseId')
  @Roles(Role.DOCENTE, Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA)
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiOperation({ summary: 'Obtener reporte de asistencia de una sección' })
  getSectionReport(
    @Param('sectionCourseId') sectionCourseId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.attendanceService.getSectionReport(sectionCourseId, startDate, endDate);
  }
}
