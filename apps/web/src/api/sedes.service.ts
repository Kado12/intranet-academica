import api from './axios';
import type { Sede } from '../types';

export const sedesService = {
  async findAll(): Promise<Sede[]> {
    const response = await api.get<Sede[]>('/api/academic/sedes');
    return response.data;
  },

  async findOne(id: string): Promise<Sede> {
    const response = await api.get<Sede>(`/api/academic/sedes/${id}`);
    return response.data;
  },

  async create(data: Partial<Sede>): Promise<Sede> {
    const response = await api.post<Sede>('/api/academic/sedes', data);
    return response.data;
  },

  async update(id: string, data: Partial<Sede>): Promise<Sede> {
    const response = await api.patch<Sede>(`/api/academic/sedes/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<Sede> {
    const response = await api.delete<Sede>(`/api/academic/sedes/${id}`);
    return response.data;
  },
};