import api from './axios';

export interface RegisterStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  documentType: string;
  documentNumber: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  address?: string;
  sedeId: string;
  periodId: string;
  turnId: string;
  sectionId?: string;
  paymentPlanId: string;
  avatarUrl?: string;
  avatarPublicId?: string;
}

export interface RegisterStudentResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
  };
  enrollment: {
    id: string;
    section: {
      name: string;
      classroom: string;
      turn: string;
    };
    paymentPlan: {
      name: string;
      finalAmount: number;
    };
  };
  temporaryPassword: string;
  note: string;
}

export interface UpdateStudentProfileDto {
  firstName?: string;
  lastName?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  address?: string;
  email?: string;
  avatarUrl?: string;
  avatarPublicId?: string;
}

export const studentsRegistrationService = {
  async registerStudent(data: RegisterStudentDto): Promise<RegisterStudentResponse> {
    const response = await api.post<RegisterStudentResponse>('/api/users/students/register', data);
    return response.data;
  },

  async resetPassword(userId: string): Promise<{ 
    message: string; 
    temporaryPassword: string;
    email?: string;
  }> {
    const response = await api.patch(
      `/api/users/${userId}/reset-password`
    );
    return response.data;
  },

  async uploadProfilePicture(file: File): Promise<{ message: string; avatarUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{ message: string; avatarUrl: string }>(
      '/api/upload/profile-picture',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async uploadStudentPicture(
    file: File,
    documentNumber: string,
  ): Promise<{ tempAvatarUrl: string; tempAvatarPublicId: string }> {
    console.log(documentNumber)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentNumber', documentNumber);

    const response = await api.post<{ tempAvatarUrl: string; tempAvatarPublicId: string }>(
      '/api/upload/student-picture',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  async downloadEnrollmentCard(enrollmentId: string): Promise<Blob> {
    const response = await api.get(
      `/api/academic/enrollments/${enrollmentId}/card`,
      { responseType: 'blob' },
    );
    return response.data;
  },

  async updateStudentProfile(
  userId: string,
  data: UpdateStudentProfileDto
  ): Promise<{ message: string; profile: any }> {
    const response = await api.patch(
      `/api/users/${userId}/profile`,
      data
    );
    return response.data;
  },
};