import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../common/audit/audit.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentStatus, AuditAction, AuditEntity } from '@intranet/database';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Obtener todos los registros de pago con filtros
   */
  async findAll(filters: {
    status?: PaymentStatus;
    sedeId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.sedeId) {
      where.enrollment = {
        section: {
          classroom: { sedeId: filters.sedeId },
        },
      };
    }

    if (filters.search) {
      where.enrollment = {
        student: {
          profile: {
            OR: [
              { firstName: { contains: filters.search } },
              { lastName: { contains: filters.search } },
              { documentNumber: { contains: filters.search } },
            ],
          },
        },
      };
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const [payments, total] = await Promise.all([
      this.prisma.paymentRecord.findMany({
        where,
        include: {
          enrollment: {
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
          },
        },
        orderBy: { dueDate: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.paymentRecord.count({ where }),
    ]);

    return {
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Obtener pagos de una matrícula específica
   */
  async findByEnrollment(enrollmentId: string) {
    return this.prisma.paymentRecord.findMany({
      where: { enrollmentId },
      orderBy: [{ installmentNumber: 'asc' }, { dueDate: 'asc' }],
    });
  }

  /**
   * Marcar un pago como pagado (o cambiar su estado)
   */
  async updatePayment(paymentId: string, updateDto: UpdatePaymentDto, adminId: string) {
    const payment = await this.prisma.paymentRecord.findUnique({
      where: { id: paymentId },
      include: {
        enrollment: {
          include: {
            student: { include: { profile: true } },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Registro de pago no encontrado');
    }

    // Si se marca como pagado, validar que tenga método de pago
    if (updateDto.status === PaymentStatus.PAID && !updateDto.paymentMethod && !payment.paymentMethod) {
      throw new BadRequestException('Debe especificar el método de pago');
    }

    const updated = await this.prisma.paymentRecord.update({
      where: { id: paymentId },
      data: {
        status: updateDto.status,
        paymentMethod: updateDto.paymentMethod,
        reference: updateDto.reference,
        notes: updateDto.notes,
        paidAt: updateDto.status === PaymentStatus.PAID
          ? (updateDto.paidAt ? new Date(updateDto.paidAt) : new Date())
          : null,
        registeredById: adminId,
      },
      include: {
        enrollment: {
          include: {
            student: { include: { profile: true } },
            paymentPlan: true,
          },
        },
      },
    });

    // Auditoría
    await this.auditService.log({
      action: AuditAction.UPDATE,
      entity: AuditEntity.ENROLLMENT,
      entityId: payment.enrollmentId,
      entityName: payment.enrollment.student.email,
      oldData: {
        status: payment.status,
        paymentMethod: payment.paymentMethod,
      },
      newData: {
        status: updated.status,
        paymentMethod: updated.paymentMethod,
        reference: updated.reference,
        paidAt: updated.paidAt?.toISOString(),
      },
      userId: adminId,
    });

    return updated;
  }

  /**
   * Obtener resumen de pagos (para dashboard)
   */
  async getSummary() {
    const [pending, paid, overdue, total] = await Promise.all([
      this.prisma.paymentRecord.count({ where: { status: PaymentStatus.PENDING } }),
      this.prisma.paymentRecord.count({ where: { status: PaymentStatus.PAID } }),
      this.prisma.paymentRecord.count({ where: { status: PaymentStatus.OVERDUE } }),
      this.prisma.paymentRecord.count(),
    ]);

    const [pendingAmount, paidAmount] = await Promise.all([
      this.prisma.paymentRecord.aggregate({
        where: { status: PaymentStatus.PENDING },
        _sum: { amount: true },
      }),
      this.prisma.paymentRecord.aggregate({
        where: { status: PaymentStatus.PAID },
        _sum: { amount: true },
      }),
    ]);

    return {
      counts: { pending, paid, overdue, total },
      amounts: {
        pending: pendingAmount._sum.amount || 0,
        paid: paidAmount._sum.amount || 0,
      },
    };
  }
}
