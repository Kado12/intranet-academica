import api from './axios';

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
  turnId?: string;
  sectionId?: string;
  paymentPlanId?: string;
  paymentStatus?: string;
  search?: string;
}

export const exportsService = {
  /**
   * Descargar lista de alumnos
   */
  async downloadStudentsList(filters?: StudentExportFilters): Promise<void> {
    const params = new URLSearchParams();
    if (filters?.sedeId) params.append('sedeId', filters.sedeId);
    if (filters?.turnId) params.append('turnId', filters.turnId);
    if (filters?.classroomId) params.append('classroomId', filters.classroomId);
    if (filters?.sectionId) params.append('sectionId', filters.sectionId);
    if (filters?.periodId) params.append('periodId', filters.periodId);
    if (filters?.search) params.append('search', filters.search);

    console.log('PARAMETROS',params)

    const response = await api.get(`/api/exports/students-list?${params.toString()}`, {
      responseType: 'blob',
    });

    this.triggerDownload(response.data, `lista-alumnos-${new Date().toISOString().split('T')[0]}.xlsx`);
  },

  /**
   * Descargar estado de pagos
   */
  async downloadPaymentStatus(filters?: PaymentExportFilters): Promise<void> {
    const params = new URLSearchParams();
    if (filters?.sedeId) params.append('sedeId', filters.sedeId);
    if (filters?.turnId) params.append('turnId', filters.turnId);
    if (filters?.sectionId) params.append('sectionId', filters.sectionId);
    if (filters?.paymentPlanId) params.append('paymentPlanId', filters.paymentPlanId);
    if (filters?.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/api/exports/payment-status?${params.toString()}`, {
      responseType: 'blob',
    });

    this.triggerDownload(response.data, `estado-pagos-${new Date().toISOString().split('T')[0]}.xlsx`);
  },

  /**
   * Descargar resumen de alumnos
   */
  async downloadSummary(): Promise<void> {
    const response = await api.get('/api/exports/summary', {
      responseType: 'blob',
    });

    this.triggerDownload(response.data, `resumen-alumnos-${new Date().toISOString().split('T')[0]}.xlsx`);
  },

  /**
   * Helper para disparar la descarga
   */
  triggerDownload(blob: Blob, fileName: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },
};