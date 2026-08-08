import {
  Controller,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@intranet/database';

@ApiTags('Upload')
@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadController {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('profile-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(new BadRequestException('Solo se permiten imágenes'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Subir foto de perfil del usuario autenticado' })
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    const userId = req.user.id;
    const userRole = req.user.roles[0]; // Usar el primer rol

    // Subir a Cloudinary
    const result = await this.cloudinaryService.uploadProfilePicture(
      file.buffer,
      userId,
      userRole,
    );

    // Actualizar perfil en base de datos
    await this.prisma.profile.update({
      where: { userId },
      data: {
        avatarUrl: result.secure_url,
        avatarPublicId: result.public_id,
      },
    });

    return {
      message: 'Foto de perfil actualizada exitosamente',
      avatarUrl: result.secure_url,
    };
  }

  @Post('student-picture')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.startsWith('image/')) {
          return callback(new BadRequestException('Solo se permiten imágenes'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir foto de un estudiante (usado durante el registro)' })
  async uploadStudentPicture(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }

    const result = await this.cloudinaryService.uploadProfilePicture(
      file.buffer,
      'temp_' + Date.now(), // ID temporal
      Role.ESTUDIANTE,
    );

    return {
      message: 'Foto subida temporalmente',
      tempAvatarUrl: result.secure_url,
      tempPublicId: result.public_id,
    };
  }
}
