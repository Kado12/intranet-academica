import api from './axios';

export interface AuditLog {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'TRANSFER' | 'RESET_PASSWORD' | 'LOGIN' | 'LOGOUT' | 'UPLOAD_PHOTO' | 'DOWNLOAD_PDF';
  entity: 'USER' | 'PROFILE' | 'ENROLLMENT' | 'SECTION' | 'CLASSROOM' | 'SEDE' | 'PAYMENT_PLAN' | 'PERIOD' | 'COURSE';
  entityId?: string;
  entityName?: string;
  oldData?: any;
  newData?: any;
  changedFields: string[] | null;
  userId?: string;
  user?: {
    id: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  ipAddress?: string;
  createdAt: string;
}

export interface AuditHistoryResponse {
  logs: AuditLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const auditService = {
  async getHistory(filters?: {
    entity?: string;
    action?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<AuditHistoryResponse> {
    const params = new URLSearchParams();
    if (filters?.entity) params.append('entity', filters.entity);
    if (filters?.action) params.append('action', filters.action);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<AuditHistoryResponse>(`/api/audit?${params.toString()}`);
    return response.data;
  },

  async getEntityHistory(entity: string, entityId: string): Promise<AuditLog[]> {
    const response = await api.get<AuditLog[]>(`/api/audit/entity/${entity}/${entityId}`);
    return response.data;
  },
};