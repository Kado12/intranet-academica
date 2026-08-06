import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

@Injectable()
export class PeriodsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPeriodDto: CreatePeriodDto) {
    // Verificar que no exista un período con el mismo nombre
    const existingPeriod = await this.prisma.academicPeriod.findFirst({
      where: { name: createPeriodDto.name },
    });

    if (existingPeriod) {
      throw new ConflictException('Ya existe un período con ese nombre');
    }

    // Validar que la fecha de inicio sea anterior a la fecha de fin
    const startDate = new Date(createPeriodDto.startDate);
    const endDate = new Date(createPeriodDto.endDate);

    if (startDate >= endDate) {
      throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    return this.prisma.academicPeriod.create({
      data: {
        name: createPeriodDto.name,
        startDate,
        endDate,
        status: createPeriodDto.status || 'DRAFT',
      },
    });
  }

  async findAll() {
    return this.prisma.academicPeriod.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  async findOne(id: string) {
    const period = await this.prisma.academicPeriod.findUnique({
      where: { id },
      include: {
        sections: true,
      },
    });

    if (!period) {
      throw new NotFoundException(`Período con ID ${id} no encontrado`);
    }

    return period;
  }

  async findActive() {
    return this.prisma.academicPeriod.findFirst({
      where: { status: 'ACTIVE' },
    });
  }

  async update(id: string, updatePeriodDto: UpdatePeriodDto) {
    await this.findOne(id);

    // Si se actualizan las fechas, validar que sean coherentes
    if (updatePeriodDto.startDate && updatePeriodDto.endDate) {
      const startDate = new Date(updatePeriodDto.startDate);
      const endDate = new Date(updatePeriodDto.endDate);

      if (startDate >= endDate) {
        throw new BadRequestException('La fecha de inicio debe ser anterior a la fecha de fin');
      }
    }

    return this.prisma.academicPeriod.update({
      where: { id },
      data: updatePeriodDto,
    });
  }

  async activate(id: string) {
    await this.findOne(id);

    // Desactivar cualquier otro período activo
    await this.prisma.academicPeriod.updateMany({
      where: { status: 'ACTIVE' },
      data: { status: 'FINISHED' },
    });

    // Activar este período
    return this.prisma.academicPeriod.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    // Solo se pueden eliminar períodos en estado DRAFT
    const period = await this.prisma.academicPeriod.findUnique({ where: { id } });

    if (period?.status !== 'DRAFT') {
      throw new BadRequestException('Solo se pueden eliminar períodos en estado DRAFT');
    }

    return this.prisma.academicPeriod.delete({
      where: { id },
    });
  }
}
