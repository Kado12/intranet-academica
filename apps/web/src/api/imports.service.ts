// apps/web/src/api/imports.service.ts
import api from './axios';

export interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  errors: { row: number; reason: string; data?: any }[];
  created: any[];
}

export const importsService = {
  async downloadTemplate(type: 'students' | 'classrooms' | 'sections'): Promise<void> {
    const response = await api.get(`/api/imports/templates/${type}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = `plantilla-${type}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  async importFile(type: 'students' | 'classrooms' | 'sections', file: File): Promise<ImportResult> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ImportResult>(`/api/imports/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },
};