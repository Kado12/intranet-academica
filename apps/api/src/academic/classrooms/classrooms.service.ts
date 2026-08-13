import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Injectable()
export class ClassroomsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClassroomDto: CreateClassroomDto) {
    // Verificar que la sede existe
    const sede = await this.prisma.sede.findUnique({
      where: { id: createClassroomDto.sedeId },
    });

    if (!sede) {
      throw new NotFoundException(`Sede con ID ${createClassroomDto.sedeId} no encontrada`);
    }

    // Verificar que no exista un salón con el mismo nombre en la misma sede
    const existingClassroom = await this.prisma.classroom.findFirst({
      where: {
        name: createClassroomDto.name,
        sedeId: createClassroomDto.sedeId,
      },
    });

    if (existingClassroom) {
      throw new ConflictException('Ya existe un salón con ese nombre en esta sede');
    }

    return this.prisma.classroom.create({
      data: createClassroomDto,
      include: {
        sede: true,
      },
    });
  }

  async findAll(filters: {
    sedeId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};

    if (filters.sedeId) {
      where.sedeId = filters.sedeId;
    }
    if (filters.search) {
      where.name = { contains: filters.search };
    }

    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.classroom.findMany({
        where,
        include: {
          sede: true,
          _count: {
            select: { sections: true },
          },
        },
        orderBy: [
          { sede: { name: 'asc' } },
          { name: 'asc' },
        ],
        skip,
        take: limit,
      }),
      this.prisma.classroom.count({ where }),
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
    const classroom = await this.prisma.classroom.findUnique({
      where: { id },
      include: {
        sede: true,
        sections: {
          include: {
            turn: true,
            period: true,
          },
        },
      },
    });

    if (!classroom) {
      throw new NotFoundException(`Salón con ID ${id} no encontrado`);
    }

    return classroom;
  }

  async update(id: string, updateClassroomDto: UpdateClassroomDto) {
    await this.findOne(id);

    return this.prisma.classroom.update({
      where: { id },
      data: updateClassroomDto,
      include: {
        sede: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.classroom.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
