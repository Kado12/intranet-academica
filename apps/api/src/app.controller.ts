import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Verificar que la API esté funcionando' })
  @ApiResponse({
    status: 200,
    description: 'La API está funcionando correctamente.',
  })
  getHello(): string {
    return 'Intranet Académica API is running!';
  }

  @Get('health')
  @ApiOperation({ summary: 'Verificar la conexión a la Base de Datos' })
  @ApiResponse({
    status: 200,
    description: 'La conexión a la Base de Datos es exitosa.',
  })
  @ApiResponse({
    status: 500,
    description: 'Error al conectar a la Base de Datos.',
  })
  async healthCheck() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'error',
        database: 'disconnected',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
