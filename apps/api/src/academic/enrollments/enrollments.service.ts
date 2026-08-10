import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { TransferEnrollmentDto } from './dto/transfer-enrollment.dto';
import { Role, EnrollmentStatus } from '@intranet/database';

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
        paymentPlan: true,
      },
    });
  }

  async findAll(filters: {
    periodId?: string;
    sectionId?: string;
    sedeId?: string;
    turnId?: string;
    paymentPlanId?: string;
    search?: string;
  }) {
    const where: any = {};

    if (filters.periodId) {
      where.section = { periodId: filters.periodId };
    }

    if (filters.sectionId) {
      where.sectionId = filters.sectionId;
    }

    if (filters.sedeId || filters.turnId) {
      where.section = {
        ...(where.section || {}),
        ...(filters.sedeId && { classroom: { sedeId: filters.sedeId } }),
        ...(filters.turnId && { turnId: filters.turnId }),
      };
    }

    if (filters.paymentPlanId) {
      where.paymentPlanId = filters.paymentPlanId;
    }

    if (filters.search) {
      where.student = {
        profile: {
          OR: [
            { firstName: { contains: filters.search } },
            { lastName: { contains: filters.search } },
            { documentNumber: { contains: filters.search } },
          ],
        },
      };
    }

    return this.prisma.enrollment.findMany({
      where,
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: { include: { sede: true } },
            turn: true,
            period: true,
          },
        },
        paymentPlan: true,
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
        paymentPlan: true,
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
        paymentPlan: true,
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
        paymentPlan: true,
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

  async transferEnrollment(enrollmentId: string, transferDto: TransferEnrollmentDto, adminId: string) {
    const { sectionId, sedeId, turnId, paymentPlanId, reason } = transferDto;

    // 1. Buscar la matrícula actual
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        student: { include: { profile: true } },
        section: {
          include: {
            classroom: { include: { sede: true } },
            turn: true,
            period: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Matrícula no encontrada');
    }

    if (enrollment.status !== EnrollmentStatus.ACTIVE) {
      throw new BadRequestException('Solo se pueden transferir matrículas activas');
    }

    const currentPeriodId = enrollment.section.periodId;
    let newSectionId = enrollment.sectionId;

    // 2. Determinar la nueva sección
    if (sectionId) {
      // MODO 1: Asignación manual
      const newSection = await this.validateSectionForTransfer(sectionId, currentPeriodId, enrollmentId);
      newSectionId = newSection.id;
    } else if (sedeId && turnId) {
      // MODO 2: Auto-asignación por sede y turno
      const newSection = await this.autoAssignSectionForTransfer(
        sedeId,
        turnId,
        currentPeriodId,
        enrollmentId,
      );
      newSectionId = newSection.id;
    }

    // 3. Validar plan de pago si se especificó
    if (paymentPlanId) {
      const paymentPlan = await this.prisma.paymentPlan.findUnique({
        where: { id: paymentPlanId },
      });

      if (!paymentPlan) {
        throw new NotFoundException('Plan de pago no encontrado');
      }

      if (!paymentPlan.isActive) {
        throw new BadRequestException('El plan de pago no está activo');
      }
    }

    // 4. Actualizar la matrícula
    const updatedEnrollment = await this.prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        sectionId: newSectionId,
        ...(paymentPlanId && { paymentPlanId }),
      },
      include: {
        student: { include: { profile: true } },
        section: {
          include: {
            classroom: { include: { sede: true } },
            turn: true,
            period: true,
          },
        },
        paymentPlan: true,
      },
    });

    // 5. Log de auditoría
    console.log(
      `Transferencia: ${enrollment.student.email} | ` +
        `De: ${enrollment.section.name} → A: ${updatedEnrollment.section.name} | ` +
        `Motivo: ${reason || 'No especificado'} | ` +
        `Por: ${adminId}`,
    );

    return {
      message: 'Transferencia realizada exitosamente',
      enrollment: updatedEnrollment,
      changes: {
        section: sectionId ? 'manual' : sedeId && turnId ? 'auto' : 'none',
        paymentPlan: paymentPlanId ? 'updated' : 'none',
        reason: reason || 'No especificado',
      },
    };
  }

  private async validateSectionForTransfer(sectionId: string, periodId: string, currentEnrollmentId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        enrollments: {
          where: {
            status: EnrollmentStatus.ACTIVE,
            id: { not: currentEnrollmentId }, // Excluir la matrícula actual
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException('Sección no encontrada');
    }

    if (!section.isActive) {
      throw new BadRequestException('La sección no está activa');
    }

    if (section.periodId !== periodId) {
      throw new BadRequestException('La sección no pertenece al mismo período académico');
    }

    const currentEnrollments = section.enrollments.length;
    const capacity = section.capacity || 30;

    if (currentEnrollments >= capacity) {
      throw new BadRequestException(
        `La sección está llena. Capacidad: ${capacity}, Matriculados: ${currentEnrollments}`,
      );
    }

    return section;
  }

  private async autoAssignSectionForTransfer(
    sedeId: string,
    turnId: string,
    periodId: string,
    currentEnrollmentId: string,
  ) {
    const sections = await this.prisma.section.findMany({
      where: {
        isActive: true,
        periodId,
        turnId,
        classroom: { sedeId },
      },
      include: {
        enrollments: {
          where: {
            status: EnrollmentStatus.ACTIVE,
            id: { not: currentEnrollmentId },
          },
        },
        classroom: true,
      },
      orderBy: { priority: 'asc' },
    });

    if (sections.length === 0) {
      throw new BadRequestException(
        'No hay secciones disponibles para esta sede y turno en el período actual',
      );
    }

    for (const section of sections) {
      const currentEnrollments = section.enrollments.length;
      const capacity = section.capacity || 30;

      if (currentEnrollments < capacity) {
        return section;
      }
    }
    throw new BadRequestException(
      'No hay cupo disponible en ninguna sección para esta sede y turno',
    );
  }
}
