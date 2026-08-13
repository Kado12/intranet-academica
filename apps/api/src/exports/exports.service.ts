import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import { EnrollmentStatus, PaymentStatus } from '@intranet/database';

export interface StudentExportFilters {
  sedeId?: string;
  turnId?: string;
  classroomId?: string;
  sectionId?: string;
  periodId?: string;
  search?: string;
}

export interface PaymentExportFilters {
  sedeId?: string;
  paymentPlanId?: string;
  paymentStatus?: PaymentStatus;
  search?: string;
}

@Injectable()
export class ExportsService {
  private readonly logger = new Logger(ExportsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * EXCEL 1: Lista de alumnos con datos académicos
   * Columnas: Nombre, Apellido, Documento, Sede, Turno, Aula, Sección
   */
  async exportStudentsList(filters: StudentExportFilters): Promise<Buffer> {
    const where: any = {
      status: EnrollmentStatus.ACTIVE,
    };

    // Filtro por sede
    if (filters.sedeId) {
      where.section = {
        classroom: { sedeId: filters.sedeId },
      };
    }

    // Filtro por salón (NUEVO)
    if (filters.classroomId) {
      where.section = {
        ...(where.section || {}),
        classroomId: filters.classroomId,
      };
    }

    // Filtro por turno
    if (filters.turnId) {
      where.section = {
        ...(where.section || {}),
        turnId: filters.turnId,
      };
    }

    // Filtro por sección
    if (filters.sectionId) {
      where.sectionId = filters.sectionId;
    }

    // Filtro por período
    if (filters.periodId) {
      where.section = {
        ...(where.section || {}),
        periodId: filters.periodId,
      };
    }

    // Búsqueda por texto
    if (filters.search) {
      where.student = {
        profile: {
          OR: [
            { firstName: { contains: filters.search } },
            { lastName: { contains: filters.search } },
            { documentNumber: { contains: filters.search } },
          ],
        },
      };
    }

    // 2. Obtener datos
    const enrollments = await this.prisma.enrollment.findMany({
      where,
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: {
              include: { sede: true },
            },
            turn: true,
          },
        },
      },
      orderBy: [
        { student: { profile: { lastName: 'asc' } } },
        { student: { profile: { firstName: 'asc' } } },
      ],
    });

    // 3. Crear workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Intranet Académica';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Lista de Alumnos', {
      views: [{ state: 'frozen', ySplit: 1 }], // Congelar primera fila
    });

    // 4. Definir columnas
    worksheet.columns = [
      { header: 'N°', key: 'index', width: 6 },
      { header: 'Nombre', key: 'firstName', width: 25 },
      { header: 'Apellido', key: 'lastName', width: 25 },
      { header: 'Documento', key: 'document', width: 15 },
      { header: 'Sede', key: 'sede', width: 20 },
      { header: 'Turno', key: 'turn', width: 15 },
      { header: 'Aula', key: 'classroom', width: 15 },
      { header: 'Sección', key: 'section', width: 15 },
    ];

    // 5. Estilo del encabezado
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2563EB' }, // Azul
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 25;

    // 6. Agregar datos
    enrollments.forEach((enrollment, index) => {
      worksheet.addRow({
        index: index + 1,
        firstName: enrollment.student.profile?.firstName || '',
        lastName: enrollment.student.profile?.lastName || '',
        document: enrollment.student.profile?.documentNumber || '',
        sede: enrollment.section.classroom?.sede?.name || '',
        turn: enrollment.section.turn?.name || '',
        classroom: enrollment.section.classroom?.name || '',
        section: enrollment.section.name || '',
      });
    });

    // 7. Bordes en todas las celdas
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    // 8. Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * EXCEL 2: Lista de alumnos con plan y estado de pago
   * Columnas: Nombre, Apellido, Documento, Sección, Plan de Pago, Estado de Pago
   */
  async exportPaymentStatus(filters: PaymentExportFilters): Promise<Buffer> {
    const where: any = {
      status: EnrollmentStatus.ACTIVE,
    };

    if (filters.sedeId) {
      where.section = {
        classroom: { sedeId: filters.sedeId },
      };
    }

    if (filters.paymentPlanId) {
      where.paymentPlanId = filters.paymentPlanId;
    }

    if (filters.search) {
      where.student = {
        profile: {
          OR: [
            { firstName: { contains: filters.search } },
            { lastName: { contains: filters.search } },
            { documentNumber: { contains: filters.search } },
          ],
        },
      };
    }

    const enrollments = await this.prisma.enrollment.findMany({
      where,
      include: {
        student: {
          include: { profile: true },
        },
        section: {
          include: {
            classroom: { include: { sede: true } },
          },
        },
        paymentPlan: true,
        paymentRecords: true,
      },
      orderBy: [
        { student: { profile: { lastName: 'asc' } } },
        { student: { profile: { firstName: 'asc' } } },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Intranet Académica';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Estado de Pagos', {
      views: [{ state: 'frozen', ySplit: 1 }],
    });

    worksheet.columns = [
      { header: 'N°', key: 'index', width: 6 },
      { header: 'Nombre', key: 'firstName', width: 25 },
      { header: 'Apellido', key: 'lastName', width: 25 },
      { header: 'Documento', key: 'document', width: 15 },
      { header: 'Sección', key: 'section', width: 15 },
      { header: 'Plan de Pago', key: 'paymentPlan', width: 25 },
      { header: 'Monto Total', key: 'totalAmount', width: 15 },
      { header: 'Monto Pagado', key: 'paidAmount', width: 15 },
      { header: 'Monto Pendiente', key: 'pendingAmount', width: 15 },
      { header: 'Estado', key: 'status', width: 15 },
    ];

    // Encabezado
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF16A34A' }, // Verde
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 25;

    // Datos
    enrollments.forEach((enrollment, index) => {
      const totalAmount = enrollment.paymentPlan?.finalAmount || 0;
      const paidAmount = enrollment.paymentRecords
        .filter(p => p.status === PaymentStatus.PAID)
        .reduce((sum, p) => sum + p.amount, 0);
      const pendingAmount = totalAmount - paidAmount;

      let status = 'PENDIENTE';
      if (paidAmount >= totalAmount) {
        status = 'PAGADO';
      } else if (paidAmount > 0) {
        status = 'PARCIAL';
      }

      const row = worksheet.addRow({
        index: index + 1,
        firstName: enrollment.student.profile?.firstName || '',
        lastName: enrollment.student.profile?.lastName || '',
        document: enrollment.student.profile?.documentNumber || '',
        section: enrollment.section.name || '',
        paymentPlan: enrollment.paymentPlan?.name || 'Sin plan',
        totalAmount: totalAmount,
        paidAmount: paidAmount,
        pendingAmount: pendingAmount,
        status: status,
      });

      // Colorear según estado
      const statusCell = row.getCell('status');
      if (status === 'PAGADO') {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFDCFCE7' }, // Verde claro
        };
        statusCell.font = { color: { argb: 'FF166534' }, bold: true };
      } else if (status === 'PARCIAL') {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFEF3C7' }, // Amarillo claro
        };
        statusCell.font = { color: { argb: 'FF92400E' }, bold: true };
      } else {
        statusCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFEE2E2' }, // Rojo claro
        };
        statusCell.font = { color: { argb: 'FF991B1B' }, bold: true };
      }

      // Formato de moneda
      row.getCell('totalAmount').numFmt = 'S/ #,##0.00';
      row.getCell('paidAmount').numFmt = 'S/ #,##0.00';
      row.getCell('pendingAmount').numFmt = 'S/ #,##0.00';
    });

    // Bordes
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * EXCEL 3: Resumen de alumnos por sección, sede y turno
   */
  async exportSummary(): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Intranet Académica';
    workbook.created = new Date();

    // ===== HOJA 1: POR SECCIÓN =====
    const sectionSheet = workbook.addWorksheet('Por Sección');

    const sections = await this.prisma.section.findMany({
      where: { isActive: true },
      include: {
        classroom: { include: { sede: true } },
        turn: true,
        period: true,
        enrollments: {
          where: { status: EnrollmentStatus.ACTIVE },
        },
      },
      orderBy: [
        { classroom: { sede: { name: 'asc' } } },
        { name: 'asc' },
      ],
    });

    sectionSheet.columns = [
      { header: 'N°', key: 'index', width: 6 },
      { header: 'Sección', key: 'section', width: 20 },
      { header: 'Aula', key: 'classroom', width: 15 },
      { header: 'Sede', key: 'sede', width: 20 },
      { header: 'Turno', key: 'turn', width: 15 },
      { header: 'Período', key: 'period', width: 15 },
      { header: 'Capacidad', key: 'capacity', width: 12 },
      { header: 'Matriculados', key: 'enrolled', width: 12 },
      { header: 'Disponibles', key: 'available', width: 12 },
      { header: '% Ocupación', key: 'occupancy', width: 12 },
    ];

    this.styleHeader(sectionSheet, 'FF7C3AED'); // Morado

    sections.forEach((section, index) => {
      const capacity = section.capacity || 30;
      const enrolled = section.enrollments.length;
      const available = capacity - enrolled;
      const occupancy = capacity > 0 ? (enrolled / capacity) * 100 : 0;

      const row = sectionSheet.addRow({
        index: index + 1,
        section: section.name,
        classroom: section.classroom?.name || '',
        sede: section.classroom?.sede?.name || '',
        turn: section.turn?.name || '',
        period: section.period?.name || '',
        capacity,
        enrolled,
        available,
        occupancy: occupancy / 100,
      });

      row.getCell('occupancy').numFmt = '0.0%';

      // Colorear según ocupación
      const occupancyCell = row.getCell('occupancy');
      if (occupancy >= 90) {
        occupancyCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFEE2E2' },
        };
      } else if (occupancy >= 70) {
        occupancyCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFEF3C7' },
        };
      } else {
        occupancyCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFDCFCE7' },
        };
      }
    });

    this.addBorders(sectionSheet);

    // ===== HOJA 2: POR SEDE =====
    const sedeSheet = workbook.addWorksheet('Por Sede');

    const sedes = await this.prisma.sede.findMany({
      where: { isActive: true },
      include: {
        classrooms: {
          include: {
            sections: {
              include: {
                enrollments: {
                  where: { status: EnrollmentStatus.ACTIVE },
                },
              },
            },
          },
        },
      },
    });

    sedeSheet.columns = [
      { header: 'N°', key: 'index', width: 6 },
      { header: 'Sede', key: 'sede', width: 25 },
      { header: 'Salones', key: 'classrooms', width: 12 },
      { header: 'Secciones', key: 'sections', width: 12 },
      { header: 'Alumnos', key: 'students', width: 12 },
      { header: 'Capacidad Total', key: 'totalCapacity', width: 15 },
      { header: '% Ocupación', key: 'occupancy', width: 12 },
    ];

    this.styleHeader(sedeSheet, 'FF0891B2'); // Cian

    sedes.forEach((sede, index) => {
      let totalClassrooms = 0;
      let totalSections = 0;
      let totalStudents = 0;
      let totalCapacity = 0;

      for (const classroom of sede.classrooms) {
        totalClassrooms++;
        for (const section of classroom.sections) {
          totalSections++;
          totalStudents += section.enrollments.length;
          totalCapacity += section.capacity || 30;
        }
      }

      const occupancy = totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;

      const row = sedeSheet.addRow({
        index: index + 1,
        sede: sede.name,
        classrooms: totalClassrooms,
        sections: totalSections,
        students: totalStudents,
        totalCapacity,
        occupancy: occupancy / 100,
      });

      row.getCell('occupancy').numFmt = '0.0%';
    });

    this.addBorders(sedeSheet);

    // ===== HOJA 3: POR TURNO =====
    const turnSheet = workbook.addWorksheet('Por Turno');

    const turns = await this.prisma.turn.findMany({
      include: {
        sections: {
          include: {
            enrollments: {
              where: { status: EnrollmentStatus.ACTIVE },
            },
          },
        },
      },
    });

    turnSheet.columns = [
      { header: 'N°', key: 'index', width: 6 },
      { header: 'Turno', key: 'turn', width: 20 },
      { header: 'Secciones', key: 'sections', width: 12 },
      { header: 'Alumnos', key: 'students', width: 12 },
      { header: 'Capacidad Total', key: 'totalCapacity', width: 15 },
      { header: '% Ocupación', key: 'occupancy', width: 12 },
    ];

    this.styleHeader(turnSheet, 'FFEA580C'); // Naranja

    turns.forEach((turn, index) => {
      let totalSections = 0;
      let totalStudents = 0;
      let totalCapacity = 0;

      for (const section of turn.sections) {
        totalSections++;
        totalStudents += section.enrollments.length;
        totalCapacity += section.capacity || 30;
      }

      const occupancy = totalCapacity > 0 ? (totalStudents / totalCapacity) * 100 : 0;

      const row = turnSheet.addRow({
        index: index + 1,
        turn: turn.name,
        sections: totalSections,
        students: totalStudents,
        totalCapacity,
        occupancy: occupancy / 100,
      });

      row.getCell('occupancy').numFmt = '0.0%';
    });

    this.addBorders(turnSheet);

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  // ===== HELPERS =====

  private styleHeader(worksheet: ExcelJS.Worksheet, color: string) {
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 25;
  }

  private addBorders(worksheet: ExcelJS.Worksheet) {
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });
  }
}
