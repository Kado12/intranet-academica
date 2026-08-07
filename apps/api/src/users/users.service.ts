import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@intranet/database';

// Roles administrativos que se muestran en la tabla de gestión
const ADMIN_ROLES: Role[] = [
  Role.ADMIN,
  Role.INFORMATICO,
  Role.SECRETARIA,
  Role.COORDINADOR,
];

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAdminUsers(search?: string, role?: Role) {
    const where: any = {
      memberships: {
        some: {
          role: {
            in: role ? [role] : ADMIN_ROLES,
          },
          status: 'ACTIVE',
        },
      },
    };

    // Si hay búsqueda, filtrar por nombre o correo
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { profile: { firstName: { contains: search } } },
        { profile: { lastName: { contains: search } } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
          select: { role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async toggleActive(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });
  }

  async countByRole() {
    const counts = await this.prisma.membership.groupBy({
      by: ['role'],
      where: { status: 'ACTIVE' },
      _count: true,
    });

    return counts.map((item) => ({
      role: item.role,
      count: item._count,
    }));
  }

  async findStudents(search?: string) {
    const where: any = {
      memberships: {
        some: {
          role: Role.ESTUDIANTE,
          status: 'ACTIVE',
        },
      },
    };

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { profile: { firstName: { contains: search } } },
        { profile: { lastName: { contains: search } } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
          select: { role: true },
        },
      },
      orderBy: {
        profile: {
          firstName: 'asc',
        },
      },
    });
  }
}
