import api from './axios';
import { type User, Role } from '../types';

export interface AdminUser extends User {
  memberships: { role: Role }[];
}

export interface UserStats {
  role: Role;
  count: number;
}

export const usersService = {
  async findAll(search?: string, role?: Role): Promise<AdminUser[]> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (role) params.append('role', role);
    
    const response = await api.get<AdminUser[]>(`/api/users?${params.toString()}`);
    return response.data;
  },

  async getStats(): Promise<UserStats[]> {
    const response = await api.get<UserStats[]>('/api/users/stats');
    return response.data;
  },

  async findOne(id: string): Promise<AdminUser> {
    const response = await api.get<AdminUser>(`/api/users/${id}`);
    return response.data;
  },

  async toggleActive(id: string): Promise<AdminUser> {
    const response = await api.patch<AdminUser>(`/api/users/${id}/toggle-active`);
    return response.data;
  },
};