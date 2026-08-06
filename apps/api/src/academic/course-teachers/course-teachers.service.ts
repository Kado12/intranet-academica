import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseTeacherDto } from './dto/create-course-teacher.dto';
import { Role } from '@prisma/client';

@Injectable()
export class CourseTeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseTeacherDto: CreateCourseTeacherDto) {
    const { courseId, teacherId } = createCourseTeacherDto;

    // Verificar que el curso existe
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${courseId} no encontrado`);
    }

    // Verificar que el usuario existe y tiene rol DOCENTE
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId },
      include: {
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!teacher) {
      throw new NotFoundException(`Usuario con ID ${teacherId} no encontrado`);
    }

    const isTeacher = teacher.memberships.some((m) => m.role === Role.DOCENTE);

    if (!isTeacher) {
      throw new BadRequestException('El usuario no tiene el rol DOCENTE');
    }

    // Verificar que no exista ya la asignación
    const existingAssignment = await this.prisma.courseTeacher.findFirst({
      where: { courseId, teacherId },
    });

    if (existingAssignment) {
      throw new ConflictException('Este docente ya está asignado a este curso');
    }

    return this.prisma.courseTeacher.create({
      data: {
        courseId,
        teacherId,
      },
      include: {
        course: true,
        teacher: {
          include: { profile: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.courseTeacher.findMany({
      where: { isActive: true },
      include: {
        course: true,
        teacher: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCourse(courseId: string) {
    return this.prisma.courseTeacher.findMany({
      where: { courseId, isActive: true },
      include: {
        teacher: {
          include: { profile: true },
        },
      },
    });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.courseTeacher.findMany({
      where: { teacherId, isActive: true },
      include: {
        course: true,
      },
    });
  }

  async remove(id: string) {
    const assignment = await this.prisma.courseTeacher.findUnique({
      where: { id },
    });

    if (!assignment) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    // Soft delete
    return this.prisma.courseTeacher.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
