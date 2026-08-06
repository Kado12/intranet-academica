import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el correo ya existe
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

    // Crear el usuario
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        passwordHash,
        profile: {
          create: {
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            documentNumber: registerDto.documentNumber,
            documentType: registerDto.documentType,
          },
        },
        memberships: {
          create: {
            role: registerDto.role,
          },
        },
      },
      include: {
        profile: true,
        memberships: true,
      },
    });

    // Generar token JWT
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        roles: user.memberships.map((m) => m.role),
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    // Buscar al usuario por correo
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Actualizar la última fecha de login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generar token JWT
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        roles: user.memberships.map((m) => m.role),
      },
      token,
    };
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.memberships.map((m) => m.role),
    };

    return this.jwtService.sign(payload);
  }
}
