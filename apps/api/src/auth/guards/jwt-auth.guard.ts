import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Aquí puedes agregar lógica adicional si es necesario
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Si hay un error o no hay usuario, lanzamos excepción
    if (err || !user) {
      console.error('Error en JwtAuthGuard:', err);
      console.error('Info:', info);
      throw err || new UnauthorizedException('Token de autenticación inválido o expirado');
    }
    return user;
  }
}
