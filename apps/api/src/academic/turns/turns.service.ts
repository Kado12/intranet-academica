import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';

@Injectable()
export class TurnsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTurnDto: CreateTurnDto) {
    const existingTurn = await this.prisma.turn.findFirst({
      where: { name: createTurnDto.name },
    });

    if (existingTurn) {
      throw new ConflictException('Ya existe un turno con ese nombre');
    }

    return this.prisma.turn.create({
      data: createTurnDto,
    });
  }

  async findAll() {
    return this.prisma.turn.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const turn = await this.prisma.turn.findUnique({
      where: { id },
      include: {
        sections: true,
      },
    });

    if (!turn) {
      throw new NotFoundException(`Turno con ID ${id} no encontrado`);
    }

    return turn;
  }

  async update(id: string, updateTurnDto: UpdateTurnDto) {
    await this.findOne(id);

    return this.prisma.turn.update({
      where: { id },
      data: updateTurnDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.turn.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
