import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ExcuseAttendanceDto } from './dto/excuse-attendance.dto';
import { AttendanceStatus, Role } from '@intranet/database';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registrar asistencia masiva para una sección-curso en una fecha específica
   */
  async createBulkAttendance(createDto: CreateAttendanceDto, teacherId: string) {
    const { date, sectionCourseId, attendances } = createDto;

    // Verificar que el curso-sección existe
    const sectionCourse = await this.prisma.sectionCourse.findUnique({
      where: { id: sectionCourseId },
      include: {
        section: {
          include: {
            enrollments: {
              where: { status: 'ACTIVE' },
              include: { student: true },
            },
          },
        },
      },
    });

    if (!sectionCourse) {
      throw new NotFoundException('Curso-sección no encontrado');
    }

    // Verificar que el docente es el profesor asignado
    if (sectionCourse.teacherId !== teacherId) {
      throw new BadRequestException('Solo el docente asignado puede registrar asistencia');
    }

    // Verificar que todos los estudiantes están matriculados en la sección
    const enrolledStudentIds = sectionCourse.section.enrollments.map(e => e.studentId);
    const attendanceStudentIds = attendances.map((a) => a.studentId);

    const invalidStudents = attendanceStudentIds.filter(
      (id) => !enrolledStudentIds.includes(id),
    );
    if (invalidStudents.length > 0) {
      throw new BadRequestException(`Los siguientes estudiantes no están matriculados en esta sección: ${invalidStudents.join(', ')}`);
    }

    // Convertir fecha string a Date
    const attendanceDate = new Date(date);

    // Crear o actualizar asistencias
    const results = await Promise.all(
      attendances.map(async (attendance) => {
        return await this.prisma.attendance.upsert({
          where: {
            studentId_sectionCourseId_date: {
              studentId: attendance.studentId,
              sectionCourseId,
              date: attendanceDate,
            },
          },
          update: {
            status: attendance.status,
            notes: attendance.notes,
          },
          create: {
            studentId: attendance.studentId,
            sectionCourseId,
            date: attendanceDate,
            status: attendance.status,
            notes: attendance.notes,
          },
        });
      }),
    );

    return {
      message: `${results.length} asistencias registradas correctamente`,
      date,
      sectionCourseId,
      count: results.length,
    };
  }

  /**
   * Justificar una ausencia
   */
  async excuseAttendance(attendanceId: string, excuseDto: ExcuseAttendanceDto, excusedById: string) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id: attendanceId },
    });

    if (!attendance) {
      throw new NotFoundException('Asistencia no encontrada');
    }

    if (attendance.status !== AttendanceStatus.ABSENT) {
      throw new BadRequestException('Solo se pueden justificar ausencias');
    }

    return this.prisma.attendance.update({
      where: { id: attendanceId },
      data: {
        status: AttendanceStatus.EXCUSED,
        excuseNote: excuseDto.excuseNote,
        excuseDate: new Date(),
        excusedById,
      },
      include: {
        student: {
          include: { profile: true },
        },
      },
    });
  }

  /**
   * Obtener asistencia de una sección-curso en una fecha específica
   */
  async findBySectionCourseAndDate(sectionCourseId: string, date: string) {
    const attendanceDate = new Date(date);

    return await this.prisma.attendance.findMany({
      where: {
        sectionCourseId,
        date: attendanceDate,
      },
      include: {
        student: {
          include: { profile: true },
        },
      },
      orderBy: {
        student: {
          profile: {
            firstName: 'asc',
          },
        },
      },
    });
  }

  /**
   * Obtener asistencia de un estudiante en un curso
   */
  async findByStudentAndCourse(studentId: string, sectionCourseId: string) {
    return await this.prisma.attendance.findMany({
      where: {
        studentId,
        sectionCourseId,
      },
      orderBy: { date: 'desc' },
      include: {
        sectionCourse: {
          include: {
            course: true,
          },
        },
      },
    });
  }

  /**
   * Obtener estadísticas de asistencia de un estudiante
   */
  async getStudentStats(studentId: string, sectionCourseId?: string) {
    const where: any = { studentId };
    if (sectionCourseId) where.sectionCourseId = sectionCourseId;

    const attendances = await this.prisma.attendance.findMany({
      where,
      select: { status: true },
    });

    const total = attendances.length;
    const present = attendances.filter(a => a.status === AttendanceStatus.PRESENT).length;
    const absent = attendances.filter(a => a.status === AttendanceStatus.ABSENT).length;
    const late = attendances.filter(a => a.status === AttendanceStatus.LATE).length;
    const excused = attendances.filter(a => a.status === AttendanceStatus.EXCUSED).length;

    return {
      total,
      present,
      absent,
      late,
      excused,
      attendanceRate: total > 0 ? ((present + excused) / total * 100).toFixed(2) : '0',
    };
  }

  /**
   * Obtener reporte de asistencia de una sección
   */
  async getSectionReport(sectionCourseId: string, startDate?: string, endDate?: string) {
    const where: any = { sectionCourseId };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const attendances = await this.prisma.attendance.findMany({
      where,
      include: {
        student: {
          include: { profile: true },
        },
      },
    });

    // Agrupar por estudiante
    const studentStats = new Map<string, any>();

    for (const attendance of attendances) {
      const studentId = attendance.studentId;

      if (!studentStats.has(studentId)) {
        studentStats.set(studentId, {
          student: attendance.student,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          total: 0,
        });
      }

      const stats = studentStats.get(studentId);
      stats.total++;

      switch (attendance.status) {
        case AttendanceStatus.PRESENT:
          stats.present++;
          break;
        case AttendanceStatus.ABSENT:
          stats.absent++;
          break;
        case AttendanceStatus.LATE:
          stats.late++;
          break;
        case AttendanceStatus.EXCUSED:
          stats.excused++;
          break;
      }
    }

    // Calcular porcentaje de asistencia
    const result = Array.from(studentStats.values()).map((stats) => ({
      ...stats,
      attendanceRate: stats.total > 0 ? ((stats.present + stats.excused) / stats.total * 100).toFixed(2) : '0',
    }));

    return result;
  }
}
