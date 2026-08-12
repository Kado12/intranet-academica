import api from './axios';

export interface StatisticsOverview {
  counts: {
    totalStudents: number;
    totalActiveEnrollments: number;
    totalSedes: number;
    totalTeachers: number;
    totalClassrooms: number;
  };
  payments: {
    paid: { count: number; amount: number };
    pending: { count: number; amount: number };
    overdue: { count: number; amount: number };
    waived: { count: number; amount: number };
    totalCollected: number;
    totalPending: number;
  },
  charts: {
    enrollmentsBySede: { name: string; count: number }[];
    enrollmentsByTurn: { name: string; count: number }[];
    paymentPlansDistribution: { name: string; count: number }[];
    enrollmentsByMonth: { name: string; count: number }[];
  };
  recentEnrollments: any[];
}

export const statisticsService = {
  async getOverview(): Promise<StatisticsOverview> {
    const response = await api.get<StatisticsOverview>('/api/statistics/overview');
    return response.data;
  },
};