import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Audit');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, user } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const duration = Date.now() - startTime;

          const auditLog = {
            timestamp: new Date().toISOString(),
            method,
            url,
            statusCode: response.statusCode,
            duration: `${duration}ms`,
            ip,
            userAgent,
            userId: user?.id || 'anonymous',
            userEmail: user?.email || 'anonymous',
            userRoles: user?.roles || [],
            action: this.getActionFromUrl(url, method),
          };

          this.logger.log(JSON.stringify(auditLog));
        },
        error: (error) => {
          const duration = Date.now() - startTime;

          const auditLog = {
            timestamp: new Date().toISOString(),
            method,
            url,
            error: error.message,
            statusCode: error.status || 500,
            duration: `${duration}ms`,
            ip,
            userAgent,
            userId: user?.id || 'anonymous',
            userEmail: user?.email || 'anonymous',
            action: this.getActionFromUrl(url, method),
          };

          this.logger.error(JSON.stringify(auditLog));
        },
      }),
    );
  }

  private getActionFromUrl(url: string, method: string): string {
    // Extraer acción del URL para mejor legibilidad
    const parts = url.split('/').filter(Boolean);

    if (parts.length < 2) return `${method} ${url}`;

    const module = parts[1]; // ej: 'auth', 'users', 'academic'
    const resource = parts[2] || '';

    const actionMap: Record<string, string> = {
      'POST': 'CREATE',
      'GET': 'READ',
      'PATCH': 'UPDATE',
      'PUT': 'UPDATE',
      'DELETE': 'DELETE',
    };

    const action = actionMap[method] || method;
    return `${action}_${module}_${resource}`.toUpperCase();
  }
}
