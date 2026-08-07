import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateParentStudentDto } from './dto/create-parent-student.dto';
import { Role } from '@intranet/database';

@Injectable()
export class ParentStudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParentStudentDto: CreateParentStudentDto) {
    const { parentId, studentId, relationType, isPrimary } = createParentStudentDto;

    // Verificar que el padre existe y tiene rol PADRE_DE_FAMILIA
    const parent = await this.prisma.user.findUnique({
      where: { id: parentId },
      include: {
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!parent) {
      throw new NotFoundException(`Padre con ID ${parentId} no encontrado`);
    }

    const isParentRole = parent.memberships.some((m) => m.role === Role.PADRE_DE_FAMILIA);

    if (!isParentRole) {
      throw new BadRequestException('El usuario no tiene el rol PADRE_DE_FAMILIA');
    }

    // Verificar que el estudiante existe y tiene rol ESTUDIANTE
    const student = await this.prisma.user.findUnique({
      where: { id: studentId },
      include: {
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!student) {
      throw new NotFoundException(`Estudiante con ID ${studentId} no encontrado`);
    }

    const isStudentRole = student.memberships.some((m) => m.role === Role.ESTUDIANTE);

    if (!isStudentRole) {
      throw new BadRequestException('El usuario no tiene el rol ESTUDIANTE');
    }

    // Verificar que no exista ya la vinculación
    const existingRelation = await this.prisma.parentStudent.findFirst({
      where: { parentId, studentId },
    });

    if (existingRelation) {
      throw new ConflictException('Este padre ya está vinculado a este estudiante');
    }

    // Si es apoderado principal, desmarcar otros apoderados principales del estudiante
    if (isPrimary) {
      await this.prisma.parentStudent.updateMany({
        where: { studentId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    return this.prisma.parentStudent.create({
      data: {
        parentId,
        studentId,
        relationType,
        isPrimary: isPrimary || false,
      },
      include: {
        parent: {
          include: { profile: true },
        },
        student: {
          include: { profile: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.parentStudent.findMany({
      include: {
        parent: {
          include: { profile: true },
        },
        student: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByParent(parentId: string) {
    return this.prisma.parentStudent.findMany({
      where: { parentId },
      include: {
        student: {
          include: {
            profile: true,
            enrollments: {
              where: { status: 'ACTIVE' },
              include: {
                section: {
                  include: {
                    classroom: true,
                    turn: true,
                    period: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findByStudent(studentId: string) {
    return this.prisma.parentStudent.findMany({
      where: { studentId },
      include: {
        parent: {
          include: { profile: true },
        },
      },
    });
  }

  async remove(id: string) {
    const relation = await this.prisma.parentStudent.findUnique({
      where: { id },
    });

    if (!relation) {
      throw new NotFoundException(`Vinculación con ID ${id} no encontrada`);
    }

    return this.prisma.parentStudent.delete({
      where: { id },
    });
  }
}
