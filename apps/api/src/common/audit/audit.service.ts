import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuditAction, AuditEntity } from '@intranet/database';

export interface AuditLogData {
  action: AuditAction;
  entity: AuditEntity;
  entityId?: string;
  entityName?: string;
  oldData?: any;
  newData?: any;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Registrar un evento de auditoría
   * Calcula automáticamente los campos que cambiaron
   */
  async log(data: AuditLogData): Promise<void> {
    try {
      const changedFields = this.calculateChangedFields(data.oldData, data.newData);

      await this.prisma.auditLog.create({
        data: {
          action: data.action,
          entity: data.entity,
          entityId: data.entityId,
          entityName: data.entityName,
          oldData: data.oldData ? JSON.parse(JSON.stringify(data.oldData)) : null,
          newData: data.newData ? JSON.parse(JSON.stringify(data.newData)) : null,
          changedFields: changedFields,
          userId: data.userId,
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
        },
      });

      this.logger.log(
        `📝 Audit: ${data.action} ${data.entity} | ` +
          `ID: ${data.entityId || 'N/A'} | ` +
          `By: ${data.userId || 'system'} | ` +
          `Fields: ${changedFields.join(', ') || 'none'}`,
      );
    } catch (error) {
      // No lanzar error si falla la auditoría
      // El cambio principal ya se realizó
      this.logger.error(`❌ Error al registrar auditoría: ${error.message}`);
    }
  }

  /**
   * Calcular qué campos cambiaron entre oldData y newData
   */
  private calculateChangedFields(oldData: any, newData: any): string[] {
    if (!oldData && !newData) return [];
    if (!oldData) return Object.keys(newData || {});
    if (!newData) return Object.keys(oldData || {});

    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

    for (const key of allKeys) {
      // Ignorar campos de sistema
      if (['id', 'createdAt', 'updatedAt', 'passwordHash'].includes(key))
        continue;

      const oldValue = JSON.stringify(oldData[key]);
      const newValue = JSON.stringify(newData[key]);

      if (oldValue !== newValue) {
        changed.push(key);
      }
    }

    return changed;
  }

  /**
   * Obtener historial de una entidad específica
   */
  async getEntityHistory(entity: AuditEntity, entityId: string) {
    return await this.prisma.auditLog.findMany({
      where: { entity, entityId },
      include: {
        user: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Obtener historial general con filtros
   */
  async getHistory(filters: {
    entity?: AuditEntity;
    action?: AuditAction;
    userId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const where: any = {};

    if (filters.entity) where.entity = filters.entity;
    if (filters.action) where.action = filters.action;
    if (filters.userId) where.userId = filters.userId;

    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
      if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
    }

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        include: {
          user: {
            include: { profile: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.auditLog.count({ where }),
    ]);

    return {
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
