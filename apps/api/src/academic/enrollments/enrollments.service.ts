import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Role, EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { studentId, sectionId } = createEnrollmentDto;

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

    const isStudent = student.memberships.some((m) => m.role === Role.ESTUDIANTE);

    if (!isStudent) {
      throw new BadRequestException('El usuario no tiene el rol ESTUDIANTE');
    }

    // Verificar que la sección existe
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        period: true,
        classroom: true,
      },
    });

    if (!section) {
      throw new NotFoundException(`Sección con ID ${sectionId} no encontrada`);
    }

    // Verificar que el período de la sección está activo
    if (section.period.status !== 'ACTIVE') {
      throw new BadRequestException('No se puede matricular en una sección de un período inactivo');
    }

    // Verificar que el estudiante no esté ya matriculado en esta sección
    const existingEnrollment = await this.prisma.enrollment.findFirst({
      where: { studentId, sectionId },
    });

    if (existingEnrollment) {
      throw new ConflictException('El estudiante ya está matriculado en esta sección');
    }

    // Verificar que el estudiante no tenga otra matrícula activa en el mismo período
    const activeEnrollmentInPeriod = await this.prisma.enrollment.findFirst({
      where: {
        studentId,
        status: EnrollmentStatus.ACTIVE,
        section: {
          periodId: section.periodId,
        },
      },
      include: {
        section: {
          include: {
            classroom: true,
            turn: true,
          },
        },
      },
    });

    if (activeEnrollmentInPeriod) {
      throw new ConflictException(
        `El estudiante ya tiene una matrícula activa en el período ${section.period.name}. ` +
        `Sección actual: ${activeEnrollmentInPeriod.section.classroom.name} - ${activeEnrollmentInPeriod.section.name}`
      );
    }

    // Verificar capacidad de la sección
    const currentEnrollments = await this.prisma.enrollment.count({
      where: {
        sectionId,
        status: EnrollmentStatus.ACTIVE,
      },
    });

    if (section.capacity && currentEnrollments >= section.capacity) {
      throw new BadRequestException('La sección ha alcanzado su capacidad máxima');
    }

    return this.prisma.enrollment.create({
      data: {
        studentId,
        sectionId,
        status: EnrollmentStatus.ACTIVE,
      },
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
          },
        },
      },
    });
  }

  async findAll(periodId?: string, sectionId?: string) {
    const where: any = {};
    
    if (periodId) {
      where.section = { periodId };
    }
    
    if (sectionId) {
      where.sectionId = sectionId;
    }

    return this.prisma.enrollment.findMany({
      where,
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async findByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
            sectionCourses: {
              include: {
                course: true,
                teacher: {
                  include: { profile: true },
                },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }

  async findBySection(sectionId: string) {
    return this.prisma.enrollment.findMany({
      where: { sectionId, status: EnrollmentStatus.ACTIVE },
      include: {
        student: {
          include: { profile: true },
        },
      },
      orderBy: { enrolledAt: 'asc' },
    });
  }

  async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        section: {
          include: { period: true },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }

    // Si se está cambiando a ACTIVE, verificar que no haya otra matrícula activa en el período
    if (updateEnrollmentDto.status === EnrollmentStatus.ACTIVE && enrollment.status !== EnrollmentStatus.ACTIVE) {
      const activeEnrollmentInPeriod = await this.prisma.enrollment.findFirst({
        where: {
          studentId: enrollment.studentId,
          status: EnrollmentStatus.ACTIVE,
          section: {
            periodId: enrollment.section.periodId,
          },
          id: { not: id },
        },
      });

      if (activeEnrollmentInPeriod) {
        throw new ConflictException('El estudiante ya tiene otra matrícula activa en este período');
      }
    }

    return this.prisma.enrollment.update({
      where: { id },
      data: updateEnrollmentDto,
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id },
    });

    if (!enrollment) {
      throw new NotFoundException(`Matrícula con ID ${id} no encontrada`);
    }

    // Soft delete: cambiar estado a WITHDRAWN
    return this.prisma.enrollment.update({
      where: { id },
      data: { status: EnrollmentStatus.WITHDRAWN },
    });
  }
}
