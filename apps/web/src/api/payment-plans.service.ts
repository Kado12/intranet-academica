import api from './axios';

export interface PaymentPlan {
  id: string;
  name: string;
  type: 'FULL_PAYMENT' | 'INSTALLMENTS' | 'SIBLING_DISCOUNT' | 'AGREEMENT' | 'SCHOLARSHIP' | 'OTHER';
  description?: string;
  baseAmount: number;
  discount: number;
  finalAmount: number;
  installments?: number;
  isActive: boolean;
  sedeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPlanDto {
  name: string;
  type: PaymentPlan['type'];
  description?: string;
  baseAmount: number;
  discount: number;
  installments?: number;
  sedeId?: string;
  isActive?: boolean;
}

export const paymentPlansService = {
  async findAll(sedeId?: string): Promise<PaymentPlan[]> {
    const params = sedeId ? `?sedeId=${sedeId}` : '';
    const response = await api.get<PaymentPlan[]>(`/api/academic/payment-plans${params}`);
    return response.data;
  },

  async findOne(id: string): Promise<PaymentPlan> {
    const response = await api.get<PaymentPlan>(`/api/academic/payment-plans/${id}`);
    return response.data;
  },

  async create(data: CreatePaymentPlanDto): Promise<PaymentPlan> {
    const response = await api.post<PaymentPlan>('/api/academic/payment-plans', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreatePaymentPlanDto>): Promise<PaymentPlan> {
    const response = await api.patch<PaymentPlan>(`/api/academic/payment-plans/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<PaymentPlan> {
    const response = await api.delete<PaymentPlan>(`/api/academic/payment-plans/${id}`);
    return response.data;
  },
};