import api from './axios';

// ===== INTERFACES =====

export interface SectionCourse {
  id: string;
  sectionId: string;
  courseId: string;
  teacherId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  section?: {
    id: string;
    name: string;
    capacity?: number;
    classroom?: {
      id: string;
      name: string;
      sede?: {
        id: string;
        name: string;
      };
    };
    turn?: {
      id: string;
      name: string;
    };
    period?: {
      id: string;
      name: string;
    };
  };
  course?: {
    id: string;
    code: string;
    name: string;
  };
  teacher?: {
    id: string;
    email: string;
    profile?: {
      firstName: string;
      lastName: string;
      avatarUrl?: string;
    };
  };
}

export interface CreateSectionCourseDto {
  sectionId: string;
  courseId: string;
  teacherId: string;
}

export interface UpdateSectionCourseDto {
  sectionId?: string;
  courseId?: string;
  teacherId?: string;
  isActive?: boolean;
}

// ===== SERVICIO =====

export const sectionCoursesService = {
  /**
   * Obtener todos los cursos asignados a secciones
   */
  async findAll(): Promise<SectionCourse[]> {
    const response = await api.get<SectionCourse[]>('/api/academic/section-courses');
    return response.data;
  },

  /**
   * Obtener cursos de una sección específica
   */
  async findBySection(sectionId: string): Promise<SectionCourse[]> {
    const response = await api.get<SectionCourse[]>(
      `/api/academic/section-courses/by-section/${sectionId}`
    );
    return response.data;
  },

  /**
   * Obtener secciones donde se dicta un curso
   */
  async findByCourse(courseId: string): Promise<SectionCourse[]> {
    const response = await api.get<SectionCourse[]>(
      `/api/academic/section-courses/by-course/${courseId}`
    );
    return response.data;
  },

  /**
   * Obtener cursos asignados a un docente
   */
  async findByTeacher(teacherId: string): Promise<SectionCourse[]> {
    const response = await api.get<SectionCourse[]>(
      `/api/academic/section-courses/by-teacher/${teacherId}`
    );
    return response.data;
  },

  /**
   * Obtener los cursos del docente autenticado
   */
  async getMyCourses(): Promise<SectionCourse[]> {
    const response = await api.get<SectionCourse[]>(
      '/api/academic/section-courses/my-courses'
    );
    return response.data;
  },

  /**
   * Crear una nueva asignación de curso a sección
   */
  async create(data: CreateSectionCourseDto): Promise<SectionCourse> {
    const response = await api.post<SectionCourse>(
      '/api/academic/section-courses',
      data
    );
    return response.data;
  },

  /**
   * Actualizar una asignación existente
   */
  async update(id: string, data: UpdateSectionCourseDto): Promise<SectionCourse> {
    const response = await api.patch<SectionCourse>(
      `/api/academic/section-courses/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Eliminar una asignación
   */
  async remove(id: string): Promise<SectionCourse> {
    const response = await api.delete<SectionCourse>(
      `/api/academic/section-courses/${id}`
    );
    return response.data;
  },
};