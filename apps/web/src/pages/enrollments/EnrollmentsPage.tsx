import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input'
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { sectionsService, enrollmentsService, type EnrollmentResponse, type EnrollmentFilters } from '../../api/academic.service';
import { sedesService, turnsService, periodsService } from '../../api/academic.service';
import { paymentPlansService, type PaymentPlan } from '../../api/payment-plans.service';
import { studentsService, type StudentUser } from '../../api/students.service';
import type { Section, Sede, Turn, AcademicPeriod } from '../../types';
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { studentsRegistrationService } from '../../api/students-registration.service';
import { ImageUpload } from '../../components/ui/ImageUpload';

interface Enrollment {
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

export const EnrollmentsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  // Datos
  const [enrollments, setEnrollments] = useState<EnrollmentResponse[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filtros
  const [filters, setFilters] = useState<EnrollmentFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal de nueva matrícula
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ studentId: '', sectionId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal de edición/transferencia
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEnrollment, setEditingEnrollment] = useState<EnrollmentResponse | null>(null);
  const [editFormData, setEditFormData] = useState({
    mode: 'auto' as 'auto' | 'manual',
    sedeId: '',
    turnId: '',
    sectionId: '',
    paymentPlanId: '',
    reason: '',
  });
  const [isTransferring, setIsTransferring] = useState(false);

