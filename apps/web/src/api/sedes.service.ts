import api from './axios';
import type { Sede } from '../types';

export const sedesService = {
  async findAll(): Promise<Sede[]> {
    const response = await api.get<Sede[]>('/academic/sedes');
    return response.data;
  },

  async findOne(id: string): Promise<Sede> {
    const response = await api.get<Sede>(`/academic/sedes/${id}`);
    return response.data;
  },

  async create(data: Partial<Sede>): Promise<Sede> {
    const response = await api.post<Sede>('/academic/sedes', data);
    return response.data;
  },

  async update(id: string, data: Partial<Sede>): Promise<Sede> {
    const response = await api.patch<Sede>(`/academic/sedes/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<Sede> {
    const response = await api.delete<Sede>(`/academic/sedes/${id}`);
    return response.data;
  },
};