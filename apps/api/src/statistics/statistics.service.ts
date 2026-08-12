import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollmentStatus, PaymentStatus, Role } from '@intranet/database';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtener resumen general del sistema
   */
  async getOverview() {
    // Ejecutar todas las consultas en paralelo para mejor rendimiento
    const [
      totalStudents,
      totalActiveEnrollments,
      totalSedes,
      totalTeachers,
      totalClassrooms,
      paymentsSummary,
      enrollmentsBySede,
      enrollmentsByTurn,
      paymentPlansDistribution,
      recentEnrollments,
      enrollmentsByMonth,
    ] = await Promise.all([
      // Total de estudiantes activos
      this.prisma.user.count({
        where: {
          isActive: true,
          memberships: {
            some: { role: Role.ESTUDIANTE, status: 'ACTIVE' },
          },
        },
      }),

      // Total de matrículas activas
      this.prisma.enrollment.count({
        where: { status: EnrollmentStatus.ACTIVE },
      }),

      // Total de sedes activas
      this.prisma.sede.count({
        where: { isActive: true },
      }),

      // Total de docentes
      this.prisma.user.count({
        where: {
          isActive: true,
          memberships: {
            some: { role: Role.DOCENTE, status: 'ACTIVE' },
          },
        },
      }),

      // Total de salones
      this.prisma.classroom.count({
        where: { isActive: true },
      }),

      // Resumen de pagos
      this.getPaymentsSummary(),

      // Matrículas por sede
      this.getEnrollmentsBySede(),

      // Matrículas por turno
      this.getEnrollmentsByTurn(),

      // Distribución de planes de pago
      this.getPaymentPlansDistribution(),

      // Últimos registros
      this.getRecentEnrollments(),

      // Matrículas por mes (últimos 6 meses)
      this.getEnrollmentsByMonth(),
    ]);

    return {
      counts: {
        totalStudents,
        totalActiveEnrollments,
        totalSedes,
        totalTeachers,
        totalClassrooms,
      },
      payments: paymentsSummary,
      charts: {
        enrollmentsBySede,
        enrollmentsByTurn,
        paymentPlansDistribution,
        enrollmentsByMonth,
      },
      recentEnrollments,
    };
  }

  /**
   * Resumen de pagos
   */
  private async getPaymentsSummary() {
    const [paid, pending, overdue, waived] = await Promise.all([
      this.prisma.paymentRecord.aggregate({
        where: { status: PaymentStatus.PAID },
        _count: true,
        _sum: { amount: true },
      }),
      this.prisma.paymentRecord.aggregate({
        where: { status: PaymentStatus.PENDING },
        _count: true,
        _sum: { amount: true },
      }),
      this.prisma.paymentRecord.aggregate({
        where: { status: PaymentStatus.OVERDUE },
        _count: true,
        _sum: { amount: true },
      }),
      this.prisma.paymentRecord.aggregate({
        where: { status: PaymentStatus.WAIVED },
        _count: true,
        _sum: { amount: true },
      }),
    ]);

    return {
      paid: {
        count: paid._count,
        amount: paid._sum.amount || 0,
      },
      pending: {
        count: pending._count,
        amount: pending._sum.amount || 0,
      },
      overdue: {
        count: overdue._count,
        amount: overdue._sum.amount || 0,
      },
      waived: {
        count: waived._count,
        amount: waived._sum.amount || 0,
      },
      totalCollected: paid._sum.amount || 0,
      totalPending: (pending._sum.amount || 0) + (overdue._sum.amount || 0),
    };
  }

  /**
   * Matrículas por sede
   */
  private async getEnrollmentsBySede() {
    const result = await this.prisma.enrollment.groupBy({
      by: ['sectionId'],
      where: { status: EnrollmentStatus.ACTIVE },
      _count: true,
    });

    // Obtener las sedes de las secciones
    const sectionIds = result.map((r) => r.sectionId);
    const sections = await this.prisma.section.findMany({
      where: { id: { in: sectionIds } },
      include: {
        classroom: {
          include: { sede: true },
        },
      },
    });

    // Agrupar por sede
    const sedeMap = new Map<string, { name: string; count: number }>();

    for (const section of sections) {
      const sedeName = section.classroom?.sede?.name || 'Sin sede';
      const enrollmentCount = result.find((r) => r.sectionId === section.id)?._count || 0;

      if (!sedeMap.has(sedeName)) {
        sedeMap.set(sedeName, { name: sedeName, count: 0 });
      }
      sedeMap.get(sedeName)!.count += enrollmentCount;
    }

    return Array.from(sedeMap.values());
  }

  /**
   * Matrículas por turno
   */
  private async getEnrollmentsByTurn() {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { status: EnrollmentStatus.ACTIVE },
      include: {
        section: {
          include: { turn: true },
        },
      },
    });

    // Agrupar por turno
    const turnMap = new Map<string, number>();

    for (const enrollment of enrollments) {
      const turnName = enrollment.section.turn?.name || 'Sin turno';
      turnMap.set(turnName, (turnMap.get(turnName) || 0) + 1);
    }

    return Array.from(turnMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }

  /**
   * Distribución de planes de pago
   */
  private async getPaymentPlansDistribution() {
    const result = await this.prisma.enrollment.groupBy({
      by: ['paymentPlanId'],
      where: {
        status: EnrollmentStatus.ACTIVE,
        paymentPlanId: { not: null },
      },
      _count: true,
    });

    const planIds = result.map((r) => r.paymentPlanId).filter(Boolean) as string[];
    const plans = await this.prisma.paymentPlan.findMany({
      where: { id: { in: planIds } },
      select: { id: true, name: true },
    });

    return result
      .filter((r) => r.paymentPlanId)
      .map((r) => ({
        name: plans.find((p) => p.id === r.paymentPlanId)?.name || 'Sin plan',
        count: r._count,
      }));
  }

  /**
   * Últimos 5 registros
   */
  private async getRecentEnrollments() {
    return this.prisma.enrollment.findMany({
      where: { status: EnrollmentStatus.ACTIVE },
      orderBy: { enrolledAt: 'desc' },
      take: 5,
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: { include: { sede: true } },
            turn: true,
          },
        },
        paymentPlan: true,
      },
    });
  }

  /**
   * Matrículas por mes (últimos 6 meses)
   */
  private async getEnrollmentsByMonth() {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const enrollments = await this.prisma.enrollment.findMany({
      where: {
        enrolledAt: { gte: sixMonthsAgo },
      },
      select: { enrolledAt: true },
    });

    // Agrupar por mes
    const monthMap = new Map<string, number>();
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (const enrollment of enrollments) {
      const date = new Date(enrollment.enrolledAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

      if (!monthMap.has(key)) {
        monthMap.set(key, 0);
      }
      monthMap.set(key, monthMap.get(key)! + 1);
    }

    // Ordenar por fecha y retornar
    return Array.from(monthMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([_, count], index, arr) => {
        const date = new Date(sixMonthsAgo);
        date.setMonth(date.getMonth() + index);
        return {
          month: `${monthNames[date.getMonth()]}`,
          count,
        };
      });
  }
}