  // Modal de edición de perfil de estudiante
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [profileFormData, setProfileFormData] = useState<any>({});
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);

  // Modal de eliminacion
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; enrollment: Enrollment | null }>({
    isOpen: false,
    enrollment: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Reseteo de contraseña
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // ===== CARGAR DATOS =====

  const loadEnrollments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await enrollmentsService.findAll(filters);
      setEnrollments(data);
    } catch (error) {
      addToast('error', 'Error al cargar las matrículas');
    } finally {
      setIsLoading(false);
    }
  }, [filters, addToast]);

  const loadInitialData = useCallback(async () => {
    try {
      const [sectionsData, studentsData, sedesData, turnsData, periodsData, plansData] = await Promise.all([
        sectionsService.findAll(),
        studentsService.findAll(),
        sedesService.findAll(),
        turnsService.findAll(),
        periodsService.findAll(),
        paymentPlansService.findAll(),
      ]);
      setSections(sectionsData);
      setStudents(studentsData);
      setSedes(sedesData);
      setTurns(turnsData);
      setPeriods(periodsData);
      setPaymentPlans(plansData);
    } catch (error) {
      console.error('Error al cargar datos iniciales:', error);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadEnrollments();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [loadEnrollments]);

  // ===== HANDLERS DE FILTROS =====

  const handleFilterChange = (name: keyof EnrollmentFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilters(prev => ({
      ...prev,
      search: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  // ===== HANDLERS DE NUEVA MATRÍCULA =====

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentId || !formData.sectionId) {
      addToast('error', 'Selecciona un estudiante y una sección');
      return;
    }

    setIsSubmitting(true);

    try {
      await enrollmentsService.create(formData);
      addToast('success', 'Estudiante matriculado exitosamente');
      setShowForm(false);
      setFormData({ studentId: '', sectionId: '' });
      loadEnrollments();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al matricular');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== HANDLERS DE EDICIÓN/TRANSFERENCIA =====

  const handleEditClick = (enrollment: EnrollmentResponse) => {
    setEditingEnrollment(enrollment);
    setEditFormData({
      mode: 'auto',
      sedeId: enrollment.section?.classroom?.sede?.id || '',
      turnId: enrollment.section?.turn?.id || '',
      sectionId: '',
      paymentPlanId: enrollment.paymentPlan?.id || '',
      reason: '',
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingEnrollment) return;

    setIsTransferring(true);

    try {
      const transferData: any = {
        reason: editFormData.reason || undefined,
      };

      if (editFormData.mode === 'manual' && editFormData.sectionId) {
        transferData.sectionId = editFormData.sectionId;
      } else if (editFormData.mode === 'auto') {
        transferData.sedeId = editFormData.sedeId;
        transferData.turnId = editFormData.turnId;
      }

      if (editFormData.paymentPlanId) {
        transferData.paymentPlanId = editFormData.paymentPlanId;
      }

      await enrollmentsService.transfer(editingEnrollment.id, transferData);
      addToast('success', 'Transferencia realizada exitosamente');
      setShowEditModal(false);
      setEditingEnrollment(null);
      loadEnrollments();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error en la transferencia');
    } finally {
      setIsTransferring(false);
    }
  };

  // ===== HANDLERS DE ELIMINACIÓN =====

  const handleDeleteClick = (enrollment: EnrollmentResponse) => {
    setDeleteModal({ isOpen: true, enrollment });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.enrollment) return;

    setIsDeleting(true);

    try {
      await enrollmentsService.remove(deleteModal.enrollment.id);
      addToast('success', 'Matrícula retirada exitosamente');
      setDeleteModal({ isOpen: false, enrollment: null });
      loadEnrollments();
    } catch (error: any) {
      addToast('error', 'Error al retirar la matrícula');
    } finally {
      setIsDeleting(false);
    }
  };

    // ===== HANDLERS DE EDICIÓN DE PERFIL =====

  const handleEditProfileClick = (enrollment: EnrollmentResponse) => {
    const student = enrollment.student;
    const profile = student?.profile;
    
    setEditingStudent({
      userId: student?.id,
      email: student?.email,
      ...profile,
      currentDocumentNumber: profile?.documentNumber, // Guardar DNI original
    });

    setProfileFormData({
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      documentType: profile?.documentType || 'DNI',
      documentNumber: profile?.documentNumber || '',
      birthDate: profile?.birthDate ? profile.birthDate.split('T')[0] : '',
      gender: profile?.gender || '',
      phone: profile?.phone || '',
      address: profile?.address || '',
      email: student?.email || '',
    });

    setProfilePhotoPreview(profile?.avatarUrl || null);
    setProfilePhoto(null);
    setShowProfileModal(true);
  };

  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoSelect = (file: File) => {
    setProfilePhoto(file);
    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingStudent?.userId) return;

    setIsUpdatingProfile(true);

    try {
      // 1. Si cambió el DNI y hay nueva foto, subirla con el nuevo DNI
      let avatarUrl = profileFormData.avatarUrl;
      let avatarPublicId = profileFormData.avatarPublicId;

      if (profilePhoto) {
        const uploadResult = await studentsRegistrationService.uploadStudentPicture(
          profilePhoto,
          profileFormData.documentNumber,
        );
        avatarUrl = uploadResult.tempAvatarUrl;
        avatarPublicId = uploadResult.tempAvatarPublicId;
      }

      // 2. Actualizar perfil
      const updateData: any = { ...profileFormData };
      
      if (avatarUrl) {
        updateData.avatarUrl = avatarUrl;
        updateData.avatarPublicId = avatarPublicId;
      }

      // Limpiar campos vacíos
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === '' || updateData[key] === undefined) {
          delete updateData[key];
        }
      });

      await studentsRegistrationService.updateStudentProfile(
        editingStudent.userId,
        updateData
      );

      addToast('success', 'Datos del estudiante actualizados exitosamente');
      setShowProfileModal(false);
      setEditingStudent(null);
      loadEnrollments();

    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al actualizar el perfil');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleDownloadPdf = async (enrollment: EnrollmentResponse) => {
    try {
      const blob = await studentsRegistrationService.downloadEnrollmentCard(enrollment.id);

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ficha-${enrollment.student?.profile?.firstName || 'estudiante'}-${enrollment.student?.profile?.documentNumber || 'sindni'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      addToast('success', 'Ficha descargada exitosamente');
    } catch (error) {
      addToast('error', 'Error al descargar la ficha');
    }
  };

  // ===== HANDLERS DE RESETEO DE CONTRASEÑA =====

  const handleResetPasswordClick = () => {
    setShowPasswordConfirm(true);
  };

  const handleConfirmResetPassword = async () => {
    if (!editingStudent?.userId) return;

    setIsResettingPassword(true);
    setShowPasswordConfirm(false);

    try {
      const response = await studentsRegistrationService.resetPassword(editingStudent.userId);
      setTempPassword(response.temporaryPassword);
      addToast('success', 'Contraseña reseteada exitosamente');
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al resetear contraseña');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleCopyPassword = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      addToast('success', 'Contraseña copiada al portapapeles');
    }
  };

  // ===== OPCIONES PARA SELECTS =====

  const studentOptions = [
    { value: '', label: 'Selecciona un estudiante' },
    ...students.map((s) => ({
      value: s.id,
      label: `${s.profile?.firstName || ''} ${s.profile?.lastName || ''} (${s.email})`,
    })),
  ];

  const sectionOptions = [
    { value: '', label: 'Selecciona una sección' },
    ...sections.map((s) => ({
      value: s.id,
      label: `${s.classroom?.name || ''} - ${s.name} (${s.turn?.name || ''})`,
    })),
  ];

  const sedeOptions = [
    { value: '', label: 'Selecciona una sede' },
    ...sedes.map((s) => ({ value: s.id, label: s.name })),
  ];

  const turnOptions = [
    { value: '', label: 'Selecciona un turno' },
    ...turns.map((t) => ({ value: t.id, label: t.name })),
  ];

  const paymentPlanOptions = [
    { value: '', label: 'Selecciona un plan de pago' },
    ...paymentPlans.map((p) => ({
      value: p.id,
      label: `${p.name} - S/ ${p.finalAmount.toFixed(2)}`,
    })),
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      WITHDRAWN: 'bg-red-100 text-red-800',
      TRANSFERRED: 'bg-yellow-100 text-yellow-800',
      COMPLETED: 'bg-blue-100 text-blue-800',
    };

    const labels: Record<string, string> = {
      ACTIVE: 'Activa',
      INACTIVE: 'Inactiva',
      WITHDRAWN: 'Retirada',
      TRANSFERRED: 'Transferida',
      COMPLETED: 'Completada',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || styles.INACTIVE}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Matrículas</h1>
        <Button
          variant="primary"
          onClick={() => setShowForm(true)}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nueva Matrícula
          </span>
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Buscar por nombre, apellido o documento..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filtros */}
          <select
            value={filters.sedeId || ''}
            onChange={(e) => handleFilterChange('sedeId', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las sedes</option>
            {sedes.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={filters.turnId || ''}
            onChange={(e) => handleFilterChange('turnId', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los turnos</option>
            {turns.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <select
            value={filters.sectionId || ''}
            onChange={(e) => handleFilterChange('sectionId', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos las secciones</option>
            {sections.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={filters.paymentPlanId || ''}
            onChange={(e) => handleFilterChange('paymentPlanId', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los planes</option>
            {paymentPlans.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Botón limpiar filtros */}
          {(filters.sedeId || filters.turnId || filters.paymentPlanId || searchTerm) && (
            <Button variant="secondary" onClick={clearFilters}>
              Limpiar
            </Button>
          )}
        </div>
      </Card>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setFormData({ studentId: '', sectionId: '' });
        }}
        title="Nueva Matrícula"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Select
            label="Estudiante"
            name="studentId"
            value={formData.studentId}
            onChange={handleFormChange}
            options={studentOptions}
            required
          />

          <Select
            label="Sección"
            name="sectionId"
            value={formData.sectionId}
            onChange={handleFormChange}
            options={sectionOptions}
            required
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setFormData({ studentId: '', sectionId: '' });
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Matricular
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de edición/transferencia */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingEnrollment(null);
        }}
        title="Editar Matrícula"
        size="lg"
      >
        {editingEnrollment && (
          <form className="space-y-4" onSubmit={handleTransfer}>
            {/* Información actual */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Matrícula actual</h3>
              <p className="text-sm text-gray-600">
                Estudiante: {editingEnrollment.student?.profile?.firstName} {editingEnrollment.student?.profile?.lastName}
              </p>
              <p className="text-sm text-gray-600">
                Sección: {editingEnrollment.section?.classroom?.name} - {editingEnrollment.section?.name}
              </p>
              <p className="text-sm text-gray-600">
                Turno: {editingEnrollment.section?.turn?.name}
              </p>
            </div>

            {/* Modo de cambio */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tipo de cambio</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value="auto"
                    checked={editFormData.mode === 'auto'}
                    onChange={handleEditChange}
                    className="mr-2"
                  />
                  Auto-asignar sección
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mode"
                    value="manual"
                    checked={editFormData.mode === 'manual'}
                    onChange={handleEditChange}
                    className="mr-2"
                  />
                  Elegir sección específica
                </label>
              </div>
            </div>

            {editFormData.mode === 'auto' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Sede"
                  name="sedeId"
                  value={editFormData.sedeId}
                  onChange={handleEditChange}
                  options={sedeOptions}
                />
                <Select
                  label="Turno"
                  name="turnId"
                  value={editFormData.turnId}
                  onChange={handleEditChange}
                  options={turnOptions}
                />
              </div>
            ) : (
              <Select
                label="Sección"
                name="sectionId"
                value={editFormData.sectionId}
                onChange={handleEditChange}
                options={[
                  { value: '', label: 'Selecciona una sección' },
                  ...sections.map((s) => ({
                    value: s.id,
                    label: `${s.classroom?.name || ''} - ${s.name} (${s.turn?.name || ''})`,
                  })),
                ]}
              />
            )}

            <Select
              label="Plan de pago"
              name="paymentPlanId"
              value={editFormData.paymentPlanId}
              onChange={handleEditChange}
              options={paymentPlanOptions}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo del cambio
              </label>
              <textarea
                name="reason"
                value={editFormData.reason}
                onChange={handleEditChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Cambio solicitado por el padre..."
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleDownloadPdf(editingEnrollment)}
                className="w-full"
              >
                <span className="flex items-center justify-center">
                  📄 Descargar Ficha PDF Actualizada
                </span>
              </Button>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingEnrollment(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary" isLoading={isTransferring}>
                <span className="flex items-center">
                  <ArrowPathIcon className="h-4 w-4 mr-2" />
                  Aplicar cambios
                </span>
              </Button>
            </div>
          </form>
        )}
      </Modal>
      {/* Modal de edición de perfil del estudiante */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setEditingStudent(null);
          setProfilePhoto(null);
        }}
        title="Editar Datos del Estudiante"
        size="lg"
      >
        {editingStudent && (
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Nota:</strong> Al cambiar el número de documento, la foto también se actualizará 
                con el nuevo documento como identificador en Cloudinary.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                type="text"
                name="firstName"
                value={profileFormData.firstName || ''}
                onChange={handleProfileFormChange}
                required
              />

              <Input
                label="Apellido"
                type="text"
                name="lastName"
                value={profileFormData.lastName || ''}
                onChange={handleProfileFormChange}
                required
              />
            </div>

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={profileFormData.email || ''}
              onChange={handleProfileFormChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Tipo de documento"
                name="documentType"
                value={profileFormData.documentType || ''}
                onChange={handleProfileFormChange}
                options={[
                  { value: 'DNI', label: 'DNI' },
                  { value: 'CE', label: 'Carné de Extranjería' },
                  { value: 'Pasaporte', label: 'Pasaporte' },
                ]}
              />

              <Input
                label="Número de documento"
                type="text"
                name="documentNumber"
                value={profileFormData.documentNumber || ''}
                onChange={handleProfileFormChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Fecha de nacimiento"
                type="date"
                name="birthDate"
                value={profileFormData.birthDate || ''}
                onChange={handleProfileFormChange}
              />

              <Select
                label="Género"
                name="gender"
                value={profileFormData.gender || ''}
                onChange={handleProfileFormChange}
                options={[
                  { value: '', label: 'No especificado' },
                  { value: 'M', label: 'Masculino' },
                  { value: 'F', label: 'Femenino' },
                  { value: 'Otro', label: 'Otro' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Teléfono"
                type="tel"
                name="phone"
                value={profileFormData.phone || ''}
                onChange={handleProfileFormChange}
                placeholder="+51 999 999 999"
              />

              <Input
                label="Dirección"
                type="text"
                name="address"
                value={profileFormData.address || ''}
                onChange={handleProfileFormChange}
                placeholder="Av. Principal 123"
              />
            </div>

            {/* Foto del estudiante */}
            <div className="border-t pt-4">
              <ImageUpload
                label="Foto del estudiante (opcional)"
                aspectRatio="16:9"
                required={false}
                onImageSelect={handleProfilePhotoSelect}
                previewUrl={profilePhotoPreview || undefined}
                onRemove={() => {
                  setProfilePhoto(null);
                  setProfilePhotoPreview(editingStudent.avatarUrl || null);
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Si seleccionas una nueva foto, reemplazará la foto actual. 
                Se guardará con el número de documento actual como identificador.
              </p>
            </div>

            <div className="border-t pt-4 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  // Buscar el enrollment correspondiente al estudiante
                  const enrollment = enrollments.find(e => e.student?.id === editingStudent?.userId);
                  if (enrollment) {
                    handleDownloadPdf(enrollment);
                  }
                }}
                className="w-full"
              >
                <span className="flex items-center justify-center">
                  📄 Descargar Ficha PDF
                </span>
              </Button>
            </div>

            {/* Sección de Reseteo de Contraseña */}
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-800">Seguridad</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    La contraseña se reseteará al formato: INICIAL_DEL_NOMBRE + _ + DNI
                  </p>
                </div>
                <Button
                  type="button"
                  variant="danger"
                  onClick={handleResetPasswordClick}
                  isLoading={isResettingPassword}
                >
                  <span className="flex items-center text-sm">
                    🔑 Resetear contraseña
                  </span>
                </Button>
              </div>

              {/* Mostrar contraseña temporal si existe */}
              {tempPassword && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800 mb-1">
                        ⚠️ Contraseña temporal generada
                      </p>
                      <p className="text-xs text-yellow-700 mb-3">
                        Comparte esta contraseña con el estudiante. La necesitará para iniciar sesión.
                      </p>
                      <div className="bg-white border border-yellow-300 rounded px-3 py-2 font-mono text-lg font-bold text-yellow-900">
                        {tempPassword}
                      </div>
                    </div>
                    <button
                      onClick={handleCopyPassword}
                      className="ml-2 p-2 text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100 rounded"
                      title="Copiar contraseña"
                    >
                      📋
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTempPassword(null)}
                    className="mt-2 text-xs text-yellow-600 hover:text-yellow-800"
                  >
                    ✕ Ocultar
                  </button>
                </div>
              )}
            </div>

            {/* Modal de confirmación para reseteo */}
            <ConfirmModal
              isOpen={showPasswordConfirm}
              onClose={() => setShowPasswordConfirm(false)}
              onConfirm={handleConfirmResetPassword}
              title="Resetear Contraseña"
              message={`¿Estás seguro de que deseas resetear la contraseña de ${editingStudent?.firstName} ${editingStudent?.lastName}? Se generará una nueva contraseña temporal.`}
              confirmText="Sí, resetear"
              isLoading={isResettingPassword}
            />

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowProfileModal(false);
                  setEditingStudent(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="primary" isLoading={isUpdatingProfile}>
                Guardar cambios
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, enrollment: null })}
        onConfirm={handleDeleteConfirm}
        title="Retirar Matrícula"
        message={`¿Estás seguro de que deseas retirar la matrícula de ${deleteModal.enrollment?.student?.profile?.firstName} ${deleteModal.enrollment?.student?.profile?.lastName}?`}
        isLoading={isDeleting}
      />

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : enrollments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ClipboardDocumentListIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay matrículas registradas
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sede</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Turno</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha de Inscripción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {enrollment.student?.profile?.avatarUrl ? (
                          <img
                            src={enrollment.student.profile.avatarUrl}
                            alt="Foto"
                            className="h-10 w-10 rounded-full object-cover mr-3"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium text-sm">
                              {enrollment.student?.profile?.firstName?.[0]}
                              {enrollment.student?.profile?.lastName?.[0]}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {enrollment.student?.profile?.firstName} {enrollment.student?.profile?.lastName}
                          </p>
                          <p className="text-xs text-gray-500">{enrollment.student?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.student?.profile?.documentNumber || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.section?.classroom?.sede?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.section?.classroom?.name} - {enrollment.section?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.section?.turn?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.paymentPlan?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.enrolledAt 
                        ? new Date(enrollment.enrolledAt).toLocaleDateString('es-PE', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* Editar perfil */}
                        <button
                          onClick={() => handleEditProfileClick(enrollment)}
                          className="text-green-600 hover:text-green-900"
                          title="Editar datos del estudiante"
                        >
                          <UserIcon className="h-5 w-5" />
                        </button>
                        {/* Editar Matricula */}
                        <button
                          onClick={() => handleEditClick(enrollment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar matrícula"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        {/* Descargar ficha PDF */}
                        <button
                          onClick={() => handleDownloadPdf(enrollment)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Descargar ficha PDF"
                        >
                          <ClipboardDocumentListIcon className="h-5 w-5" />
                        </button>
                        {/* Eliminar Matricula */}
                        {enrollment.status === 'ACTIVE' && (
                          <button
                            onClick={() => handleDeleteClick(enrollment)}
                            className="text-red-600 hover:text-red-900"
                            title="Retirar matrícula"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};