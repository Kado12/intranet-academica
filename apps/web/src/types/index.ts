// Roles de usuario
export const Role = {
  ADMIN : 'ADMIN',
  DOCENTE : 'DOCENTE',
  ESTUDIANTE : 'ESTUDIANTE',
  PADRE_DE_FAMILIA : 'PADRE_DE_FAMILIA',
  COORDINADOR : 'COORDINADOR',
  INFORMATICO : 'INFORMATICO',
  SECRETARIA : 'SECRETARIA',
} as const

export type Role = typeof Role[keyof typeof Role]

// Estados de período académico
export const PeriodStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED',
} as const;

export type PeriodStatus = typeof PeriodStatus[keyof typeof PeriodStatus];

// Estados de matrícula
export const EnrollmentStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  WITHDRAWN: 'WITHDRAWN',
  TRANSFERRED: 'TRANSFERRED',
  COMPLETED: 'COMPLETED',
} as const;

export type EnrollmentStatus = typeof EnrollmentStatus[keyof typeof EnrollmentStatus];

// Tipos de relación padre-estudiante
export const ParentRelationType = {
  PADRE: 'PADRE',
  MADRE: 'MADRE',
  TUTOR: 'TUTOR',
  OTRO: 'OTRO',
} as const;

export type ParentRelationType = typeof ParentRelationType[keyof typeof ParentRelationType];

// Usuario autenticado
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  roles: Role[];
  profile?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
    address?: string;
    phone?: string;
    gender?: string;
    documentType?: string
    documentNumber?: string
    birthDate?: string
  };
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
  priority?: number;
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

// Plan de pago
export const PaymentPlanType = {
  FULL_PAYMENT: 'FULL_PAYMENT',
  INSTALLMENTS: 'INSTALLMENTS',
  SIBLING_DISCOUNT: 'SIBLING_DISCOUNT',
  AGREEMENT: 'AGREEMENT',
  SCHOLARSHIP: 'SCHOLARSHIP',
  OTHER: 'OTHER',
} as const;

export type PaymentPlanType = typeof PaymentPlanType[keyof typeof PaymentPlanType];

export interface PaymentPlan {
  id: string;
  name: string;
  type: PaymentPlanType;
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