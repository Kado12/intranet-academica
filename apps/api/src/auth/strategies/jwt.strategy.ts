import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });

    // Log para verificar que el secreto se está cargando
    const secret = configService.get<string>('JWT_SECRET');
    this.logger.log(`JWT Secret cargado: ${secret ? 'SÍ' : 'NO'}`);
    this.logger.log(`JWT Expiration: ${configService.get<string>('JWT_EXPIRATION', '7d')}`);
  }

  async validate(payload: any) {
    this.logger.log('Validando token JWT...');
    this.logger.log(`Payload recibido: ${JSON.stringify(payload)}`);

    try {
      // Verificar que el payload contiene el ID del usuario
      if (!payload || !payload.sub) {
        this.logger.error('El payload no contiene el campo "sub" (ID del usuario)');
        throw new UnauthorizedException('Token inválido');
      }

      // El payload contiene los datos que pusimos en el token
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: {
          memberships: {
            where: { status: 'ACTIVE' },
          },
        },
      });

      if (!user) {
        this.logger.error(`Usuario no encontrado con ID: ${payload.sub}`);
        throw new UnauthorizedException('Usuario no encontrado');
      }

      this.logger.log(`Usuario validado: ${user.email}`);

      // Adjuntamos información del usuario al request
      return {
        id: user.id,
        email: user.email,
        roles: user.memberships.map((m) => m.role),
      };
    } catch (error) {
      this.logger.error(`Error al validar token: ${error.message}`);
      throw new UnauthorizedException('Error de autenticación');
    }
  }
}
