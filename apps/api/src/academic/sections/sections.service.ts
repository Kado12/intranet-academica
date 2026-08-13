import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSectionDto: CreateSectionDto) {
    // Verificar que el salón existe
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: createSectionDto.classroomId },
    });

    if (!classroom) {
      throw new NotFoundException(`Salón con ID ${createSectionDto.classroomId} no encontrado`);
    }

    // Verificar que el turno existe
    const turn = await this.prisma.turn.findUnique({
      where: { id: createSectionDto.turnId },
    });

    if (!turn) {
      throw new NotFoundException(`Turno con ID ${createSectionDto.turnId} no encontrado`);
    }

    // Verificar que el período existe
    const period = await this.prisma.academicPeriod.findUnique({
      where: { id: createSectionDto.periodId },
    });

    if (!period) {
      throw new NotFoundException(`Período con ID ${createSectionDto.periodId} no encontrado`);
    }

    // Verificar que no exista una sección con el mismo nombre en el mismo salón, turno y período
    const existingSection = await this.prisma.section.findFirst({
      where: {
        name: createSectionDto.name,
        classroomId: createSectionDto.classroomId,
        turnId: createSectionDto.turnId,
        periodId: createSectionDto.periodId,
      },
    });

    if (existingSection) {
      throw new ConflictException('Ya existe una sección con ese nombre en este salón, turno y período');
    }

    return this.prisma.section.create({
      data: createSectionDto,
      include: {
        classroom: true,
        turn: true,
        period: true,
      },
    });
  }

  async findAll(filters: {
    sedeId?: string;
    turnId?: string;
    periodId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};

    if (filters.sedeId) {
      where.classroom = { sedeId: filters.sedeId };
    }
    if (filters.turnId) {
      where.turnId = filters.turnId;
    }
    if (filters.periodId) {
      where.periodId = filters.periodId;
    }
    if (filters.search) {
      where.name = { contains: filters.search };
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.section.findMany({
        where,
        include: {
          classroom: { include: { sede: true } },
          turn: true,
          period: true,
          _count: {
            select: { enrollments: true },
          },
        },
        orderBy: [
          { classroom: { sede: { name: 'asc' } } },
          { turn: { name: 'asc' } },
          { name: 'asc' },
        ],
        skip,
        take: limit,
      }),
      this.prisma.section.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const section = await this.prisma.section.findUnique({
      where: { id },
      include: {
        classroom: {
          include: { sede: true },
        },
        turn: true,
        period: true,
        enrollments: {
          include: {
            student: {
              include: { profile: true },
            },
          },
        },
        sectionCourses: {
          include: {
            course: true,
            teacher: {
              include: { profile: true },
            },
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException(`Sección con ID ${id} no encontrada`);
    }

    return section;
  }

  async update(id: string, updateSectionDto: UpdateSectionDto) {
    await this.findOne(id);

    return this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
      include: {
        classroom: true,
        turn: true,
        period: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.section.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
