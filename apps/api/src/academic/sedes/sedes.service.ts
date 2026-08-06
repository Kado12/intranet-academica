import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@Injectable()
export class SedesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSedeDto: CreateSedeDto) {
    // Verificar si ya existe una sede con el mismo nombre
    const existingSede = await this.prisma.sede.findFirst({
      where: { name: createSedeDto.name },
    });

    if (existingSede) {
      throw new ConflictException('Ya existe una sede con ese nombre');
    }

    return this.prisma.sede.create({
      data: createSedeDto,
    });
  }

  async findAll() {
    return this.prisma.sede.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const sede = await this.prisma.sede.findUnique({
      where: { id },
      include: {
        classrooms: true,
      },
    });

    if (!sede) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    }

    return sede;
  }

  async update(id: string, updateSedeDto: UpdateSedeDto) {
    // Verificar que la sede existe
    await this.findOne(id);

    return this.prisma.sede.update({
      where: { id },
      data: updateSedeDto,
    });
  }

  async remove(id: string) {
    // Verificar que la sede existe
    await this.findOne(id);

    // Soft delete: marcar como inactivo en lugar de eliminar
    return this.prisma.sede.update({
      where: { id },
      data: { isActive: false },
    });
  }
}