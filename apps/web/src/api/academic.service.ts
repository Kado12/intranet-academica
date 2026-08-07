import api from './axios';
import type{
  Sede,
  Turn,
  AcademicPeriod,
  Classroom,
  Section,
  Course,
  PeriodStatus,
} from '../types';

// ============== SEDES ==============
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
}

// ============== TURNOS ==============
export const turnsService = {
  async findAll(): Promise<Turn[]> {
    const response = await api.get<Turn[]>('/academic/turns');
    return response.data;
  },
  
  async create(data: Partial<Turn>): Promise<Turn> {
    const response = await api.post<Turn>('/academic/turns', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Turn>): Promise<Turn> {
    const response = await api.patch<Turn>(`/academic/turns/${id}`, data);
    return response.data;
  },
  
  async remove(id: string): Promise<Turn> {
    const response = await api.delete<Turn>(`/academic/turns/${id}`);
    return response.data;
  },
};

// ============== PERIODOS ==============
export const periodsService = {
  async findAll(): Promise<AcademicPeriod[]> {
    const response = await api.get<AcademicPeriod[]>('/academic/periods');
    return response.data;
  },
  
  async findActive(): Promise<AcademicPeriod | null> {
    const response = await api.get<AcademicPeriod>('/academic/periods/active');
    return response.data;
  },
  
  async create(data: Partial<AcademicPeriod>): Promise<AcademicPeriod> {
    const response = await api.post<AcademicPeriod>('/academic/periods', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<AcademicPeriod>): Promise<AcademicPeriod> {
    const response = await api.patch<AcademicPeriod>(`/academic/periods/${id}`, data);
    return response.data;
  },
  
  async activate(id: string): Promise<AcademicPeriod> {
    const response = await api.patch<AcademicPeriod>(`/academic/periods/${id}/activate`);
    return response.data;
  },
  
  async remove(id: string): Promise<AcademicPeriod> {
    const response = await api.delete<AcademicPeriod>(`/academic/periods/${id}`);
    return response.data;
  },
};

// ============== SALONES ==============
export const classroomsService = {
  async findAll(sedeId?: string): Promise<Classroom[]> {
    const params = sedeId ? `?sedeId=${sedeId}` : '';
    const response = await api.get<Classroom[]>(`/academic/classrooms${params}`);
    return response.data;
  },
  
  async findOne(id: string): Promise<Classroom> {
    const response = await api.get<Classroom>(`/academic/classrooms/${id}`);
    return response.data;
  },
  
  async create(data: Partial<Classroom>): Promise<Classroom> {
    const response = await api.post<Classroom>('/academic/classrooms', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Classroom>): Promise<Classroom> {
    const response = await api.patch<Classroom>(`/academic/classrooms/${id}`, data);
    return response.data;
  },
  
  async remove(id: string): Promise<Classroom> {
    const response = await api.delete<Classroom>(`/academic/classrooms/${id}`);
    return response.data;
  },
};

// ============== SECCIONES ==============
export const sectionsService = {
  async findAll(periodId?: string, classroomId?: string): Promise<Section[]> {
    const params = new URLSearchParams();
    if (periodId) params.append('periodId', periodId);
    if (classroomId) params.append('classroomId', classroomId);
    
    const response = await api.get<Section[]>(`/academic/sections?${params.toString()}`);
    return response.data;
  },
  
  async findOne(id: string): Promise<Section> {
    const response = await api.get<Section>(`/academic/sections/${id}`);
    return response.data;
  },
  
  async create(data: Partial<Section>): Promise<Section> {
    const response = await api.post<Section>('/academic/sections', data);
    return response.data;
  },
  
  async update(id: string, data: Partial<Section>): Promise<Section> {
    const response = await api.patch<Section>(`/academic/sections/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<Section> {
    const response = await api.delete<Section>(`/academic/sections/${id}`);
    return response.data;
  },
};

// ============== CURSOS ==============
export const coursesService = {
  async findAll(): Promise<Course[]> {
    const response = await api.get<Course[]>('/academic/courses');
    return response.data;
  },

  async findOne(id: string): Promise<Course> {
    const response = await api.get<Course>(`/academic/courses/${id}`);
    return response.data;
  },

  async create(data: Partial<Course>): Promise<Course> {
    const response = await api.post<Course>('/academic/courses', data);
    return response.data;
  },

  async update(id: string, data: Partial<Course>): Promise<Course> {
    const response = await api.patch<Course>(`/academic/courses/${id}`, data);
    return response.data;
  },

  async remove(id: string): Promise<Course> {
    const response = await api.delete<Course>(`/academic/courses/${id}`);
    return response.data;
  },
};