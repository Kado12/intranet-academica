import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { v2 as cloudinarySdk } from 'cloudinary';
import { Role } from '@intranet/database';

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
}

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinary: typeof cloudinarySdk) {}

  /**
   * Subir foto de perfil
   * Para estudiantes: 16:9 horizontal (800x450)
   * Para otros usuarios: cuadrado (400x400)
   */
  async uploadProfilePicture(
    fileBuffer: Buffer,
    userId: string,
    role: Role,
  ): Promise<CloudinaryResponse> {
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
      const base64String = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

      const result = await this.cloudinary.uploader.upload(base64String, {
        folder: `intranet/profiles/${role.toLowerCase()}`,
        public_id: userId,
        transformation,
        overwrite: true, // Sobrescribir si ya existe
      });

      return {
        secure_url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error) {
      throw new BadRequestException(`Error al subir imagen a Cloudinary: ${error.message}`);
    }
  }

  /**
   * Eliminar foto de perfil
   */
  async deleteProfilePicture(publicId: string): Promise<void> {
    try {
      await this.cloudinary.uploader.destroy(publicId);
    } catch (error) {
      // No lanzar error si la imagen no existe
      console.warn(`No se pudo eliminar imagen ${publicId}: ${error.message}`);
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
