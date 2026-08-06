import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSectionCourseDto } from './dto/create-section-course.dto';
import { UpdateSectionCourseDto } from './dto/update-section-course.dto';
import { Role } from '@prisma/client';

@Injectable()
export class SectionCoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSectionCourseDto: CreateSectionCourseDto) {
    const { sectionId, courseId, teacherId } = createSectionCourseDto;

    // Verificar que la sección existe
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: { period: true },
    });

    if (!section) {
      throw new NotFoundException(`Sección con ID ${sectionId} no encontrada`);
    }

    // Verificar que el curso existe
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${courseId} no encontrado`);
    }

    // Verificar que el docente existe y tiene rol DOCENTE
    const teacher = await this.prisma.user.findUnique({
      where: { id: teacherId },
      include: {
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!teacher) {
      throw new NotFoundException(`Docente con ID ${teacherId} no encontrado`);
    }

    const isTeacher = teacher.memberships.some((m) => m.role === Role.DOCENTE);

    if (!isTeacher) {
      throw new BadRequestException('El usuario no tiene el rol DOCENTE');
    }

    // Verificar que el docente está asignado al curso globalmente (opcional pero recomendado)
    const courseTeacherAssignment = await this.prisma.courseTeacher.findFirst({
      where: { courseId, teacherId, isActive: true },
    });

    if (!courseTeacherAssignment) {
      throw new BadRequestException('El docente no está asignado globalmente a este curso. Primero debe asignarlo en CourseTeachers.');
    }

    // Verificar que el curso no esté ya asignado a esta sección
    const existingSectionCourse = await this.prisma.sectionCourse.findFirst({
      where: { sectionId, courseId },
    });

    if (existingSectionCourse) {
      throw new ConflictException('Este curso ya está asignado a esta sección');
    }

    return this.prisma.sectionCourse.create({
      data: {
        sectionId,
        courseId,
        teacherId,
      },
      include: {
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
          },
        },
        course: true,
        teacher: {
          include: { profile: true },
        },
      },
    });
  }

  async findAll(periodId?: string) {
    const where: any = { isActive: true };
    
    if (periodId) {
      where.section = { periodId };
    }

    return this.prisma.sectionCourse.findMany({
      where,
      include: {
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
          },
        },
        course: true,
        teacher: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySection(sectionId: string) {
    return this.prisma.sectionCourse.findMany({
      where: { sectionId, isActive: true },
      include: {
        course: true,
        teacher: {
          include: { profile: true },
        },
      },
    });
  }

  async findByTeacher(teacherId: string) {
    return this.prisma.sectionCourse.findMany({
      where: { teacherId, isActive: true },
      include: {
        section: {
          include: {
            classroom: true,
            turn: true,
            period: true,
          },
        },
        course: true,
      },
    });
  }

  async update(id: string, updateSectionCourseDto: UpdateSectionCourseDto) {
    const sectionCourse = await this.prisma.sectionCourse.findUnique({
      where: { id },
      include: { section: true },
    });

    if (!sectionCourse) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    // Si se cambia el docente, validar que el nuevo docente esté asignado al curso
    if (updateSectionCourseDto.teacherId) {
      const courseTeacherAssignment = await this.prisma.courseTeacher.findFirst({
        where: {
          courseId: sectionCourse.courseId,
          teacherId: updateSectionCourseDto.teacherId,
          isActive: true,
        },
      });

      if (!courseTeacherAssignment) {
        throw new BadRequestException('El nuevo docente no está asignado globalmente a este curso');
      }
    }

    return this.prisma.sectionCourse.update({
      where: { id },
      data: updateSectionCourseDto,
      include: {
        section: true,
        course: true,
        teacher: {
          include: { profile: true },
        },
      },
    });
  }

  async remove(id: string) {
    const sectionCourse = await this.prisma.sectionCourse.findUnique({
      where: { id },
    });

    if (!sectionCourse) {
      throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    }

    return this.prisma.sectionCourse.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
