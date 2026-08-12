import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { StatisticsService } from './statistics.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Estadísticas')
@Controller('statistics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('overview')
  @Roles(Role.ADMIN, Role.INFORMATICO, Role.COORDINADOR, Role.SECRETARIA)
  @ApiOperation({
    summary: 'obtener resumen general del sistema para el dashboard',
  })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas obtenidas',
  })
  getOverview() {
    return this.statisticsService.getOverview();
  }
}
