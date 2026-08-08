import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import PDFDocument from 'pdfkit';

// Dimensiones en puntos (1 punto = 1/72 pulgada)
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;
const HALF_HEIGHT = A4_HEIGHT / 2; // Cada mitad A5

@Injectable()
export class StudentCardService {
  private readonly logger = new Logger(StudentCardService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generar ficha de matrícula en PDF
   * Formato: A4 vertical dividido en dos mitades A5 idénticas
   */
  async generateEnrollmentCardPdf(enrollmentId: string): Promise<Buffer> {
    // 1. Buscar la matrícula con todas sus relaciones
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
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
            period: true,
          },
        },
        paymentPlan: true,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Matrícula no encontrada');
    }

    // 2. Descargar la foto desde Cloudinary
    let imageBuffer: Buffer | null = null;
    const avatarUrl = enrollment.student.profile?.avatarUrl;

    if (avatarUrl) {
      try {
        const response = await fetch(avatarUrl);
        if (response.ok) {
          imageBuffer = Buffer.from(await response.arrayBuffer());
        }
      } catch (error) {
        this.logger.warn(`No se pudo descargar la foto: ${error.message}`);
      }
    }

    // 3. Generar el PDF
    return this.buildPdf(enrollment, imageBuffer);
  }

  /**
   * Construir el PDF A4 con dos fichas A5
   */
  private buildPdf(enrollment: any, imageBuffer: Buffer | null): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 0,
        info: {
          Title: 'Ficha de Matrícula',
          Author: 'Intranet Académica',
        },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Dibujar primera ficha (mitad superior)
      this.drawCard(doc, 0, enrollment, imageBuffer);

      // Línea de corte punteada en el medio
      this.drawCutLine(doc, HALF_HEIGHT);

      // Dibujar segunda ficha (mitad inferior)
      this.drawCard(doc, HALF_HEIGHT, enrollment, imageBuffer);

      doc.end();
    });
  }

  /**
   * Dibujar una ficha A5 completa
   */
  private drawCard(doc: any, yOffset: number, enrollment: any, imageBuffer: Buffer | null) {
    const { student, section, paymentPlan } = enrollment;
    const profile = student.profile;
    const margin = 28;

    // ===== ENCABEZADO =====
    doc
      .fontSize(14)
      .font('Helvetica-Bold')
      .fillColor('#1e3a8a')
      .text('INTRANET ACADÉMICA', margin, yOffset + 22, {
        width: A4_WIDTH - margin * 2,
        align: 'center',
      });

    doc
      .fontSize(9)
      .font('Helvetica')
      .fillColor('#374151')
      .text('FICHA DE MATRÍCULA DEL ESTUDIANTE', {
        width: A4_WIDTH - margin * 2,
        align: 'center',
      });

    // Línea separadora del encabezado
    doc
      .moveTo(margin, yOffset + 58)
      .lineTo(A4_WIDTH - margin, yOffset + 58)
      .strokeColor('#1e3a8a')
      .lineWidth(1.5)
      .stroke();

    // ===== FOTO DEL ESTUDIANTE =====
    const photoW = 140;
    const photoH = 79; // Proporción 16:9
    const photoX = margin;
    const photoY = yOffset + 72;

    if (imageBuffer) {
      try {
        doc.image(imageBuffer, photoX, photoY, {
          width: photoW,
          height: photoH,
          fit: [photoW, photoH],
          align: 'center',
          valign: 'center',
        });
      } catch (error) {
        this.logger.warn('No se pudo insertar la imagen en el PDF');
      }
    }

    // Marco de la foto
    doc
      .rect(photoX, photoY, photoW, photoH)
      .strokeColor('#6b7280')
      .lineWidth(1)
      .stroke();

    if (!imageBuffer) {
      doc
        .fontSize(8)
        .fillColor('#9ca3af')
        .text('SIN FOTO', photoX, photoY + photoH / 2 - 4, {
          width: photoW,
          align: 'center',
        });
    }

    // ===== DATOS PERSONALES (a la derecha de la foto) =====
    const dataX = photoX + photoW + 18;
    const dataWidth = A4_WIDTH - dataX - margin;
    let y = photoY + 2;

    doc
      .fontSize(12)
      .font('Helvetica-Bold')
      .fillColor('#111827')
      .text(`${profile.firstName} ${profile.lastName}`, dataX, y, { width: dataWidth });

    y += 22;
    doc.font('Helvetica').fontSize(9).fillColor('#374151');

    doc.text(`Documento: ${profile.documentType || 'DNI'} ${profile.documentNumber || '-'}`, dataX, y, { width: dataWidth });
    y += 14;

    if (profile.birthDate) {
      doc.text(`Nacimiento: ${new Date(profile.birthDate).toLocaleDateString('es-PE')}`, dataX, y, { width: dataWidth });
      y += 14;
    }

    if (profile.phone) {
      doc.text(`Teléfono: ${profile.phone}`, dataX, y, { width: dataWidth });
      y += 14;
    }

    doc.text(`Correo: ${student.email}`, dataX, y, { width: dataWidth });

    // ===== DATOS ACADÉMICOS (debajo de la foto) =====
    const academicY = photoY + photoH + 24;

    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor('#1e3a8a')
      .text('DATOS ACADÉMICOS', margin, academicY);

    doc
      .moveTo(margin, academicY + 14)
      .lineTo(A4_WIDTH - margin, academicY + 14)
      .strokeColor('#d1d5db')
      .lineWidth(0.5)
      .stroke();

    // Tabla de datos académicos en dos columnas
    const col1X = margin;
    const col2X = A4_WIDTH / 2 + 10;
    const colWidth = A4_WIDTH / 2 - margin - 20;
    let rowY = academicY + 26;

    doc.font('Helvetica').fontSize(9);

    // Columna 1
    doc.fillColor('#6b7280').text('SEDE', col1X, rowY, { width: colWidth });
    doc.fillColor('#111827').font('Helvetica-Bold')
      .text(section.classroom?.sede?.name || '-', col1X, rowY + 12, { width: colWidth });

    doc.font('Helvetica').fillColor('#6b7280').text('TURNO', col1X, rowY + 30, { width: colWidth });
    doc.fillColor('#111827').font('Helvetica-Bold')
      .text(section.turn?.name || '-', col1X, rowY + 42, { width: colWidth });

    doc.font('Helvetica').fillColor('#6b7280').text('SECCIÓN', col1X, rowY + 60, { width: colWidth });
    doc.fillColor('#111827').font('Helvetica-Bold')
      .text(section.name || '-', col1X, rowY + 72, { width: colWidth });

    // Columna 2
    doc.font('Helvetica').fillColor('#6b7280').text('SALÓN', col2X, rowY, { width: colWidth });
    doc.fillColor('#111827').font('Helvetica-Bold')
      .text(section.classroom?.name || '-', col2X, rowY + 12, { width: colWidth });

    doc.font('Helvetica').fillColor('#6b7280').text('PERÍODO', col2X, rowY + 30, { width: colWidth });
    doc.fillColor('#111827').font('Helvetica-Bold')
      .text(section.period?.name || '-', col2X, rowY + 42, { width: colWidth });

    if (paymentPlan) {
      doc.font('Helvetica').fillColor('#6b7280').text('PLAN DE PAGO', col2X, rowY + 60, { width: colWidth });
      doc.fillColor('#111827').font('Helvetica-Bold')
        .text(`${paymentPlan.name}`, col2X, rowY + 72, { width: colWidth });
    }

    // ===== PIE DE LA FICHA =====
    const footerY = yOffset + HALF_HEIGHT - 34;

    doc
      .moveTo(margin, footerY)
      .lineTo(A4_WIDTH - margin, footerY)
      .strokeColor('#d1d5db')
      .lineWidth(0.5)
      .stroke();

    doc
      .fontSize(7)
      .font('Helvetica')
      .fillColor('#9ca3af')
      .text(
        `Generado el ${new Date().toLocaleDateString('es-PE')} | Documento: ${profile.documentNumber || 'N/A'} | ${student.email}`,
        margin,
        footerY + 8,
        { width: A4_WIDTH - margin * 2, align: 'center' }
      );
  }

  /**
   * Dibujar línea de corte punteada con símbolo de tijeras
   */
  private drawCutLine(doc: any, y: number) {
    // Símbolo de tijeras
    doc
      .fontSize(10)
      .fillColor('#9ca3af')
      .text('✂', 12, y - 5);

    // Línea punteada
    doc
      .dash(5, { space: 4 })
      .moveTo(30, y)
      .lineTo(A4_WIDTH - 12, y)
      .strokeColor('#9ca3af')
      .lineWidth(1)
      .stroke()
      .undash();
  }
}
