import {
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { ImportsService } from './imports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@intranet/database';

@ApiTags('Importaciones')
@Controller('imports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class ImportsController {
  constructor(private readonly importsService: ImportsService) {}

  // ===== PLANTILLAS =====

  @Get('templates/students')
  @Roles(Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR)
  @ApiOperation({ summary: 'Descargar plantilla Excel para alumnos' })
  async downloadStudentsTemplate(@Res() res: Response) {
    const buffer = await this.importsService.generateStudentsTemplate();

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="plantilla-alumnos.xlsx"',
      'Content-Length': buffer.length.toString(),
    });

    res.send(buffer);
  }

  @Get('templates/classrooms')
  @Roles(Role.ADMIN, Role.SECRETARIA)
  @ApiOperation({ summary: 'Descargar plantilla Excel para salones' })
  async downloadClassroomsTemplate(@Res() res: Response) {
    const buffer = await this.importsService.generateClassroomsTemplate();

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="plantilla-salones.xlsx"',
      'Content-Length': buffer.length.toString(),
    });

    res.send(buffer);
  }

  @Get('templates/sections')
  @Roles(Role.ADMIN, Role.SECRETARIA)
  @ApiOperation({ summary: 'Descargar plantilla Excel para secciones' })
  async downloadSectionsTemplate(@Res() res: Response) {
    const buffer = await this.importsService.generateSectionsTemplate();

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="plantilla-secciones.xlsx"',
      'Content-Length': buffer.length.toString(),
    });

    res.send(buffer);
  }

  // ===== IMPORTACIONES =====

  @Post('students')
  @Roles(Role.ADMIN, Role.SECRETARIA)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
      fileFilter: (req, file, callback) => {
        if (
          !file.mimetype.includes('spreadsheet') &&
          !file.mimetype.includes('excel')
        ) {
          return callback(new Error('Solo se permiten archivos Excel'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Importar alumnos desde Excel' })
  async importStudents(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new Error('No se proporcionó archivo');
    }
    return this.importsService.importStudents(file.buffer, req.user.id);
  }

  @Post('classrooms')
  @Roles(Role.ADMIN, Role.SECRETARIA)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Importar salones desde Excel' })
  async importClassrooms(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) throw new Error('No se proporcionó archivo');
    return this.importsService.importClassrooms(file.buffer, req.user.id);
  }

  @Post('sections')
  @Roles(Role.ADMIN, Role.SECRETARIA)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Importar secciones desde Excel' })
  async importSections(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) throw new Error('No se proporcionó archivo');
    return this.importsService.importSections(file.buffer, req.user.id);
  }
}
