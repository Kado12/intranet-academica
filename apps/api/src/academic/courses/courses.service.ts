import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    // Verificar que no exista un curso con el mismo código
    const existingCourse = await this.prisma.course.findFirst({
      where: { code: createCourseDto.code },
    });

    if (existingCourse) {
      throw new ConflictException('Ya existe un curso con ese código');
    }

    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        courseTeachers: {
          include: {
            teacher: {
              include: { profile: true },
            },
          },
        },
        sectionCourses: {
          include: {
            section: true,
            teacher: {
              include: { profile: true },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${id} no encontrado`);
    }

    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
