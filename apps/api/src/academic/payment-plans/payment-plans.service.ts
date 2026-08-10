import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';

@Injectable()
export class PaymentPlansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreatePaymentPlanDto) {
    // Verificar que no exista un plan con el mismo nombre
    const existingPlan = await this.prisma.paymentPlan.findFirst({
      where: { name: createDto.name },
    });

    if (existingPlan) {
      throw new ConflictException('Ya existe un plan de pago con ese nombre');
    }

    // Calcular monto final
    const finalAmount = createDto.baseAmount * (1 - createDto.discount / 100);

    return this.prisma.paymentPlan.create({
      data: {
        name: createDto.name,
        type: createDto.type,
        description: createDto.description,
        baseAmount: createDto.baseAmount,
        discount: createDto.discount,
        finalAmount,
        installments: createDto.installments,
        sedeId: createDto.sedeId,
        isActive: createDto.isActive ?? true,
      },
    });
  }

  async findAll(sedeId?: string) {
    const where: any = { isActive: true };
    if (sedeId) {
      where.OR = [
        { sedeId },
        { sedeId: null }, // Planes globales
      ];
    }

    return await this.prisma.paymentPlan.findMany({
      where,
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const plan = await this.prisma.paymentPlan.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            student: {
              include: { profile: true },
            },
          },
        },
      },
    });

    if (!plan) {
      throw new NotFoundException('Plan de pago no encontrado');
    }

    return plan;
  }

  async update(id: string, updateDto: Partial<CreatePaymentPlanDto>) {
    await this.findOne(id);

    // Recalcular monto final si cambian baseAmount o discount
    let finalAmount: number | undefined;
    if (updateDto.baseAmount !== undefined || updateDto.discount !== undefined) {
      const plan = await this.prisma.paymentPlan.findUnique({ where: { id } });
      const baseAmount = updateDto.baseAmount ?? plan?.baseAmount;
      const discount = updateDto.discount ?? plan?.discount;
      finalAmount = Number(baseAmount) * (1 - Number(discount) / 100);
    }

    return this.prisma.paymentPlan.update({
      where: { id },
      data: {
        ...updateDto,
        ...(finalAmount !== undefined && { finalAmount }),
      },
    });
  }

  async remove(id: string) {
    const plan = await this.findOne(id);

    // Verificar que no tenga matrículas asociadas
    if (plan.enrollments.length > 0) {
      throw new ConflictException(
        `No se puede eliminar el plan porque tiene ${plan.enrollments.length} matrículas asociadas`
      );
    }

    return this.prisma.paymentPlan.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
