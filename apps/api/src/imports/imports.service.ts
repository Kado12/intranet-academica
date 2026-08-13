import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { AuditService } from '../common/audit/audit.service';
import * as ExcelJS from 'exceljs';
import * as bcrypt from 'bcrypt';
import {
  Role,
  EnrollmentStatus,
  PaymentStatus,
  AuditAction,
  AuditEntity,
} from '@intranet/database';

export interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: { row: number; reason: string; data?: any }[];
  created: any[];
}

@Injectable()
export class ImportsService {
  private readonly logger = new Logger(ImportsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly auditService: AuditService,
  ) {}

  // ===== GENERACIÓN DE PLANTILLAS =====

  /**
   * Genera plantilla Excel para importación de alumnos
   */
  async generateStudentsTemplate(): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Alumnos', {
      views: [{ state: 'frozen', ySplit: 2 }],
    });

    // Fila 1: Encabezados
    worksheet.columns = [
      { header: 'Nombre', key: 'firstName', width: 20 },
      { header: 'Apellido', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Tipo Doc.', key: 'documentType', width: 12 },
      { header: 'Número Doc.', key: 'documentNumber', width: 15 },
      { header: 'Fecha Nac.', key: 'birthDate', width: 12 },
      { header: 'Género (M/F/Otro)', key: 'gender', width: 15 },
      { header: 'Teléfono', key: 'phone', width: 15 },
      { header: 'Dirección', key: 'address', width: 30 },
      { header: 'Sede', key: 'sede', width: 20 },
      { header: 'Turno', key: 'turn', width: 15 },
      { header: 'Salón', key: 'classroom', width: 15 },
      { header: 'Sección (opcional)', key: 'section', width: 15 },
      { header: 'Plan de Pago', key: 'paymentPlan', width: 25 },
      { header: 'Primer Pago (SI/NO)', key: 'firstPaymentDone', width: 18 },
    ];

    // Estilo encabezado
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2563EB' },
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).height = 25;

    // Fila 2: Notas explicativas
    const notes = worksheet.getRow(2);
    notes.getCell(1).value = 'Obligatorio';
    notes.getCell(2).value = 'Obligatorio';
    notes.getCell(3).value = 'Obligatorio - único';
    notes.getCell(4).value = 'DNI, CE, Pasaporte';
    notes.getCell(5).value = 'Obligatorio - único';
    notes.getCell(6).value = 'YYYY-MM-DD';
    notes.getCell(7).value = 'M, F u Otro';
    notes.getCell(8).value = 'Opcional';
    notes.getCell(9).value = 'Opcional';
    notes.getCell(10).value = 'Nombre exacto de la sede';
    notes.getCell(11).value = 'Nombre exacto del turno';
    notes.getCell(12).value = 'Nombre exacto del salón';
    notes.getCell(13).value = 'Si vacío, se auto-asigna';
    notes.getCell(14).value = 'Nombre exacto del plan';
    notes.getCell(15).value = 'SI o NO';

    notes.font = { italic: true, size: 9, color: { argb: 'FF6B7280' } };
    notes.height = 20;

    // Fila 3: Ejemplo
    worksheet.addRow({
      firstName: 'Juan',
      lastName: 'Pérez García',
      email: 'juan.perez@email.com',
      documentType: 'DNI',
      documentNumber: '12345678',
      birthDate: '2008-05-15',
      gender: 'M',
      phone: '+51 999 999 999',
      address: 'Av. Principal 123',
      sede: 'Sede Central',
      turn: 'Mañana',
      classroom: 'A11',
      section: 'A11-M',
      paymentPlan: 'Pago Completo',
      firstPaymentDone: 'SI',
    });

    const exampleRow = worksheet.getRow(3);
    exampleRow.font = { color: { argb: 'FF9CA3AF' } };

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
   * Genera plantilla para importación de salones
   */
  async generateClassroomsTemplate(): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Salones');

    worksheet.columns = [
      { header: 'Nombre', key: 'name', width: 20 },
      { header: 'Sede', key: 'sede', width: 25 },
      { header: 'Capacidad', key: 'capacity', width: 12 },
    ];

    this.styleHeader(worksheet, 'FF7C3AED');

    worksheet.addRow({ name: 'A11', sede: 'Sede Central', capacity: 30 });
    worksheet.addRow({ name: 'A12', sede: 'Sede Central', capacity: 25 });

    this.addBorders(worksheet);

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  /**
   * Genera plantilla para importación de secciones
   */
  async generateSectionsTemplate(): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Secciones');

    worksheet.columns = [
      { header: 'Nombre', key: 'name', width: 15 },
      { header: 'Salón', key: 'classroom', width: 15 },
      { header: 'Sede', key: 'sede', width: 20 },
      { header: 'Turno', key: 'turn', width: 15 },
      { header: 'Período', key: 'period', width: 15 },
      { header: 'Capacidad', key: 'capacity', width: 12 },
      { header: 'Prioridad', key: 'priority', width: 12 },
    ];

    this.styleHeader(worksheet, 'FF0891B2');

    worksheet.addRow({
      name: 'A11-M',
      classroom: 'A11',
      sede: 'Sede Central',
      turn: 'Mañana',
      period: '2026-I',
      capacity: 30,
      priority: 1,
    });

    this.addBorders(worksheet);

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }

  // ===== IMPORTACIÓN DE ALUMNOS =====

  async importStudents(fileBuffer: Buffer | ArrayBuffer, adminId: string): Promise<ImportResult> {
    const result: ImportResult = {
      total: 0,
      successful: 0,
      failed: 0,
      errors: [],
      created: [],
    };

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileBuffer as ArrayBuffer);

      const worksheet = workbook.getWorksheet(1) || workbook.worksheets[0];
      if (!worksheet) {
        throw new BadRequestException('El archivo Excel no tiene hojas válidas');
      }

      // Obtener encabezados (fila 1) - eachCell está bien aquí porque es síncrono
      const headerRow = worksheet.getRow(1);
      const headers: string[] = [];
      headerRow.eachCell((cell, colNumber) => {
        headers[colNumber - 1] = String(cell.value || '').trim();
      });

      // Mapeo de columnas esperadas
      const columnMap: Record<string, number> = {};
      const expectedColumns = [
        'Nombre',
        'Apellido',
        'Email',
        'Tipo Doc.',
        'Número Doc.',
        'Fecha Nac.',
        'Género (M/F/Otro)',
        'Teléfono',
        'Dirección',
        'Sede',
        'Turno',
        'Salón',
        'Sección (opcional)',
        'Plan de Pago',
        'Primer Pago (SI/NO)',
      ];

      expectedColumns.forEach((col) => {
        const index = headers.findIndex(
          (h) => h.toLowerCase() === col.toLowerCase(),
        );
        if (index !== -1) {
          columnMap[col] = index;
        }
      });

      // Precargar datos de referencia
      const [sedes, turns, classrooms, sections, paymentPlans] =
        await Promise.all([
          this.prisma.sede.findMany({ where: { isActive: true } }),
          this.prisma.turn.findMany(),
          this.prisma.classroom.findMany({
            where: { isActive: true },
            include: { sede: true },
          }),
          this.prisma.section.findMany({
            where: { isActive: true },
            include: {
              classroom: true,
              turn: true,
              period: true,
            },
          }),
          this.prisma.paymentPlan.findMany({ where: { isActive: true } }),
        ]);

      // ✅ USAR for loop en lugar de eachRow
      const totalRows = worksheet.rowCount;

      for (let rowIndex = 3; rowIndex <= totalRows; rowIndex++) {
        const row = worksheet.getRow(rowIndex);

        // Saltar filas vacías
        if (!row || row.cellCount === 0) continue;

        result.total++;

        try {
          const rowData = this.parseStudentRow(row, columnMap);

          // Fila vacía o sin datos relevantes
          if (!rowData) {
            result.total--; // No contar filas vacías
            continue;
          }

          // Validaciones
          const validation = this.validateStudentRow(
            rowData,
            sedes,
            turns,
            classrooms,
            sections,
            paymentPlans,
          );

          if (!validation.valid) {
            result.failed++;
            result.errors.push({
              row: rowIndex,
              reason: validation.error!,
              data: rowData,
            });
            continue;
          }

          result.created.push({
            row: rowIndex,
            data: validation.data,
          });
        } catch (error: any) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: error.message,
          });
        }
        console.log(result);
      }

      // Crear todos los estudiantes válidos en transacción
      if (result.created.length > 0) {
        await this.prisma.$transaction(async (tx) => {
          for (const item of result.created) {
            try {
              const student = await this.createStudentFromImport(
                tx,
                item.data,
                paymentPlans,
                sections,
              );
              result.successful++;
              item.data = { ...item.data, studentId: student.id };
            } catch (error: any) {
              result.failed++;
              result.errors.push({
                row: item.row,
                reason: `Error al crear: ${error.message}`,
                data: item.data,
              });
            }
          }
        });

        // Auditoría
        await this.auditService.log({
          action: AuditAction.CREATE,
          entity: AuditEntity.USER,
          entityName: 'Importación masiva de estudiantes',
          newData: {
            total: result.total,
            successful: result.successful,
            failed: result.failed,
          },
          userId: adminId,
        });
      }

      return result;
    } catch (error: any) {
      this.logger.error(`Error en importación: ${error.message}`, error.stack);
      throw new BadRequestException(`Error al procesar el archivo: ${error.message}`);
    }
  }

  private parseStudentRow(row: ExcelJS.Row, columnMap: Record<string, number>): any | null {
    const getValue = (col: string): string => {
      const index = columnMap[col];
      if (index === undefined) return '';
      const cell = row.getCell(index + 1);
      const value = cell.value;
      
      if (value === null || value === undefined) return '';
      if (typeof value === 'object' && 'result' in value)
        return String((value as any).result);
      if (value instanceof Date) {
        return value.toISOString().split('T')[0];
      }
      return String(value).trim();
    };

    const firstName = getValue('Nombre');
    const lastName = getValue('Apellido');
    const email = getValue('Email');
    const documentNumber = getValue('Número Doc.');

    // Fila vacía
    if (!firstName && !lastName && !email && !documentNumber) {
      return null;
    }

    return {
      firstName,
      lastName,
      email: email.toLowerCase(),
      documentType: getValue('Tipo Doc.') || 'DNI',
      documentNumber,
      birthDate: getValue('Fecha Nac.') || null,
      gender: getValue('Género (M/F/Otro)') || null,
      phone: getValue('Teléfono') || null,
      address: getValue('Dirección') || null,
      sedeName: getValue('Sede'),
      turnName: getValue('Turno'),
      classroomName: getValue('Salón'),
      sectionName: getValue('Sección (opcional)'),
      paymentPlanName: getValue('Plan de Pago'),
      firstPaymentDone: getValue('Primer Pago (SI/NO)').toUpperCase() === 'SI',
    };
  }

  private validateStudentRow(
    data: any,
    sedes: any[],
    turns: any[],
    classrooms: any[],
    sections: any[],
    paymentPlans: any[],
  ): { valid: boolean; error?: string; data?: any } {
    // Validaciones básicas
    if (!data.firstName) return { valid: false, error: 'Nombre es requerido' };
    if (!data.lastName) return { valid: false, error: 'Apellido es requerido' };
    if (!data.email) return { valid: false, error: 'Email es requerido' };
    if (!data.documentNumber) return { valid: false, error: 'Número de documento es requerido' };

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { valid: false, error: `Email inválido: ${data.email}` };
    }

    // Buscar sede
    const sede = sedes.find((s) => s.name.toLowerCase() === data.sedeName.toLowerCase());
    if (!sede) {
      return { valid: false, error: `Sede no encontrada: ${data.sedeName}` };
    }

    // Buscar turno
    const turn = turns.find((t) => t.name.toLowerCase() === data.turnName.toLowerCase());
    if (!turn) {
      return { valid: false, error: `Turno no encontrado: ${data.turnName}` };
    }

    // Buscar salón
    const classroom = classrooms.find(c => 
      c.name.toLowerCase() === data.classroomName.toLowerCase() && c.sedeId === sede.id
    );
    if (!classroom) {
      return { valid: false, error: `Salón no encontrado: ${data.classroomName} en ${data.sedeName}` };
    }

    // Buscar plan de pago
    const paymentPlan = paymentPlans.find(p => 
      p.name.toLowerCase() === data.paymentPlanName.toLowerCase()
    );
    if (!paymentPlan) {
      return { valid: false, error: `Plan de pago no encontrado: ${data.paymentPlanName}` };
    }

    // Buscar sección (puede estar vacía - se auto-asignará)
    let section: any = null;
    if (data.sectionName) {
      section = sections.find((s) => 
        s.name.toLowerCase() === data.sectionName.toLowerCase() &&
        s.classroomId === classroom.id &&
        s.turnId === turn.id,
      );
      if (!section) {
        return {
          valid: false,
          error: `Sección no encontrada: ${data.sectionName} en salón ${data.classroomName}, turno ${data.turnName}` 
        };
      }
    }

    return {
      valid: true,
      data: {
        ...data,
        sede,
        turn,
        classroom,
        section,
        paymentPlan,
      },
    };
  }

  private async createStudentFromImport(
    tx: any,
    data: any,
    paymentPlans: any[],
    sections: any[],
  ): Promise<any> {
    // Verificar que email y DNI no existan
    const existingEmail = await tx.user.findUnique({ where: { email: data.email } });
    if (existingEmail) {
      throw new Error(`El email ${data.email} ya existe`);
    }

    const existingDoc = await tx.profile.findUnique({ 
      where: { documentNumber: data.documentNumber } 
    });
    if (existingDoc) {
      throw new Error(`El documento ${data.documentNumber} ya existe`);
    }

    // Auto-asignar sección si no se especificó
    let sectionId = data.section?.id;
    if (!sectionId) {
      const availableSections = sections.filter(
        (s) =>
          s.classroomId === data.classroom.id &&
          s.turnId === data.turn.id &&
          s.isActive
      );

      // Buscar primera con cupo
      for (const section of availableSections) {
        const enrollmentCount = await tx.enrollment.count({
          where: { sectionId: section.id, status: EnrollmentStatus.ACTIVE },
        });
        if (enrollmentCount < (section.capacity || 30)) {
          sectionId = section.id;
          break;
        }
      }

      if (!sectionId) {
        throw new Error(
          `No hay cupo disponible en ${data.classroom.name} - ${data.turn.name}`,
        );
      }
    }

    // Generar contraseña automática
    const password = `${data.firstName.charAt(0).toUpperCase()}_${data.documentNumber}`;
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await tx.user.create({
      data: {
        email: data.email,
        passwordHash,
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
            documentType: data.documentType,
            documentNumber: data.documentNumber,
            birthDate: data.birthDate ? new Date(data.birthDate) : null,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
          },
        },
        memberships: {
          create: {
            role: Role.ESTUDIANTE,
            status: 'ACTIVE',
            sedeId: data.sede.id,
          },
        },
      },
    });

    // Crear matrícula
    const enrollment = await tx.enrollment.create({
      data: {
        studentId: user.id,
        sectionId,
        status: EnrollmentStatus.ACTIVE,
        paymentPlanId: data.paymentPlan.id,
      },
    });

    // Crear registros de pago
    await this.createPaymentRecordsForImport(
      tx,
      enrollment.id,
      data.paymentPlan,
      data.firstPaymentDone,
    );

    return user;
  }

  private async createPaymentRecordsForImport(
    tx: any,
    enrollmentId: string,
    paymentPlan: any,
    firstPaymentDone: boolean,
  ) {
    const now = new Date();
    const records: any[] = [];

    if (paymentPlan.installments && paymentPlan.installments > 1) {
      const amountPerInstallment = paymentPlan.finalAmount / paymentPlan.installments;
      for (let i = 1; i <= paymentPlan.installments; i++) {
        const dueDate = new Date(now);
        dueDate.setMonth(dueDate.getMonth() + (i - 1));
        dueDate.setDate(15);

        const isPaid = firstPaymentDone && i === 1;

        records.push({
          enrollmentId,
          amount: Math.round(amountPerInstallment * 100) / 100,
          installmentNumber: i,
          totalInstallments: paymentPlan.installments,
          status: isPaid ? PaymentStatus.PAID : PaymentStatus.PENDING,
          dueDate,
          paidAt: isPaid ? new Date() : null,
          paymentMethod: isPaid ? 'Importación masiva' : null,
        });
      }
    } else {
      records.push({
        enrollmentId,
        amount: paymentPlan.finalAmount,
        status: firstPaymentDone ? PaymentStatus.PAID : PaymentStatus.PENDING,
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        paidAt: firstPaymentDone ? new Date() : null,
        paymentMethod: firstPaymentDone ? 'Importación masiva' : null,
      });
    }

    await tx.paymentRecord.createMany({ data: records });
  }

  // ===== IMPORTACIÓN DE SALONES =====

  async importClassrooms(
    fileBuffer: Buffer | ArrayBuffer,
    adminId: string,
  ): Promise<ImportResult> {
    const result: ImportResult = {
      total: 0,
      successful: 0,
      failed: 0,
      errors: [],
      created: [],
    };

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileBuffer as ArrayBuffer);
      const worksheet = workbook.getWorksheet(1) || workbook.worksheets[0];

      if (!worksheet) {
        throw new BadRequestException(
          'El archivo Excel no tiene hojas válidas',
        );
      }

      const sedes = await this.prisma.sede.findMany({
        where: { isActive: true },
      });

      // ✅ USAR for...of en lugar de eachRow
      const rows = worksheet.getRows(2, worksheet.rowCount - 1) || [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowIndex = i + 2; // Fila 2 en adelante (1 es encabezado)

        if (!row) continue;

        result.total++;

        const name = String(row.getCell(1).value || '').trim();
        const sedeName = String(row.getCell(2).value || '').trim();
        const capacityStr = String(row.getCell(3).value || '').trim();

        // Validar campos requeridos
        if (!name || !sedeName) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: 'Nombre y Sede son requeridos',
          });
          continue;
        }

        // Buscar sede
        const sede = sedes.find(
          (s) => s.name.toLowerCase() === sedeName.toLowerCase(),
        );
        if (!sede) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: `Sede no encontrada: ${sedeName}`,
          });
          continue;
        }

        // Verificar duplicado
        const existing = await this.prisma.classroom.findFirst({
          where: { name, sedeId: sede.id },
        });

        if (existing) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: `Ya existe un salón ${name} en ${sedeName}`,
          });
          continue;
        }

        // Crear el salón
        try {
          await this.prisma.classroom.create({
            data: {
              name,
              sedeId: sede.id,
              capacity: capacityStr ? parseInt(capacityStr) : 30,
            },
          });
          result.successful++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({ row: rowIndex, reason: error.message });
        }
      }

      return result;
    } catch (error: any) {
      throw new BadRequestException(`Error al procesar archivo: ${error.message}`);
    }
  }

  // ===== IMPORTACIÓN DE SECCIONES =====

  async importSections(
    fileBuffer: Buffer | ArrayBuffer,
    adminId: string,
  ): Promise<ImportResult> {
    const result: ImportResult = {
      total: 0,
      successful: 0,
      failed: 0,
      errors: [],
      created: [],
    };

    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileBuffer as ArrayBuffer);
      const worksheet = workbook.getWorksheet(1) || workbook.worksheets[0];

      if (!worksheet) {
        throw new BadRequestException(
          'El archivo Excel no tiene hojas válidas',
        );
      }

      const [classrooms, turns, periods] = await Promise.all([
        this.prisma.classroom.findMany({ where: { isActive: true } }),
        this.prisma.turn.findMany(),
        this.prisma.academicPeriod.findMany(),
      ]);

      const rows = worksheet.getRows(2, worksheet.rowCount - 1) || [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rowIndex = i + 2;

        if (!row) continue;

        result.total++;

        const name = String(row.getCell(1).value || '').trim();
        const classroomName = String(row.getCell(2).value || '').trim();
        const sedeName = String(row.getCell(3).value || '').trim();
        const turnName = String(row.getCell(4).value || '').trim();
        const periodName = String(row.getCell(5).value || '').trim();
        const capacityStr = String(row.getCell(6).value || '').trim();
        const priorityStr = String(row.getCell(7).value || '').trim();

        // Validar campos requeridos
        if (!name || !classroomName || !turnName || !periodName) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: 'Faltan campos obligatorios',
          });
          continue;
        }

        // Buscar referencias
        const classroom = classrooms.find(
          (c) => c.name.toLowerCase() === classroomName.toLowerCase(),
        );
        const turn = turns.find(
          (t) => t.name.toLowerCase() === turnName.toLowerCase(),
        );
        const period = periods.find(
          (p) => p.name.toLowerCase() === periodName.toLowerCase(),
        );

        if (!classroom) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: `Salón no encontrado: ${classroomName}`,
          });
          continue;
        }
        if (!turn) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: `Turno no encontrado: ${turnName}`,
          });
          continue;
        }
        if (!period) {
          result.failed++;
          result.errors.push({
            row: rowIndex,
            reason: `Período no encontrado: ${periodName}`,
          });
          continue;
        }

        // Crear o actualizar sección
        try {
          await this.prisma.section.upsert({
            where: {
              classroomId_turnId_periodId_name: {
                classroomId: classroom.id,
                turnId: turn.id,
                periodId: period.id,
                name,
              },
            },
            update: {
              capacity: capacityStr ? parseInt(capacityStr) : 30,
              priority: priorityStr ? parseInt(priorityStr) : 1,
            },
            create: {
              name,
              classroomId: classroom.id,
              turnId: turn.id,
              periodId: period.id,
              capacity: capacityStr ? parseInt(capacityStr) : 30,
              priority: priorityStr ? parseInt(priorityStr) : 1,
            },
          });
          result.successful++;
        } catch (error: any) {
          result.failed++;
          result.errors.push({ row: rowIndex, reason: error.message });
        }
      }

      return result;
    } catch (error) {
      throw new BadRequestException(`Error al procesar archivo: ${error.message}`);
    }
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
