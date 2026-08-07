import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtenemos los roles requeridos del decorador
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // this.logger.log(`Roles requeridos: ${JSON.stringify(requiredRoles)}`);

    // Si no hay roles requeridos, permitimos el acceso
    if (!requiredRoles) {
      // this.logger.log('No se requieren roles específicos, acceso concedido');
      return true;
    }

    // Obtenemos el usuario del request
    const { user } = context.switchToHttp().getRequest();

    // this.logger.log(`Usuario en request: ${JSON.stringify(user)}`);
    // this.logger.log(`Roles del usuario: ${JSON.stringify(user?.roles)}`);

    if (!user || !user.roles) {
      this.logger.error('El usuario no tiene roles asignados');
      return false;
    }

    // Verificamos si el usuario tiene alguno de los roles requeridos
    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));

    // this.logger.log(`¿Tiene rol requerido? ${hasRole}`);

    return hasRole;
  }
}
