import api from './axios';

export interface TeacherAttendanceItem {
  teacherId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'VACATION' | 'SICK_LEAVE';
  notes?: string;
}

export interface CreateTeacherAttendanceDto {
  date: string;
  sedeId?: string;
  attendances: TeacherAttendanceItem[];
}

export interface TeacherAttendance {
  id: string;
  date: string;
  status: string;
  notes?: string;
  teacherId: string;
  sedeId?: string;
  teacher?: {
    id: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    };
  };
  sede?: {
    id: string;
    name: string;
  };
}

export const teacherAttendanceService = {
  async createBulkAttendance(data: CreateTeacherAttendanceDto) {
    const response = await api.post('/api/academic/teacher-attendance/bulk', data);
    return response.data;
  },

  async excuseAttendance(attendanceId: string, excuseNote: string) {
    const response = await api.patch(
      `/api/academic/teacher-attendance/${attendanceId}/excuse`,
      { excuseNote }
    );
    return response.data;
  },

  async findByDate(date: string, sedeId?: string): Promise<TeacherAttendance[]> {
    const params = sedeId ? `?sedeId=${sedeId}` : '';
    const response = await api.get(`/api/academic/teacher-attendance/date/${date}${params}`);
    return response.data;
  },

  async findByTeacher(teacherId: string, startDate?: string, endDate?: string): Promise<TeacherAttendance[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(
      `/api/academic/teacher-attendance/teacher/${teacherId}?${params.toString()}`
    );
    return response.data;
  },

  async getTeacherStats(teacherId: string) {
    const response = await api.get(`/api/academic/teacher-attendance/teacher/${teacherId}/stats`);
    return response.data;
  },

  async getReport(sedeId?: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (sedeId) params.append('sedeId', sedeId);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(`/api/academic/teacher-attendance/report?${params.toString()}`);
    return response.data;
  },
};