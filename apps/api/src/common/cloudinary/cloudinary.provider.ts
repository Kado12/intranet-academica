import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('CloudinaryProvider');

    const cloudName = configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');

    // Validar que todas las variables estén presentes
    if (!cloudName || !apiKey || !apiSecret) {
      logger.error('❌ Variables de entorno de Cloudinary no configuradas:');
      logger.error(`   CLOUDINARY_CLOUD_NAME: ${cloudName ? '✅' : '❌'}`);
      logger.error(`   CLOUDINARY_API_KEY: ${apiKey ? '✅' : '❌'}`);
      logger.error(`   CLOUDINARY_API_SECRET: ${apiSecret ? '✅' : '❌'}`);
      throw new Error('Variables de Cloudinary no configuradas en .env');
    }

    // Configurar Cloudinary
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    logger.log('✅ Cloudinary configurado correctamente');
    logger.log(`   Cloud Name: ${cloudName}`);

    return cloudinary;
  },
  inject: [ConfigService],
};
