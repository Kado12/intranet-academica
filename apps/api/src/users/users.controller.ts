import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';

@ApiTags('Usuarios')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.INFORMATICO)
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Buscar por nombre o correo',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: Role,
    description: 'Filtrar por rol',
  })
  @ApiOperation({ summary: 'Listar usuarios administrativos' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios' })
  findAll(@Query('search') search?: string, @Query('role') role?: Role) {
    return this.usersService.findAdminUsers(search, role);
  }

  @Get('stats')
  @Roles(Role.ADMIN, Role.INFORMATICO)
  @ApiOperation({ summary: 'Obtener estadísticas de usuarios por rol' })
  @ApiResponse({ status: 200, description: 'Estadísticas de usuarios' })
  getStats() {
    return this.usersService.countByRole();
  }

  @Get('students')
  @Roles(
    Role.ADMIN,
    Role.INFORMATICO,
    Role.SECRETARIA,
    Role.COORDINADOR,
    Role.DOCENTE,
  )
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Buscar por nombre o correo',
  })
  @ApiOperation({ summary: 'Listar estudiantes' })
  @ApiResponse({ status: 200, description: 'Lista de estudiantes' })
  findStudents(@Query('search') search?: string) {
    return this.usersService.findStudents(search);
  }

  @Post('students/register')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR)
  @ApiOperation({ summary: 'Registrar estudiante con matrícula y plan de pago (registro unificado)' })
  @ApiResponse({ status: 201, description: 'Estudiante registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'El email o DNI ya existe' })
  @ApiResponse({ status: 400, description: 'No hay cupo disponible' })
  registerStudent(@Body() registerDto: RegisterStudentDto, @Request() req) {
    return this.usersService.registerStudent(registerDto, req.user.id);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.INFORMATICO)
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id/profile')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR)
  @ApiOperation({ summary: 'Actualizar datos personales de un estudiante' })
  @ApiResponse({ status: 200, description: 'Perfil actualizado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 409, description: 'Email o documento duplicado' })
  updateStudentProfile(
    @Param('id') id: string,
    @Body() updateDto: UpdateStudentProfileDto,
    @Request() req,
  ) {
    return this.usersService.updateStudentProfile(id, updateDto, req.user.id);
  }

  @Patch(':id/toggle-active')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Activar o desactivar un usuario' })
  @ApiResponse({ status: 200, description: 'Estado del usuario actualizado' })
  toggleActive(@Param('id') id: string) {
    return this.usersService.toggleActive(id);
  }

  @Patch(':id/reset-password')
  @Roles(Role.ADMIN, Role.INFORMATICO)
  @ApiOperation({ summary: 'Resetear contraseña de un usuario (genera contraseña automática)' })
  @ApiResponse({ status: 200, description: 'Contraseña reseteada' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  resetPassword(@Param('id') id: string, @Request() req) {
    return this.usersService.resetPassword(id, req.user.id);
  }
}
