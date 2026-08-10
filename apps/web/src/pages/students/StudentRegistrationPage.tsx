import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { getZodErrors, type FormErrors } from '../../utils/zodHelpers';
import { sedesService, turnsService, periodsService, sectionsService } from '../../api/academic.service';
import { paymentPlansService, type PaymentPlan } from '../../api/payment-plans.service';
import { studentsRegistrationService } from '../../api/students-registration.service';
import type { Sede, Turn, AcademicPeriod, Section, Role } from '../../types';
import {
  UserIcon,
  AcademicCapIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

// ===== SCHEMAS DE VALIDACIÓN POR PASO =====

const step1Schema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Correo electrónico inválido'),
  documentType: z.string().min(1, 'El tipo de documento es requerido'),
  documentNumber: z.string().min(1, 'El número de documento es requerido'),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const step2Schema = z.object({
  sedeId: z.string().min(1, 'Selecciona una sede'),
  periodId: z.string().min(1, 'Selecciona un período'),
  turnId: z.string().min(1, 'Selecciona un turno'),
  sectionId: z.string().optional(),
});

const step3Schema = z.object({
  paymentPlanId: z.string().min(1, 'Selecciona un plan de pago'),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

// ===== COMPONENTE PRINCIPAL =====

export const StudentRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, addToast, removeToast } = useToast();

  // Estado del wizard
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);

  // Datos del formulario
  const [step1Data, setStep1Data] = useState<Step1Data>({
    firstName: '',
    lastName: '',
    email: '',
    documentType: 'DNI',
    documentNumber: '',
    birthDate: '',
    gender: '',
    phone: '',
    address: '',
  });

  const [step2Data, setStep2Data] = useState<Step2Data>({
    sedeId: '',
    periodId: '',
    turnId: '',
    sectionId: '',
  });

  const [step3Data, setStep3Data] = useState<Step3Data>({
    paymentPlanId: '',
  });

  // Errores
  const [step1Errors, setStep1Errors] = useState<FormErrors<Step1Data>>({});
  const [step2Errors, setStep2Errors] = useState<FormErrors<Step2Data>>({});
  const [step3Errors, setStep3Errors] = useState<FormErrors<Step3Data>>({});

  // Foto
  const [studentPhoto, setStudentPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState('');

  // Datos cargados desde la API
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // ===== CARGAR DATOS INICIALES =====

  const loadInitialData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [sedesData, turnsData, periodsData, plansData] = await Promise.all([
        sedesService.findAll(),
        turnsService.findAll(),
        periodsService.findAll(),
        paymentPlansService.findAll(),
      ]);

      setSedes(sedesData);
      setTurns(turnsData);
      setPeriods(periodsData.filter(p => p.status === 'ACTIVE'));
      setPaymentPlans(plansData);
    } catch (error) {
      addToast('error', 'Error al cargar los datos iniciales');
    } finally {
      setIsLoadingData(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // ===== CARGAR SECCIONES CUANDO CAMBIA SEDE/PERÍODO/TURNO =====

  useEffect(() => {
    const loadSections = async () => {
      if (step2Data.sedeId && step2Data.periodId && step2Data.turnId) {
        try {
          // Aquí necesitarías un endpoint que filtre secciones por sede, período y turno
          // Por ahora cargamos todas y filtramos en el frontend
          const allSections = await sectionsService.findAll(step2Data.periodId);
          setSections(allSections);
        } catch (error) {
          console.error('Error al cargar secciones:', error);
        }
      }
    };

    loadSections();
  }, [step2Data.sedeId, step2Data.periodId, step2Data.turnId]);

  // ===== HANDLERS DE CAMBIO =====

  const handleStep1Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStep1Data(prev => ({ ...prev, [name]: value }));
    if (step1Errors[name as keyof Step1Data]) {
      setStep1Errors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStep2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStep2Data(prev => ({ ...prev, [name]: value }));
    if (step2Errors[name as keyof Step2Data]) {
      setStep2Errors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStep3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStep3Data(prev => ({ ...prev, [name]: value }));
    if (step3Errors[name as keyof Step3Data]) {
      setStep3Errors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhotoSelect = (file: File) => {
    setStudentPhoto(file);
    setPhotoError('');
  };

  // ===== VALIDACIÓN POR PASO =====

  const validateStep1 = (): boolean => {
    try {
      step1Schema.parse(step1Data);
      
      // Validar foto obligatoria para estudiantes
      if (!studentPhoto) {
        setPhotoError('La foto del estudiante es obligatoria');
        return false;
      }
      
      return true;
    } catch (error) {
      setStep1Errors(getZodErrors<Step1Data>(error));
      return false;
    }
  };

  const validateStep2 = (): boolean => {
    try {
      step2Schema.parse(step2Data);
      return true;
    } catch (error) {
      setStep2Errors(getZodErrors<Step2Data>(error));
      return false;
    }
  };

  const validateStep3 = (): boolean => {
    try {
      step3Schema.parse(step3Data);
      return true;
    } catch (error) {
      setStep3Errors(getZodErrors<Step3Data>(error));
      return false;
    }
  };

  // ===== NAVEGACIÓN DEL WIZARD =====

  const nextStep = async () => {
    if (currentStep === 1 && !validateStep1()) return; 
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;

    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleDownloadCard = async () => {
    try {
      const blob = await studentsRegistrationService.downloadEnrollmentCard(
        registrationResult.enrollment.id,
      );

      // Crear URL temporal y descargar
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ficha-matricula-${registrationResult.user.firstName}-${registrationResult.user.documentNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      addToast('success', 'Ficha de matrícula descargada');
    } catch (error) {
      addToast('error', 'Error al descargar la ficha');
    }
  };

  // ===== SUBMIT FINAL =====

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 1. Subir foto primero
      let avatarUrl: string | undefined;
      let avatarPublicId: string | undefined;

      if (studentPhoto) {
        const uploadResult = await studentsRegistrationService.uploadStudentPicture(
          studentPhoto,
          step1Data.documentNumber,
        );
        avatarUrl = uploadResult.tempAvatarUrl;
        avatarPublicId = uploadResult.tempAvatarPublicId;
      }

      // 2. Registrar estudiante
      const result = await studentsRegistrationService.registerStudent({
        ...step1Data,
        ...step2Data,
        ...step3Data,
        birthDate: step1Data.birthDate || undefined,
        gender: step1Data.gender || undefined,
        phone: step1Data.phone || undefined,
        address: step1Data.address || undefined,
        sectionId: step2Data.sectionId || undefined,
        avatarUrl,
        avatarPublicId,
      });

      setRegistrationResult(result);
      setCurrentStep(5); // Paso de confirmación
      addToast('success', 'Estudiante registrado exitosamente');

    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al registrar estudiante');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== OPCIONES PARA SELECTS =====

  const sedeOptions = [
    { value: '', label: 'Selecciona una sede' },
    ...sedes.map(s => ({ value: s.id, label: s.name })),
  ];

  const turnOptions = [
    { value: '', label: 'Selecciona un turno' },
    ...turns.map(t => ({ value: t.id, label: t.name })),
  ];

  const periodOptions = [
    { value: '', label: 'Selecciona un período' },
    ...periods.map(p => ({ value: p.id, label: `${p.name} (${p.status})` })),
  ];

  const sectionOptions = [
    { value: '', label: 'Auto-asignar sección (recomendado)' },
    ...sections.map(s => ({
      value: s.id,
      label: `${s.classroom?.name || ''} - ${s.name} (${s.turn?.name || ''})`,
    })),
  ];

  const paymentPlanOptions = [
    { value: '', label: 'Selecciona un plan de pago' },
    ...paymentPlans.map(p => ({
      value: p.id,
      label: `${p.name} - S/ ${p.finalAmount.toFixed(2)}${p.installments ? ` (${p.installments} cuotas)` : ''}`,
    })),
  ];

  const genderOptions = [
    { value: '', label: 'Selecciona género' },
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'Otro', label: 'Otro' },
  ];

  const documentTypeOptions = [
    { value: 'DNI', label: 'DNI' },
    { value: 'CE', label: 'Carné de Extranjería' },
    { value: 'Pasaporte', label: 'Pasaporte' },
  ];

  // ===== RENDER =====

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Registro de Estudiante</h1>
        <p className="text-gray-600 mt-2">
          Complete todos los pasos para registrar un nuevo estudiante
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="flex justify-center space-x-4">
        {[
          { num: 1, label: 'Datos Personales', icon: UserIcon },
          { num: 2, label: 'Datos Académicos', icon: AcademicCapIcon },
          { num: 3, label: 'Plan de Pago', icon: CreditCardIcon },
          { num: 4, label: 'Confirmación', icon: ClipboardDocumentCheckIcon },
        ].map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.num;
          const isCompleted = currentStep > step.num;

          return (
            <div key={step.num} className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center
                ${isCompleted
                  ? 'bg-green-500 text-white'
                  : isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {isCompleted ? (
                  <CheckCircleIcon className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Contenido del paso actual */}
      <Card>
        {/* ===== PASO 1: DATOS PERSONALES ===== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Datos Personales</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                type="text"
                name="firstName"
                value={step1Data.firstName}
                onChange={handleStep1Change}
                placeholder="Juan"
                error={step1Errors.firstName}
                required
              />

              <Input
                label="Apellido"
                type="text"
                name="lastName"
                value={step1Data.lastName}
                onChange={handleStep1Change}
                placeholder="Pérez"
                error={step1Errors.lastName}
                required
              />
            </div>

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={step1Data.email}
              onChange={handleStep1Change}
              placeholder="juan.perez@email.com"
              error={step1Errors.email}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Tipo de documento"
                name="documentType"
                value={step1Data.documentType}
                onChange={handleStep1Change}
                options={documentTypeOptions}
                error={step1Errors.documentType}
                required
              />

              <Input
                label="Número de documento"
                type="text"
                name="documentNumber"
                value={step1Data.documentNumber}
                onChange={handleStep1Change}
                placeholder="12345678"
                error={step1Errors.documentNumber}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Fecha de nacimiento"
                type="date"
                name="birthDate"
                value={step1Data.birthDate}
                onChange={handleStep1Change}
                error={step1Errors.birthDate}
              />

              <Select
                label="Género"
                name="gender"
                value={step1Data.gender}
                onChange={handleStep1Change}
                options={genderOptions}
                error={step1Errors.gender}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Teléfono"
                type="tel"
                name="phone"
                value={step1Data.phone}
                onChange={handleStep1Change}
                placeholder="+51 999 999 999"
                error={step1Errors.phone}
              />

              <Input
                label="Dirección"
                type="text"
                name="address"
                value={step1Data.address}
                onChange={handleStep1Change}
                placeholder="Av. Principal 123"
                error={step1Errors.address}
              />
            </div>

            {/* Foto del estudiante */}
            <div className="border-t pt-6">
              <ImageUpload
                label="Foto del estudiante"
                aspectRatio="16:9"
                required
                onImageSelect={handlePhotoSelect}
                error={photoError}
              />
              <p className="text-xs text-gray-500 mt-2">
                La foto debe ser horizontal (16:9), del pecho hacia arriba, similar a una foto de documento.
              </p>
            </div>
          </div>
        )}

        {/* ===== PASO 2: DATOS ACADÉMICOS ===== */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Datos Académicos</h2>

            <Select
              label="Sede"
              name="sedeId"
              value={step2Data.sedeId}
              onChange={handleStep2Change}
              options={sedeOptions}
              error={step2Errors.sedeId}
              required
            />

            <Select
              label="Período académico"
              name="periodId"
              value={step2Data.periodId}
              onChange={handleStep2Change}
              options={periodOptions}
              error={step2Errors.periodId}
              required
            />

            <Select
              label="Turno"
              name="turnId"
              value={step2Data.turnId}
              onChange={handleStep2Change}
              options={turnOptions}
              error={step2Errors.turnId}
              required
            />

            <Select
              label="Sección"
              name="sectionId"
              value={step2Data.sectionId}
              onChange={handleStep2Change}
              options={sectionOptions}
              error={step2Errors.sectionId}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Nota:</strong> Si seleccionas "Auto-asignar sección", el sistema asignará 
                automáticamente la primera sección disponible según la prioridad configurada. 
                También puedes seleccionar una sección específica manualmente.
              </p>
            </div>
          </div>
        )}

        {/* ===== PASO 3: PLAN DE PAGO ===== */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Plan de Pago</h2>

            <Select
              label="Plan de pago"
              name="paymentPlanId"
              value={step3Data.paymentPlanId}
              onChange={handleStep3Change}
              options={paymentPlanOptions}
              error={step3Errors.paymentPlanId}
              required
            />

            {/* Mostrar detalles del plan seleccionado */}
            {step3Data.paymentPlanId && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                {(() => {
                  const plan = paymentPlans.find(p => p.id === step3Data.paymentPlanId);
                  if (!plan) return null;

                  return (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-800">{plan.name}</h3>
                      {plan.description && (
                        <p className="text-sm text-gray-600">{plan.description}</p>
                      )}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-gray-500">Monto base</p>
                          <p className="text-lg font-semibold">S/ {plan.baseAmount.toFixed(2)}</p>
                        </div>
                        {plan.discount > 0 && (
                          <div>
                            <p className="text-xs text-gray-500">Descuento</p>
                            <p className="text-lg font-semibold text-green-600">-{plan.discount}%</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500">Monto final</p>
                          <p className="text-lg font-semibold text-blue-600">S/ {plan.finalAmount.toFixed(2)}</p>
                        </div>
                        {plan.installments && (
                          <div>
                            <p className="text-xs text-gray-500">Cuotas</p>
                            <p className="text-lg font-semibold">{plan.installments}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ===== PASO 4: CONFIRMACIÓN ===== */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Confirmar Registro</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ <strong>Importante:</strong> Verifica que todos los datos sean correctos antes de confirmar. 
                Una vez registrado, algunos datos solo podrán ser modificados por un administrador.
              </p>
            </div>

            {/* Resumen de datos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Datos personales */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Datos Personales</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Nombre completo</dt>
                    <dd className="font-medium">{step1Data.firstName} {step1Data.lastName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Correo</dt>
                    <dd className="font-medium">{step1Data.email}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Documento</dt>
                    <dd className="font-medium">{step1Data.documentType}: {step1Data.documentNumber}</dd>
                  </div>
                  {step1Data.phone && (
                    <div>
                      <dt className="text-gray-500">Teléfono</dt>
                      <dd className="font-medium">{step1Data.phone}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Datos académicos */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Datos Académicos</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Sede</dt>
                    <dd className="font-medium">
                      {sedes.find(s => s.id === step2Data.sedeId)?.name || '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Período</dt>
                    <dd className="font-medium">
                      {periods.find(p => p.id === step2Data.periodId)?.name || '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Turno</dt>
                    <dd className="font-medium">
                      {turns.find(t => t.id === step2Data.turnId)?.name || '-'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Sección</dt>
                    <dd className="font-medium">
                      {step2Data.sectionId
                        ? sections.find(s => s.id === step2Data.sectionId)?.name || 'Manual'
                        : 'Auto-asignada'
                      }
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Plan de pago */}
              <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                <h3 className="font-medium text-gray-800 mb-3">Plan de Pago</h3>
                {(() => {
                  const plan = paymentPlans.find(p => p.id === step3Data.paymentPlanId);
                  if (!plan) return <p className="text-gray-500">No seleccionado</p>;

                  return (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        {plan.installments && (
                          <p className="text-sm text-gray-500">{plan.installments} cuotas</p>
                        )}
                      </div>
                      <p className="text-xl font-bold text-blue-600">
                        S/ {plan.finalAmount.toFixed(2)}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ===== PASO 5: RESULTADO ===== */}
        {currentStep === 5 && registrationResult && (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="h-10 w-10 text-green-600" />
            </div>

            <h2 className="text-xl font-bold text-gray-800">
              ¡Estudiante registrado exitosamente!
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
              <h3 className="font-medium text-blue-800 mb-4">Credenciales de acceso</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-blue-600">Correo electrónico</dt>
                  <dd className="font-mono font-medium">{registrationResult.user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-blue-600">Contraseña temporal</dt>
                  <dd className="font-mono font-medium text-lg">{registrationResult.temporaryPassword}</dd>
                </div>
              </dl>
              <p className="text-sm text-blue-600 mt-4">
                📧 Comparte estas credenciales con el estudiante. 
                La contraseña tiene el formato: INICIAL_DEL_NOMBRE + _ + DNI
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
              <h3 className="font-medium text-gray-800 mb-2">Resumen de matrícula</h3>
              <p className="text-sm text-gray-600">
                Sección: {registrationResult.enrollment.section.name} | 
                Salón: {registrationResult.enrollment.section.classroom} | 
                Turno: {registrationResult.enrollment.section.turn}
              </p>
              <p className="text-sm text-gray-600">
                Plan de pago: {registrationResult.enrollment.paymentPlan.name} | 
                Monto: S/ {registrationResult.enrollment.paymentPlan.finalAmount.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                variant="primary"
                onClick={handleDownloadCard}
              >
                <span className="flex items-center">
                  📄 Descargar ficha de matrícula
                </span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  // Resetear formulario
                  setCurrentStep(1);
                  setStep1Data({
                    firstName: '', lastName: '', email: '',
                    documentType: 'DNI', documentNumber: '',
                    birthDate: '', gender: '', phone: '', address: '',
                  });
                  setStep2Data({ sedeId: '', periodId: '', turnId: '', sectionId: '' });
                  setStep3Data({ paymentPlanId: '' });
                  setStudentPhoto(null);
                  setRegistrationResult(null);
                }}
              >
                Registrar otro estudiante
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/enrollments')}
              >
                Ir a lista de estudiantes
              </Button>
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 ? (
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                <span className="flex items-center">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Anterior
                </span>
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={nextStep}
              >
                <span className="flex items-center">
                  Siguiente
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </span>
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleSubmit}
                isLoading={isSubmitting}
              >
                <span className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-2" />
                  Confirmar registro
                </span>
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};