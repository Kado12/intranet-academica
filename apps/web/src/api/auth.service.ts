import api from './axios';
import type { LoginDto, AuthResponse, AuthUser } from '../types/index';

export const authService = {

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async getProfile(): Promise<AuthUser> {
    const response = await api.get<AuthUser>('/auth/profile');
    return response.data;
  },
};