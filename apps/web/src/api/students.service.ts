import api from './axios';
import { Role } from '../types';

export interface StudentUser {
  id: string;
  email: string;
  profile?: {
    firstName: string;
    lastName: string;
  };
  memberships: { role: Role }[];
}

export const studentsService = {
  async findAll(search?: string): Promise<StudentUser[]> {
    const params = new URLSearchParams();
    params.append('role', Role.ESTUDIANTE);
    if (search) params.append('search', search);
    
    const response = await api.get<StudentUser[]>(`/users/students?${params.toString()}`);
    return response.data;
  },
};