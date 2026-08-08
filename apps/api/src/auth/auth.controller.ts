import { Controller, Post, Body, UseGuards, Get, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ThrottlerGuard, Throttle, SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.INFORMATICO)
  @ApiBearerAuth()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Registrar un nuevo usuario (solo ADMIN e INFORMATICO)' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo ya está registrado' })
  @ApiResponse({ status: 429, description: 'Demasiadas peticiones' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @ApiOperation({ summary: 'Iniciar sesión con correo y contraseña' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @ApiResponse({ status: 429, description: 'Demasiados intentos de login. Intente en 15 minutos.' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @SkipThrottle()
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil obtenido exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @SkipThrottle()
  @ApiOperation({ summary: 'Endpoint de prueba solo para administradores' })
  @ApiResponse({ status: 200, description: 'Acceso concedido' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  adminOnly() {
    return {
      status: 'success',
      message: '¡Acceso concedido! Este es un endpoint exclusivo para administradores.',
      data: {
        endpoint: '/auth/admin-only',
        requiredRole: 'ADMIN',
        timestamp: new Date().toISOString(),
      },
    };
  }
}
