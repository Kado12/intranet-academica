import api from './axios';

export interface PaymentRecord {
  id: string;
  enrollmentId: string;
  amount: number;
  installmentNumber?: number;
  totalInstallments?: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'WAIVED';
  dueDate: string;
  paidAt?: string;
  paymentMethod?: string;
  reference?: string;
  notes?: string;
  enrollment?: {
    id: string;
    student?: {
      id: string;
      email: string;
      profile?: {
        firstName: string;
        lastName: string;
        documentNumber?: string;
        avatarUrl?: string;
      };
    };
    section?: {
      id: string;
      name: string;
      classroom?: {
        name: string;
        sede?: { id: string; name: string };
      };
      turn?: { id: string; name: string };
    };
    paymentPlan?: {
      id: string;
      name: string;
    };
  };
}

export interface PaymentsResponse {
  payments: PaymentRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const paymentsService = {
  async findAll(filters?: {
    status?: string;
    sedeId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaymentsResponse> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.sedeId) params.append('sedeId', filters.sedeId);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get<PaymentsResponse>(`/api/academic/payments?${params.toString()}`);
    return response.data;
  },

  async findByEnrollment(enrollmentId: string): Promise<PaymentRecord[]> {
    const response = await api.get<PaymentRecord[]>(`/api/academic/payments/enrollment/${enrollmentId}`);
    return response.data;
  },

  async updatePayment(paymentId: string, data: {
    status: string;
    paymentMethod?: string;
    reference?: string;
    notes?: string;
    paidAt?: string;
  }): Promise<PaymentRecord> {
    const response = await api.patch<PaymentRecord>(`/api/academic/payments/${paymentId}`, data);
    return response.data;
  },

  async getSummary(): Promise<any> {
    const response = await api.get('/api/academic/payments/summary');
    return response.data;
  },
};