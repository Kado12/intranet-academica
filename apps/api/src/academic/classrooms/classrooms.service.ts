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

  async findAll(sedeId?: string) {
    const where = sedeId ? { sedeId, isActive: true } : { isActive: true };

    return this.prisma.classroom.findMany({
      where,
      include: {
        sede: true,
      },
      orderBy: { name: 'asc' },
    });
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
