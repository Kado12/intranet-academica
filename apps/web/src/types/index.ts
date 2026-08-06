// Roles de usuario
export enum Role {
  ADMIN = 'ADMIN',
  DOCENTE = 'DOCENTE',
  ESTUDIANTE = 'ESTUDIANTE',
  PADRE_DE_FAMILIA = 'PADRE_DE_FAMILIA',
  COORDINADOR = 'COORDINADOR',
  INFORMATICO = 'INFORMATICO',
  SECRETARIA = 'SECRETARIA',
}

// Estados de período académico
export enum PeriodStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

// Estados de matrícula
export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  WITHDRAWN = 'WITHDRAWN',
  TRANSFERRED = 'TRANSFERRED',
  COMPLETED = 'COMPLETED',
}

// Tipos de relación padre-estudiante
export enum ParentRelationType {
  PADRE = 'PADRE',
  MADRE = 'MADRE',
  TUTOR = 'TUTOR',
  OTRO = 'OTRO',
}

// Usuario autenticado
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

// Respuesta de autenticación
export interface AuthResponse {
  user: AuthUser;
  token: string;
}

// DTO de registro
export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  documentNumber?: string;
  documentType?: string;
  role: Role;
}

// DTO de login
export interface LoginDto {
  email: string;
  password: string;
}

// Sede
export interface Sede {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Turno
export interface Turn {
  id: string;
  name: string;
  startTime?: string;
  endTime?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Período académico
export interface AcademicPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: PeriodStatus;
  createdAt: string;
  updatedAt: string;
}

// Salón
export interface Classroom {
  id: string;
  name: string;
  location?: string;
  capacity?: number;
  isActive: boolean;
  sedeId: string;
  sede?: Sede;
  createdAt: string;
  updatedAt: string;
}

// Sección
export interface Section {
  id: string;
  name: string;
  capacity?: number;
  isActive: boolean;
  classroomId: string;
  turnId: string;
  periodId: string;
  classroom?: Classroom;
  turn?: Turn;
  period?: AcademicPeriod;
  createdAt: string;
  updatedAt: string;
}

// Curso
export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Perfil de usuario
export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  documentType?: string;
  documentNumber?: string;
  phone?: string;
  birthDate?: string;
  avatarUrl?: string;
}

// Usuario completo
export interface User {
  id: string;
  email: string;
  isActive: boolean;
  lastLoginAt?: string;
  profile?: Profile;
  createdAt: string;
  updatedAt: string;
}

// Respuesta genérica de error
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}