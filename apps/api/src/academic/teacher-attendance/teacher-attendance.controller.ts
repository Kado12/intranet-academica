import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TeacherAttendanceService } from './teacher-attendance.service';
import { CreateTeacherAttendanceDto } from './dto/create-teacher-attendance.dto';
import { ExcuseTeacherAttendanceDto } from './dto/excuse-teacher-attendance.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Asistencia de Docentes')
@Controller('academic/teacher-attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TeacherAttendanceController {
  constructor(private readonly teacherAttendanceService: TeacherAttendanceService) {}

  @Post('bulk')
  @Roles(Role.COORDINADOR, Role.INFORMATICO, Role.ADMIN)
  @ApiOperation({ summary: 'Registrar asistencia masiva de docentes' })
  @ApiResponse({ status: 201, description: 'Asistencia registrada' })
  createBulkAttendance(
    @Body() createDto: CreateTeacherAttendanceDto,
    @Request() req,
  ) {
    return this.teacherAttendanceService.createBulkAttendance(createDto, req.user.id);
  }

  @Patch(':id/excuse')
  @Roles(Role.COORDINADOR, Role.INFORMATICO, Role.ADMIN)
  @ApiOperation({ summary: 'Justificar ausencia de docente' })
  @ApiResponse({ status: 200, description: 'Asistencia justificada' })
  excuseAttendance(
    @Param('id') id: string,
    @Body() excuseDto: ExcuseTeacherAttendanceDto,
    @Request() req,
  ) {
    return this.teacherAttendanceService.excuseAttendance(id, excuseDto, req.user.id);
  }

  @Get('date/:date')
  @Roles(Role.COORDINADOR, Role.INFORMATICO, Role.ADMIN, Role.SECRETARIA)
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiOperation({ summary: 'Obtener asistencia de docentes por fecha' })
  findByDate(
    @Param('date') date: string,
    @Query('sedeId') sedeId?: string,
  ) {
    return this.teacherAttendanceService.findByDate(date, sedeId);
  }

  @Get('teacher/:teacherId')
  @Roles(Role.COORDINADOR, Role.INFORMATICO, Role.ADMIN, Role.DOCENTE)
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiOperation({ summary: 'Obtener asistencia de un docente' })
  findByTeacher(
    @Param('teacherId') teacherId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.teacherAttendanceService.findByTeacher(teacherId, startDate, endDate);
  }

  @Get('teacher/:teacherId/stats')
  @Roles(Role.COORDINADOR, Role.INFORMATICO, Role.ADMIN, Role.DOCENTE)
  @ApiOperation({ summary: 'Obtener estadísticas de un docente' })
  getTeacherStats(@Param('teacherId') teacherId: string) {
    return this.teacherAttendanceService.getTeacherStats(teacherId);
  }

  @Get('report')
  @Roles(Role.COORDINADOR, Role.INFORMATICO, Role.ADMIN)
  @ApiQuery({ name: 'sedeId', required: false })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiOperation({ summary: 'Obtener reporte de asistencia de docentes' })
  getReport(
    @Query('sedeId') sedeId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.teacherAttendanceService.getReport(sedeId, startDate, endDate);
  }
}
