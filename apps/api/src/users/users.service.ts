import { Injectable, NotFoundException, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role, EnrollmentStatus } from '@intranet/database';
import { RegisterStudentDto } from './dto/register-student.dto';
import * as bcrypt from 'bcrypt';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';

// Roles administrativos que se muestran en la tabla de gestión
const ADMIN_ROLES: Role[] = [
  Role.ADMIN,
  Role.INFORMATICO,
  Role.SECRETARIA,
  Role.COORDINADOR,
];

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAdminUsers(search?: string, role?: Role) {
    const where: any = {
      memberships: {
        some: {
          role: {
            in: role ? [role] : ADMIN_ROLES,
          },
          status: 'ACTIVE',
        },
      },
    };

    // Si hay búsqueda, filtrar por nombre o correo
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { profile: { firstName: { contains: search } } },
        { profile: { lastName: { contains: search } } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
          select: { role: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async toggleActive(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
        },
      },
    });
  }

  async countByRole() {
    const counts = await this.prisma.membership.groupBy({
      by: ['role'],
      where: { status: 'ACTIVE' },
      _count: true,
    });

    return counts.map((item) => ({
      role: item.role,
      count: item._count,
    }));
  }

  async findStudents(search?: string) {
    const where: any = {
      memberships: {
        some: {
          role: Role.ESTUDIANTE,
          status: 'ACTIVE',
        },
      },
    };

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { profile: { firstName: { contains: search } } },
        { profile: { lastName: { contains: search } } },
      ];
    }

    return this.prisma.user.findMany({
      where,
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE' },
          select: { role: true },
        },
      },
      orderBy: {
        profile: {
          firstName: 'asc',
        },
      },
    });
  }

  generateAutomaticPassword(firstName: string, documentNumber: string): string {
    const initial = firstName.charAt(0).toUpperCase();
    return `${initial}_${documentNumber}`;
  }

  async registerStudent(dto: RegisterStudentDto, adminId: string) {
    const {
      firstName,
      lastName,
      email,
      documentType,
      documentNumber,
      birthDate,
      gender,
      phone,
      address,
      sedeId,
      periodId,
      turnId,
      sectionId,
      paymentPlanId,
    } = dto;

    // ===== VALIDACIONES PREVIAS =====

    // 1. Verificar que el email no exista
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Ya existe un usuario con ese correo electrónico');
    }

    // 2. Verificar que el DNI no exista
    const existingDocument = await this.prisma.profile.findUnique({
      where: { documentNumber },
    });

    if (existingDocument) {
      throw new ConflictException('Ya existe un usuario con ese número de documento');
    }

    // 3. Verificar que la sede existe
    const sede = await this.prisma.sede.findUnique({
      where: { id: sedeId },
    });

    if (!sede) {
      throw new NotFoundException('Sede no encontrada');
    }

    // 4. Verificar que el período existe y está activo
    const period = await this.prisma.academicPeriod.findUnique({
      where: { id: periodId },
    });

    if (!period) {
      throw new NotFoundException('Período académico no encontrado');
    }

    if (period.status !== 'ACTIVE') {
      throw new BadRequestException('El período académico no está activo');
    }

    // 5. Verificar que el plan de pago existe y está activo
    const paymentPlan = await this.prisma.paymentPlan.findUnique({
      where: { id: paymentPlanId },
    });

    if (!paymentPlan) {
      throw new NotFoundException('Plan de pago no encontrado');
    }

    if (!paymentPlan.isActive) {
      throw new BadRequestException('El plan de pago no está activo');
    }

    // 6. Verificar que el turno existe
    const turn = await this.prisma.turn.findUnique({
      where: { id: turnId },
    });

    if (!turn) {
      throw new NotFoundException('Turno no encontrado');
    }

    // ===== ASIGNACIÓN DE SECCIÓN =====

    let assignedSectionId: string;

    if (sectionId) {
      // Asignación manual: verificar que la sección existe y tiene cupo
      const section = await this.validateSectionCapacity(sectionId, periodId);
      assignedSectionId = section.id;
    } else {
      // Auto-asignación: buscar sección disponible según prioridad
      const section = await this.autoAssignSection(sedeId, periodId, turnId);
      assignedSectionId = section.id;
    }

    // ===== GENERAR CONTRASEÑA AUTOMÁTICA =====

    const automaticPassword = this.generateAutomaticPassword(firstName, documentNumber);
    const passwordHash = await bcrypt.hash(automaticPassword, 10);

    // ===== CREAR USUARIO + MATRÍCULA EN TRANSACCIÓN =====

    const result = await this.prisma.$transaction(async (tx) => {
      // 1. Crear usuario con perfil
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          mustChangePassword: false, // No forzar cambio
          profile: {
            create: {
              firstName,
              lastName,
              documentType,
              documentNumber,
              birthDate: birthDate ? new Date(birthDate) : null,
              gender,
              phone,
              address,
              avatarUrl: dto.avatarUrl || null, // ← NUEVO
              avatarPublicId: dto.avatarPublicId || null, // ← NUEVO
            },
          },
          memberships: {
            create: {
              role: Role.ESTUDIANTE,
              sedeId, // Asociar a la sede
            },
          },
        },
        include: {
          profile: true,
        },
      });

      // 2. Crear matrícula
      const enrollment = await tx.enrollment.create({
        data: {
          studentId: user.id,
          sectionId: assignedSectionId,
          status: EnrollmentStatus.ACTIVE,
          paymentPlanId,
        },
        include: {
          section: {
            include: {
              classroom: true,
              turn: true,
            },
          },
          paymentPlan: true,
        },
      });

      return { user, enrollment };
    });

    // ===== LOG DE AUDITORÍA =====

    this.logger.log(
      `Estudiante registrado: ${result.user.email} | ` +
        `Sección: ${result.enrollment.section.name} | ` +
        `Plan: ${result.enrollment.paymentPlan?.name} | ` +
        `Por: ${adminId}`,
    );

    // ===== RETORNAR RESPUESTA =====

    return {
      message: 'Estudiante registrado exitosamente',
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.profile?.firstName,
        lastName: result.user.profile?.lastName,
        documentNumber: result.user.profile?.documentNumber,
      },
      enrollment: {
        id: result.enrollment.id,
        section: {
          name: result.enrollment.section.name,
          classroom: result.enrollment.section.classroom.name,
          turn: result.enrollment.section.turn.name,
        },
        paymentPlan: {
          name: result.enrollment.paymentPlan?.name,
          finalAmount: result.enrollment.paymentPlan?.finalAmount,
        },
      },
      temporaryPassword: automaticPassword,
      note: 'La contraseña temporal es: ' + automaticPassword + '. El estudiante puede cambiarla en su primer inicio de sesión.',
    };
  }

  private async validateSectionCapacity(sectionId: string, periodId: string) {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        enrollments: {
          where: { status: EnrollmentStatus.ACTIVE },
        },
        period: true,
      },
    });

    if (!section) {
      throw new NotFoundException('Sección no encontrada');
    }

    if (!section.isActive) {
      throw new BadRequestException('La sección no está activa');
    }

    if (section.periodId !== periodId) {
      throw new BadRequestException('La sección no pertenece al período especificado');
    }

    const currentEnrollments = section.enrollments.length;
    const capacity = section.capacity || 30;

    if (currentEnrollments >= capacity) {
      throw new BadRequestException(
        `La sección está llena. Capacidad: ${capacity}, Matriculados: ${currentEnrollments}`,
      );
    }

    return section;
  }

  private async autoAssignSection(sedeId: string, periodId: string, turnId: string) {
    // Obtener todas las secciones activas que cumplan los criterios
    const sections = await this.prisma.section.findMany({
      where: {
        isActive: true,
        periodId,
        turnId,
        classroom: {
          sedeId,
        },
      },
      include: {
        enrollments: {
          where: { status: EnrollmentStatus.ACTIVE },
        },
        classroom: true,
      },
      orderBy: {
        priority: 'asc', // Prioridad ascendente: 1, 2, 3...
      },
    });

    if (sections.length === 0) {
      throw new BadRequestException(
        'No hay secciones disponibles para esta sede, período y turno',
      );
    }

    // Buscar la primera sección con cupo disponible
    for (const section of sections) {
      const currentEnrollments = section.enrollments.length;
      const capacity = section.capacity || 30;

      if (currentEnrollments < capacity) {
        this.logger.log(
          `Sección auto-asignada: ${section.name} | ` +
            `Prioridad: ${section.priority} | ` +
            `Cupo: ${currentEnrollments}/${capacity}`,
        );
        return section;
      }
    }

    // Si llegamos aquí, todas las secciones están llenas
    throw new BadRequestException(
      'No hay cupo disponible en ninguna sección para esta sede, período y turno. ' +
        'Por favor, aumente la capacidad de alguna sección o seleccione manualmente.',
    );
  }

  async resetPassword(userId: string, adminId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.profile) {
      throw new BadRequestException('El usuario no tiene perfil asociado');
    }

    // Generar nueva contraseña automática
    const newPassword = this.generateAutomaticPassword(
      user.profile.firstName,
      user.profile.documentNumber || '',
    );

    // Hashear
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Actualizar
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        passwordChangedAt: new Date(),
      },
    });

    // Log de auditoría
    this.logger.log(`Contraseña reseteada para usuario ${userId} por admin ${adminId}`);

    return {
      message: 'Contraseña reseteada exitosamente',
      userId,
      email: user.email,
      temporaryPassword: newPassword,
      note: 'La nueva contraseña temporal es: ' + newPassword,
    };
  }

  async updateStudentProfile(
    userId: string,
    updateDto: UpdateStudentProfileDto,
    adminId: string,
  ) {
    // 1. Verificar que el usuario existe y es estudiante
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        memberships: {
          where: { status: 'ACTIVE', role: 'ESTUDIANTE' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.memberships.length === 0) {
      throw new BadRequestException('El usuario no tiene el rol de estudiante');
    }

    const oldDocumentNumber = user.profile?.documentNumber;
    const newDocumentNumber = updateDto.documentNumber;
    const documentChanged = newDocumentNumber && newDocumentNumber !== oldDocumentNumber;
    console.log(oldDocumentNumber, newDocumentNumber, documentChanged);
    console.log(user.profile?.avatarPublicId);

    // 2. Si se cambia el email, verificar que no exista
    if (updateDto.email && updateDto.email !== user.email) {
      const existingEmail = await this.prisma.user.findUnique({
        where: { email: updateDto.email },
      });

      if (existingEmail) {
        throw new ConflictException('Ya existe un usuario con ese correo electrónico');
      }
    }
    // 3. Si se cambia el documento, verificar que no exista (excepto el propio)
    if (documentChanged) {
      const existingDocument = await this.prisma.profile.findUnique({
        where: { documentNumber: newDocumentNumber },
      });

      if (existingDocument) {
        throw new ConflictException('Ya existe un usuario con ese número de documento');
      }
    }

    // 4. Manejar cambio de foto (si se envía una nueva con DNI diferente)
    let finalAvatarUrl = updateDto.avatarUrl ?? user.profile?.avatarUrl ?? null;
    let finalAvatarPublicId = updateDto.avatarPublicId ?? user.profile?.avatarPublicId ?? null;

    if (
      documentChanged &&
      user.profile?.avatarPublicId &&
      user.profile.avatarPublicId !== newDocumentNumber
    ) {
      try {
        // Renombrar la foto en Cloudinary
        const renamed = await this.cloudinaryService.renameImage(
          user.profile.avatarPublicId,
          newDocumentNumber,
          'intranet/students',
        );

        finalAvatarUrl = renamed.secure_url;
        finalAvatarPublicId = renamed.public_id;

        this.logger.log(
          `📷 Foto renombrada en Cloudinary: ${user.profile.avatarPublicId} → ${newDocumentNumber}`,
        );
      } catch (error) {
        this.logger.warn(
          `⚠️ No se pudo renombrar la foto automáticamente: ${error.message}. ` +
            `La foto quedará con el DNI anterior.`,
        );
        // No lanzamos error: el cambio de documento procede aunque falle el renombrado
      }
    }

    // 5. Si el frontend envió una nueva foto, usarla
    if (updateDto.avatarUrl) {
      finalAvatarUrl = updateDto.avatarUrl;
      finalAvatarPublicId = updateDto.avatarPublicId || '';
    }

    // 6. Actualizar en transacción
    const result = await this.prisma.$transaction(async (tx) => {
      if (updateDto.email && updateDto.email !== user.email) {
        await tx.user.update({
          where: { id: userId },
          data: { email: updateDto.email },
        });
      }

      const profileData: any = {};

      if (updateDto.firstName !== undefined)
        profileData.firstName = updateDto.firstName;
      if (updateDto.lastName !== undefined)
        profileData.lastName = updateDto.lastName;
      if (updateDto.documentType !== undefined)
        profileData.documentType = updateDto.documentType;
      if (updateDto.documentNumber !== undefined)
        profileData.documentNumber = updateDto.documentNumber;
      if (updateDto.birthDate !== undefined) {
        profileData.birthDate = updateDto.birthDate ? new Date(updateDto.birthDate) : null;
      }
      if (updateDto.gender !== undefined) profileData.gender = updateDto.gender;
      if (updateDto.phone !== undefined) profileData.phone = updateDto.phone;
      if (updateDto.address !== undefined) profileData.address = updateDto.address;

      // Siempre actualizar la foto (puede haber sido renombrada o cambiada)
      profileData.avatarUrl = finalAvatarUrl;
      profileData.avatarPublicId = finalAvatarPublicId;

      if (user.profile) {
        return tx.profile.update({
          where: { userId },
          data: profileData,
          include: { user: true },
        });
      } else {
        return tx.profile.create({
          data: {
            userId,
            ...profileData,
          },
          include: { user: true },
        });
      }
    });

    this.logger.log(
      `Perfil actualizado: ${user.email} | Por: ${adminId} | Campos: ${Object.keys(updateDto).join(', ')}`,
    );

    return {
      message: 'Datos del estudiante actualizados exitosamente',
      profile: result,
      photoRenamed: documentChanged && finalAvatarPublicId === newDocumentNumber,
    };
  }
}
