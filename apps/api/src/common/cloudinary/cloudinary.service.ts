import { Injectable, BadRequestException, Inject, Logger } from '@nestjs/common';
import { v2 as cloudinarySdk } from 'cloudinary';
import { Role } from '@intranet/database';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(@Inject('CLOUDINARY') private readonly cloudinary: typeof cloudinarySdk) {
    this.logger.log('CloudinaryService inicializado');
  }

  async uploadProfilePicture(
    fileBuffer: Buffer,
    userId: string,
    role: Role,
  ): Promise<CloudinaryResponse> {
    this.logger.log(`Intentando subir imagen para usuario: ${userId}, rol: ${role}`);

    if (!this.cloudinary || !this.cloudinary.uploader) {
      this.logger.error('❌ Cloudinary no está configurado correctamente');
      throw new BadRequestException('Cloudinary no está configurado');
    }

    // Validar tipo de archivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    // Transformación según rol
    const transformation =
      role === Role.ESTUDIANTE
        ? {
            width: 800,
            height: 450,
            crop: 'fill' as const,
            gravity: 'face' as const,
            quality: 'auto' as const,
            fetch_format: 'auto' as const,
          }
        : {
            width: 400,
            height: 400,
            crop: 'fill' as const,
            gravity: 'face' as const,
            quality: 'auto' as const,
            fetch_format: 'auto' as const,
          };
    try {
      // Convertir buffer a base64 para subir
      const base64String = fileBuffer.toString('base64');
      const dataURI = `data:image/jpeg;base64,${base64String}`;

      this.logger.log('Subiendo imagen a Cloudinary...');

      const result = await this.cloudinary.uploader.upload(dataURI, {
        folder: `intranet/profiles/${role.toLowerCase()}`,
        public_id: userId,
        transformation,
        overwrite: true, // Sobrescribir si ya existe
      });

      this.logger.log(`✅ Imagen subida exitosamente: ${result.secure_url}`);

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      this.logger.error(`❌ Error al subir imagen a Cloudinary: ${error.message}`);
      this.logger.error(`Stack: ${error.stack}`);
      throw new BadRequestException(`Error al subir imagen: ${error.message}`);
    }
  }

  /**
   * Eliminar foto de perfil
   */
  async deleteProfilePicture(publicId: string): Promise<void> {
    try {
      await this.cloudinary.uploader.destroy(publicId);
      this.logger.log(`Imagen eliminada: ${publicId}`);
    } catch (error) {
      this.logger.warn(`No se pudo eliminar imagen ${publicId}: ${error.message}`);
    }
  }

  async uploadStudentPicture(
    fileBuffer: Buffer,
    documentNumber: string,
  ): Promise<CloudinaryResponse> {
    this.logger.log(`Subiendo foto de estudiante con DNI: ${documentNumber}`);

    if (!this.cloudinary || !this.cloudinary.uploader) {
      throw new BadRequestException('Cloudinary no está configurado');
    }

    try {
      const base64String = fileBuffer.toString('base64');
      const dataURI = `data:image/jpeg;base64,${base64String}`;

      const result = await this.cloudinary.uploader.upload(dataURI, {
        folder: 'intranet/students',
        public_id: documentNumber, // ← El DNI como nombre del archivo
        transformation: {
          width: 800,
          height: 450,
          crop: 'fill',
          gravity: 'face',
          quality: 'auto',
          fetch_format: 'auto',
        },
        overwrite: true, // Si ya existe una foto con ese DNI, la reemplaza
      });

      this.logger.log(`✅ Foto guardada como: intranet/students/${documentNumber}`);

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      this.logger.error(`❌ Error al subir foto de estudiante: ${error.message}`);
      throw new BadRequestException(`Error al subir imagen: ${error.message}`);
    }
  }

  /**
   * Obtener URL de la imagen con transformaciones adicionales
   */
  getImageUrl(publicId: string, width?: number, height?: number): string {
    return this.cloudinary.url(publicId, {
      width,
      height,
      crop: 'fill',
      gravity: 'face',
      quality: 'auto',
      fetch_format: 'auto',
    });
  }
}
