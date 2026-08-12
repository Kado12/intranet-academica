import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../../common/audit/audit.service';
import { CreateTeacherAttendanceDto } from './dto/create-teacher-attendance.dto';
import { ExcuseTeacherAttendanceDto } from './dto/excuse-teacher-attendance.dto';
import { TeacherAttendanceStatus, AuditAction, AuditEntity, Role } from '@intranet/database';

@Injectable()
export class TeacherAttendanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Registrar asistencia masiva de docentes
   */
  async createBulkAttendance(createDto: CreateTeacherAttendanceDto, registeredById: string) {
    const { date, sedeId, attendances } = createDto;
    const attendanceDate = new Date(date);

    // Verificar que todos los docentes existan y tengan el rol correcto
    for (const attendance of attendances) {
      const teacher = await this.prisma.user.findUnique({
        where: { id: attendance.teacherId },
        include: {
          memberships: {
            where: { status: 'ACTIVE' },
          },
        },
      });

      if (!teacher) {
        throw new NotFoundException(`Docente no encontrado: ${attendance.teacherId}`);
      }

      const isTeacher = teacher.memberships.some(
        (m) => m.role === Role.DOCENTE || m.role === Role.COORDINADOR,
      );

      if (!isTeacher) {
        throw new BadRequestException(`El usuario ${teacher.email} no es docente ni coordinador`);
      }
    }

    // Crear o actualizar asistencias
    const results = await Promise.all(
      attendances.map(async (attendance) => {
        return this.prisma.teacherAttendance.upsert({
          where: {
            teacherId_date: {
              teacherId: attendance.teacherId,
              date: attendanceDate,
            },
          },
          update: {
            status: attendance.status,
            notes: attendance.notes,
            registeredById,
          },
          create: {
            teacherId: attendance.teacherId,
            date: attendanceDate,
            status: attendance.status,
            notes: attendance.notes,
            sedeId,
            registeredById,
          },
        });
      }),
    );

    // Auditoría
    await this.auditService.log({
      action: AuditAction.CREATE,
      entity: AuditEntity.USER,
      entityId: `teacher-attendance-${date}`,
      entityName: `Asistencia docentes ${date}`,
      newData: {
        date,
        sedeId,
        count: results.length,
      },
      userId: registeredById,
    });

    return {
      message: `${results.length} asistencias de docentes registradas correctamente`,
      date,
      count: results.length,
    };
  }

  /**
   * Justificar ausencia de docente
   */
  async excuseAttendance(attendanceId: string, excuseDto: ExcuseTeacherAttendanceDto, excusedById: string) {
    const attendance = await this.prisma.teacherAttendance.findUnique({
      where: { id: attendanceId },
    });

    if (!attendance) {
      throw new NotFoundException('Asistencia no encontrada');
    }

    if (attendance.status !== TeacherAttendanceStatus.ABSENT) {
      throw new BadRequestException('Solo se pueden justificar ausencias');
    }

    return this.prisma.teacherAttendance.update({
      where: { id: attendanceId },
      data: {
        status: TeacherAttendanceStatus.EXCUSED,
        excuseNote: excuseDto.excuseNote,
        excuseDate: new Date(),
        registeredById: excusedById,
      },
      include: {
        teacher: {
          include: { profile: true },
        },
      },
    });
  }

  /**
   * Obtener asistencia de docentes por fecha
   */
  async findByDate(date: string, sedeId?: string) {
    const attendanceDate = new Date(date);

    const where: any = { date: attendanceDate };
    if (sedeId) where.sedeId = sedeId;

    return this.prisma.teacherAttendance.findMany({
      where,
      include: {
        teacher: {
          include: { profile: true },
        },
        sede: true,
      },
      orderBy: {
        teacher: {
          profile: {
            firstName: 'asc',
          },
        },
      },
    });
  }

  /**
   * Obtener asistencia de un docente específico
   */
  async findByTeacher(teacherId: string, startDate?: string, endDate?: string) {
    const where: any = { teacherId };

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    return await this.prisma.teacherAttendance.findMany({
      where,
      include: {
        sede: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  /**
   * Obtener estadísticas de un docente
   */
  async getTeacherStats(teacherId: string) {
    const attendances = await this.prisma.teacherAttendance.findMany({
      where: { teacherId },
      select: { status: true },
    });

    const total = attendances.length;
    const present = attendances.filter(a => a.status === TeacherAttendanceStatus.PRESENT).length;
    const absent = attendances.filter(a => a.status === TeacherAttendanceStatus.ABSENT).length;
    const late = attendances.filter(a => a.status === TeacherAttendanceStatus.LATE).length;
    const excused = attendances.filter(a => a.status === TeacherAttendanceStatus.EXCUSED).length;
    const vacation = attendances.filter(a => a.status === TeacherAttendanceStatus.VACATION).length;
    const sickLeave = attendances.filter(a => a.status === TeacherAttendanceStatus.SICK_LEAVE).length;

    return {
      total,
      present,
      absent,
      late,
      excused,
      vacation,
      sickLeave,
      attendanceRate: total > 0 ? ((present + excused + vacation + sickLeave) / total * 100).toFixed(2) : '0',
    };
  }

  /**
   * Obtener reporte de asistencia de docentes
   */
  async getReport(sedeId?: string, startDate?: string, endDate?: string) {
    const where: any = {};

    if (sedeId) where.sedeId = sedeId;

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const attendances = await this.prisma.teacherAttendance.findMany({
      where,
      include: {
        teacher: {
          include: { profile: true },
        },
      },
    });

    // Agrupar por docente
    const teacherStats = new Map<string, any>();

    for (const attendance of attendances) {
      const teacherId = attendance.teacherId;

      if (!teacherStats.has(teacherId)) {
        teacherStats.set(teacherId, {
          teacher: attendance.teacher,
          present: 0,
          absent: 0,
          late: 0,
          excused: 0,
          vacation: 0,
          sickLeave: 0,
          total: 0,
        });
      }

      const stats = teacherStats.get(teacherId);
      stats.total++;

      switch (attendance.status) {
        case TeacherAttendanceStatus.PRESENT:
          stats.present++;
          break;
        case TeacherAttendanceStatus.ABSENT:
          stats.absent++;
          break;
        case TeacherAttendanceStatus.LATE:
          stats.late++;
          break;
        case TeacherAttendanceStatus.EXCUSED:
          stats.excused++;
          break;
        case TeacherAttendanceStatus.VACATION:
          stats.vacation++;
          break;
        case TeacherAttendanceStatus.SICK_LEAVE:
          stats.sickLeave++;
          break;
      }
    }

    // Calcular porcentaje de asistencia
    const result = Array.from(teacherStats.values()).map((stats) => ({
      ...stats,
      attendanceRate:
        stats.total > 0 
          ? ((stats.present + stats.excused + stats.vacation + stats.sickLeave) / stats.total * 100).toFixed(2) 
          : '0',
    }));

    return result;
  }
}
