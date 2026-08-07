import api from './axios';
import type{
  Sede,
  Turn,
  AcademicPeriod,
  Classroom,
  Section,
  Course,
  // PeriodStatus,
} from '../types';

// ============== SEDES ==============
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
}

// ============== TURNOS ==============
export const turnsService = {
  async findAll(): Promise<Turn[]> {
    const response = await api.get<Turn[]>('/api/academic/turns');
    return response.data;
  },
  
  async create(data: Partial<Turn>): Promise<Turn> {
    const response = await api.post<Turn>('/api/academic/turns', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Turn>): Promise<Turn> {
    const response = await api.patch<Turn>(`/api/academic/turns/${id}`, data);
    return response.data;
  },
  
  async remove(id: string): Promise<Turn> {
    const response = await api.delete<Turn>(`/api/academic/turns/${id}`);
    return response.data;
  },
};

// ============== PERIODOS ==============
export const periodsService = {
  async findAll(): Promise<AcademicPeriod[]> {
    const response = await api.get<AcademicPeriod[]>('/api/academic/periods');
    return response.data;
  },
  
  async findActive(): Promise<AcademicPeriod | null> {
    const response = await api.get<AcademicPeriod>('/api/academic/periods/active');
    return response.data;
  },
  
  async create(data: Partial<AcademicPeriod>): Promise<AcademicPeriod> {
    const response = await api.post<AcademicPeriod>('/api/academic/periods', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<AcademicPeriod>): Promise<AcademicPeriod> {
    const response = await api.patch<AcademicPeriod>(`/api/academic/periods/${id}`, data);
    return response.data;
  },
  
  async activate(id: string): Promise<AcademicPeriod> {
    const response = await api.patch<AcademicPeriod>(`/api/academic/periods/${id}/activate`);
    return response.data;
  },
  
  async remove(id: string): Promise<AcademicPeriod> {
    const response = await api.delete<AcademicPeriod>(`/api/academic/periods/${id}`);
    return response.data;
  },
};

// ============== SALONES ==============
export const classroomsService = {
  async findAll(sedeId?: string): Promise<Classroom[]> {
    const params = sedeId ? `?sedeId=${sedeId}` : '';
    const response = await api.get<Classroom[]>(`/api/academic/classrooms${params}`);
    return response.data;
  },
  
  async findOne(id: string): Promise<Classroom> {
    const response = await api.get<Classroom>(`/api/academic/classrooms/${id}`);
    return response.data;
  },
  
  async create(data: Partial<Classroom>): Promise<Classroom> {
    const response = await api.post<Classroom>('/api/academic/classrooms', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Classroom>): Promise<Classroom> {
    const response = await api.patch<Classroom>(`/api/academic/classrooms/${id}`, data);
    return response.data;
  },
  
  async remove(id: string): Promise<Classroom> {
    const response = await api.delete<Classroom>(`/api/academic/classrooms/${id}`);
    return response.data;
  },
};

// ============== SECCIONES ==============
export const sectionsService = {
  async findAll(periodId?: string, classroomId?: string): Promise<Section[]> {
    const params = new URLSearchParams();
    if (periodId) params.append('periodId', periodId);
    if (classroomId) params.append('classroomId', classroomId);
    
    const response = await api.get<Section[]>(`/api/academic/sections?${params.toString()}`);
    return response.data;
  },
  
  async findOne(id: string): Promise<Section> {
    const response = await api.get<Section>(`/api/academic/sections/${id}`);
    return response.data;
  },
  
  async create(data: Partial<Section>): Promise<Section> {
    const response = await api.post<Section>('/api/academic/sections', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Section>): Promise<Section> {
    const response = await api.patch<Section>(`/api/academic/sections/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<Section> {
    const response = await api.delete<Section>(`/api/academic/sections/${id}`);
    return response.data;
  },
};

// ============== CURSOS ==============
export const coursesService = {
  async findAll(): Promise<Course[]> {
    const response = await api.get<Course[]>('/api/academic/courses');
    return response.data;
  },

  async findOne(id: string): Promise<Course> {
    const response = await api.get<Course>(`/api/academic/courses/${id}`);
    return response.data;
  },

  async create(data: Partial<Course>): Promise<Course> {
    const response = await api.post<Course>('/api/academic/courses', data);
    return response.data;
  },

  async update(id: string, data: Partial<Course>): Promise<Course> {
    const response = await api.patch<Course>(`/api/academic/courses/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<Course> {
    const response = await api.delete<Course>(`/api/academic/courses/${id}`);
    return response.data;
  },
};

// ============== MATRICULAS ==============
export interface EnrollmentResponse {
  id: string;
  studentId: string;
  sectionId: string;
  status: string;
  enrolledAt: string;
  student?: {
    id: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
    };
  };
  section?: {
    id: string;
    name: string;
    classroom?: { name: string };
    turn?: { name: string };
    period?: { name: string };
  };
}

export const enrollmentsService = {
  async findAll(periodId?: string, sectionId?: string): Promise<EnrollmentResponse[]> {
    const params = new URLSearchParams();
    if (periodId) params.append('periodId', periodId);
    if (sectionId) params.append('sectionId', sectionId);
    
    const response = await api.get<EnrollmentResponse[]>(`/api/academic/enrollments?${params.toString()}`);
    return response.data;
  },

  async findBySection(sectionId: string): Promise<EnrollmentResponse[]> {
    const response = await api.get<EnrollmentResponse[]>(`/api/academic/enrollments/by-section?sectionId=${sectionId}`);
    return response.data;
  },

  async create(data: { studentId: string; sectionId: string }): Promise<EnrollmentResponse> {
    const response = await api.post<EnrollmentResponse>('/api/academic/enrollments', data);
    return response.data;
  },

  async updateStatus(id: string, status: string): Promise<EnrollmentResponse> {
    const response = await api.patch<EnrollmentResponse>(`/api/academic/enrollments/${id}`, { status });
    return response.data;
  },

  async remove(id: string): Promise<EnrollmentResponse> {
    const response = await api.delete<EnrollmentResponse>(`/api/academic/enrollments/${id}`);
    return response.data;
  },
};