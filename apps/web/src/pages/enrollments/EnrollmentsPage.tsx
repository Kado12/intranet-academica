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
import type { Section, Sede, Turn, AcademicPeriod } from '../../types';
import {
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  UserIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { studentsRegistrationService } from '../../api/students-registration.service';
import { ImageUpload } from '../../components/ui/ImageUpload';
import { exportsService } from '../../api/exports.service';
import { ExportFiltersModal } from '../../components/export/ExportFiltersModal';
import { Pagination } from '../../components/ui/Pagination';

export const EnrollmentsPage: React.FC = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const { toasts, addToast, removeToast } = useToast();

  // Estados para modales de exportación
  const [showStudentsExportModal, setShowStudentsExportModal] = useState(false);
  const [showPaymentsExportModal, setShowPaymentsExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Datos
  const [enrollments, setEnrollments] = useState<EnrollmentResponse[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [paymentPlans, setPaymentPlans] = useState<PaymentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(isExporting,periods)

  // Filtros
  const [filters, setFilters] = useState<EnrollmentFilters>({});
  const [searchTerm, setSearchTerm] = useState('');

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
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; enrollment: EnrollmentResponse | null }>({
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
      const response = await enrollmentsService.findAll({
        ...filters,
        search: searchTerm || undefined,
        page: pagination.page,
        limit: pagination.limit,
      });
      
      setEnrollments(response.data);
      setPagination(response.pagination);
    } catch (error) {
      addToast('error', 'Error al cargar las matrículas');
    } finally {
      setIsLoading(false);
    }
  }, [filters, searchTerm, pagination.page, pagination.limit, addToast]);

  const loadInitialData = useCallback(async () => {
    try {
      const [sectionsData, sedesData, turnsData, periodsData, plansData] = await Promise.all([
        sectionsService.findAll(),
        sedesService.findAll(),
        turnsService.findAll(),
        periodsService.findAll(),
        paymentPlansService.findAll(),
      ]);
      setSections(sectionsData.data);
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
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilters(prev => ({
      ...prev,
      search: value || undefined,
    }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleItemsPerPageChange = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
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
      // Eliminar completamente al estudiante
      const result = await studentsRegistrationService.deleteStudentCompletely(
        deleteModal.enrollment.student?.id || ''
      );

      addToast('success', `Estudiante ${result.deletedUser.name} eliminado completamente`);
      setDeleteModal({ isOpen: false, enrollment: null });
      loadEnrollments();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al eliminar el estudiante');
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
        avatarPublicId = uploadResult.tempPublicId;
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

  const handleExportStudents = async (filters: any) => {
    setIsExporting(true);
    try {
      await exportsService.downloadStudentsList({
        sedeId: filters.sedeId || undefined,
        turnId: filters.turnId || undefined,
        classroomId: filters.classroomId || undefined,
        sectionId: filters.sectionId || undefined,
        search: filters.search || undefined,
      });
      addToast('success', 'Excel de alumnos descargado');
    } catch (error) {
      addToast('error', 'Error al descargar el Excel');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPayments = async (filters: any) => {
    setIsExporting(true);
    try {
      await exportsService.downloadPaymentStatus({
        sedeId: filters.sedeId || undefined,
        turnId: filters.turnId || undefined,
        sectionId: filters.sectionId || undefined,
        search: filters.search || undefined,
      });
      addToast('success', 'Excel de pagos descargado');
    } catch (error) {
      addToast('error', 'Error al descargar el Excel');
    } finally {
      setIsExporting(false);
    }
  };

  // ===== OPCIONES PARA SELECTS =====

  const sectionOptions = [
    { value: '', label: 'Selecciona una sección' },
    ...sections.map((s) => ({
      value: s.id,
      label: `${s.name || ''} - ${s.name} (${s.turn?.name || ''})`,
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

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestión de Matrículas</h1>
          <p className="text-sm text-gray-500 mt-1">
            Vista de estudiantes inscritos. Para registrar nuevos estudiantes, usa la página de inscripción.
          </p>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => setShowStudentsExportModal(true)}
            className="flex items-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Excel Alumnos
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowPaymentsExportModal(true)}
            className="flex items-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Excel Pagos
          </Button>
        </div>
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

      {/* Modal de exportación de alumnos */}
      <ExportFiltersModal
        isOpen={showStudentsExportModal}
        onClose={() => setShowStudentsExportModal(false)}
        onExport={handleExportStudents}
        title="Descargar Lista de Alumnos"
      />

      {/* Modal de exportación de pagos */}
      <ExportFiltersModal
        isOpen={showPaymentsExportModal}
        onClose={() => setShowPaymentsExportModal(false)}
        onExport={handleExportPayments}
        title="Descargar Estado de Pagos"
        showPaymentFilters
      />

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
                options={sectionOptions}
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
        title="⚠️ Eliminar Estudiante Completamente"
        message={`Esta acción eliminará TODOS los datos de ${deleteModal.enrollment?.student?.profile?.firstName} ${deleteModal.enrollment?.student?.profile?.lastName} (DNI: ${deleteModal.enrollment?.student?.profile?.documentNumber || 'N/A'}):\n\n• Perfil del usuario\n• Foto de Cloudinary\n• Matrículas y pagos\n• Asistencias y calificaciones\n• Historial académico\n\nEsta acción NO se puede deshacer. ¿Estás completamente seguro?`}
        confirmText="Sí, eliminar todo"
        cancelText="Cancelar"
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
                            title="Eliminar estudiante completamente (HARD DELETE)"
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
            {pagination.total > 0 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </div>
        )}
      </Card>
    </div>
  );
};