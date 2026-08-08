import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const loggerConfig = {
  transports: [
    // Consola con colores para desarrollo
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('IntranetAcademica', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),

    // Archivo rotativo para errores
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d', // Mantener logs por 14 días
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    // Archivo rotativo para todos los logs
    new winston.transports.DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    // Archivo específico para auditoría
    new winston.transports.DailyRotateFile({
      filename: 'logs/audit-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '20m',
      maxFiles: '90d', // Mantener logs de auditoría por 90 días
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};
