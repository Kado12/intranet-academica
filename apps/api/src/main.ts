import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { loggerConfig } from './common/logger/logger.config';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });

  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  const nodeEnv = configService.get<string>('NODE_ENV', 'development');
  const isProduction = nodeEnv === 'production';

  logger.log(`🌍 Entorno: ${nodeEnv}`);

  app.useGlobalInterceptors(new AuditInterceptor());
  logger.log('📝 Interceptor de auditoría configurado');

  // Helmet - Headers de seguridad HTTP
  app.use(
    helmet({
      contentSecurityPolicy: isProduction
        ? {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"], // Necesario para Swagger UI
              scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Necesario para Swagger UI
              imgSrc: ["'self'", "'data:'", "'https:'"],
              connectSrc: ["'self'"],
              fontSrc: ["'self'"],
              objectSrc: ["'none'"],
              mediaSrc: ["'self'"],
              frameSrc: ["'none'"],
            },
          }
        : false, // Deshabilitar CSP en desarrollo
      crossOriginEmbedderPolicy: false, // Deshabilitar para Swagger
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      dnsPrefetchControl: true,
      frameguard: { action: 'deny' }, // Previene clickjacking
      hidePoweredBy: true, // Oculta X-Powered-By
      hsts: isProduction
        ? {
            maxAge: 31536000, // 1 año
            includeSubDomains: true,
            preload: true,
          }
        : false,
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
      },
      xssFilter: true,
    }),
  );

  logger.log('🛡️  Helmet configurado');

  // Configuración de CORS dinámico según el entorno
  const corsOrigins = isProduction
    ? [
        configService.get<string>(
          'FRONTEND_URL',
          'https://frontend-link.vercel.app',
        ),
      ]
    : [
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
      ];

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Configuracion de Validación Global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Configuración de Swagger
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Intranet Académica API')
      .setDescription('API para el sistema de intranet académica')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Ingresa tu token JWT aquí',
          in: 'header',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    logger.log(
      `📚 Swagger documentation: http://localhost:${configService.get('PORT', 3000)}/api/docs`,
    );
  }

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  logger.log(`🚀 Application running in ${nodeEnv} mode on port ${port}`);
}

bootstrap();
