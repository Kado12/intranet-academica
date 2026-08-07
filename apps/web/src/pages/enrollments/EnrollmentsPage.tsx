import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { sectionsService, enrollmentsService } from '../../api/academic.service';
import { studentsService, type StudentUser } from '../../api/students.service';
import type { Section } from '../../types';
import {
  PlusIcon,
  TrashIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

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
  
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    sectionId: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; enrollment: Enrollment | null }>({
    isOpen: false,
    enrollment: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [enrollmentsData, sectionsData, studentsData] = await Promise.all([
        enrollmentsService.findAll(),
        sectionsService.findAll(),
        studentsService.findAll(),
      ]);
      setEnrollments(enrollmentsData);
      setSections(sectionsData);
      setStudents(studentsData);
    } catch (error: any) {
      addToast('error', 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      loadData();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al matricular al estudiante');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (enrollment: Enrollment) => {
    setDeleteModal({ isOpen: true, enrollment });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.enrollment) return;

    setIsDeleting(true);

    try {
      await enrollmentsService.remove(deleteModal.enrollment.id);
      addToast('success', 'Matrícula retirada exitosamente');
      setDeleteModal({ isOpen: false, enrollment: null });
      loadData();
    } catch (error: any) {
      addToast('error', 'Error al retirar la matrícula');
    } finally {
      setIsDeleting(false);
    }
  };

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
      label: `${s.classroom?.name || ''} - ${s.name} (${s.turn?.name || ''}) - ${s.period?.name || ''}`,
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
            onChange={handleChange}
            options={studentOptions}
            required
          />

          <Select
            label="Sección"
            name="sectionId"
            value={formData.sectionId}
            onChange={handleChange}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map((enrollment) => (
                  <tr key={enrollment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {enrollment.student?.profile?.firstName} {enrollment.student?.profile?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enrollment.student?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.section?.classroom?.name} - {enrollment.section?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enrollment.section?.period?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(enrollment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {enrollment.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleDeleteClick(enrollment)}
                          className="text-red-600 hover:text-red-900"
                          title="Retirar matrícula"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
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