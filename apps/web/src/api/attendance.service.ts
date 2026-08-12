import api from './axios';

export interface AttendanceItem {
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  notes?: string;
}

export interface CreateAttendanceDto {
  date: string;
  sectionCourseId: string;
  attendances: AttendanceItem[];
}

export interface Attendance {
  id: string;
  date: string;
  status: string;
  notes?: string;
  studentId: string;
  sectionCourseId: string;
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
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: string;
}

export const attendanceService = {
  async createBulkAttendance(data: CreateAttendanceDto) {
    const response = await api.post('/api/academic/attendance/bulk', data);
    return response.data;
  },

  async excuseAttendance(attendanceId: string, excuseNote: string) {
    const response = await api.patch(
      `/api/academic/attendance/${attendanceId}/excuse`,
      { excuseNote }
    );
    return response.data;
  },

  async findBySectionCourseAndDate(sectionCourseId: string, date: string): Promise<Attendance[]> {
    const response = await api.get(
      `/api/academic/attendance/section-course/${sectionCourseId}/date/${date}`
    );
    return response.data;
  },

  async findByStudentAndCourse(studentId: string, sectionCourseId: string): Promise<Attendance[]> {
    const response = await api.get(
      `/api/academic/attendance/student/${studentId}/course/${sectionCourseId}`
    );
    return response.data;
  },

  async getStudentStats(studentId: string, sectionCourseId?: string): Promise<AttendanceStats> {
    const params = sectionCourseId ? `?sectionCourseId=${sectionCourseId}` : '';
    const response = await api.get(`/api/academic/attendance/student/${studentId}/stats${params}`);
    return response.data;
  },

  async getSectionReport(sectionCourseId: string, startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await api.get(
      `/api/academic/attendance/report/${sectionCourseId}?${params.toString()}`
    );
    return response.data;
  },
};