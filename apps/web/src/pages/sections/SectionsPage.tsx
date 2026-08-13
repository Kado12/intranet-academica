import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import {
  sectionsService,
  classroomsService,
  turnsService,
  periodsService,
} from '../../api/academic.service';
import type { Section, Classroom, Turn, AcademicPeriod } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { getZodErrors } from '../../utils/zodHelpers';
import { Pagination } from '../../components/ui/Pagination';

// Schema de validación
const sectionSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  capacity: z.string().optional(),
  priority: z.string().min(1, 'La prioridad es requerida'), // ← NUEVO
  classroomId: z.string().min(1, 'Selecciona un salón'),
  turnId: z.string().min(1, 'Selecciona un turno'),
  periodId: z.string().min(1, 'Selecciona un período'),
});

type SectionFormData = z.infer<typeof sectionSchema>;

export const SectionsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Filtros
  const [filters] = useState({
    sedeId: '',
    turnId: '',
    periodId: '',
    search: '',
  });

  const [sections, setSections] = useState<Section[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [formData, setFormData] = useState<SectionFormData>({
    name: '',
    capacity: '',
    priority: '1',
    classroomId: '',
    turnId: '',
    periodId: '',
  });
  const [errors, setErrors] = useState<Partial<SectionFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; section: Section | null }>({
    isOpen: false,
    section: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadSections = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.sedeId) params.append('sedeId', filters.sedeId);
      if (filters.turnId) params.append('turnId', filters.turnId);
      if (filters.periodId) params.append('periodId', filters.periodId);
      if (filters.search) params.append('search', filters.search);
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());

      const [classroomData, turnsData, periodsData] = await Promise.all([
        classroomsService.findAll(),
        turnsService.findAll(),
        periodsService.findAll(),
      ]);
      console.log(classroomData)
      setClassrooms(classroomData.data)
      setTurns(turnsData)
      setPeriods(periodsData)
      const dataSection = await sectionsService.findAll(params)
      setSections(dataSection.data)
      setPagination(dataSection.pagination);
    } catch (error) {
      addToast('error', 'Error al cargar secciones');
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, addToast]);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  // Handler de cambio de página
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleItemsPerPageChange = (limit: number) => {
    setPagination(prev => ({ ...prev, limit, page: 1 }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SectionFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      sectionSchema.parse(formData);
      return true;
    } catch (error) {
      const fieldErrors = getZodErrors<SectionFormData>(error);
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data = {
        name: formData.name,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        priority: formData.priority ? parseInt(formData.priority) : 1,
        classroomId: formData.classroomId,
        turnId: formData.turnId,
        periodId: formData.periodId,
      };

      if (editingSection) {
        await sectionsService.update(editingSection.id, data);
        addToast('success', 'Sección actualizada exitosamente');
      } else {
        await sectionsService.create(data);
        addToast('success', 'Sección creada exitosamente');
      }

      setShowForm(false);
      setEditingSection(null);
      resetForm();
      loadSections();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar la sección');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      capacity: '',
      priority: '1',
      classroomId: '',
      turnId: '',
      periodId: '',
    });
    setErrors({});
  };

  const handleEdit = (section: Section) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      capacity: section.capacity?.toString() || '',
      priority: (section as any).priority?.toString() || '1',
      classroomId: section.classroomId,
      turnId: section.turnId,
      periodId: section.periodId,
    });
    setShowForm(true);
  };

  const handleDeleteClick = (section: Section) => {
    setDeleteModal({ isOpen: true, section });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.section) return;

    setIsDeleting(true);

    try {
      await sectionsService.remove(deleteModal.section.id);
      addToast('success', 'Sección eliminada exitosamente');
      setDeleteModal({ isOpen: false, section: null });
      loadSections();
    } catch (error: any) {
      addToast('error', 'Error al eliminar la sección');
    } finally {
      setIsDeleting(false);
    }
  };

  const classroomOptions = [
    { value: '', label: 'Selecciona un salón' },
    ...classrooms.map((c) => ({ value: c.id, label: `${c.name} (${c.sede?.name || ''})` })),
  ];

  const turnOptions = [
    { value: '', label: 'Selecciona un turno' },
    ...turns.map((t) => ({ value: t.id, label: t.name })),
  ];

  const periodOptions = [
    { value: '', label: 'Selecciona un período' },
    ...periods.map((p) => ({ value: p.id, label: `${p.name} (${p.status})` })),
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Secciones</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingSection(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nueva Sección
          </span>
        </Button>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingSection(null);
          resetForm();
        }}
        title={editingSection ? 'Editar Sección' : 'Nueva Sección'}
        size="lg"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre de la sección"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="A"
            error={errors.name}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Salón"
              name="classroomId"
              value={formData.classroomId}
              onChange={handleChange}
              options={classroomOptions}
              error={errors.classroomId}
              required
            />

            <Select
              label="Turno"
              name="turnId"
              value={formData.turnId}
              onChange={handleChange}
              options={turnOptions}
              error={errors.turnId}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Período académico"
              name="periodId"
              value={formData.periodId}
              onChange={handleChange}
              options={periodOptions}
              error={errors.periodId}
              required
            />

            <Input
              label="Capacidad"
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="30"
              error={errors.capacity}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prioridad de llenado"
              type="number"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              placeholder="1"
              min="1"
              error={errors.priority}
              required
            />
            <div className="flex items-end">
              <p className="text-xs text-gray-500">
                💡 Las secciones con prioridad 1 se llenan primero. 
                Usa 1, 2, 3... para controlar el orden de auto-asignación.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingSection(null);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              {editingSection ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, section: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Sección"
        message={`¿Estás seguro de que deseas eliminar la sección "${deleteModal.section?.name}"?`}
        isLoading={isDeleting}
      />

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AcademicCapIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay secciones registradas
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turno
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sections.map((section) => (
                  <tr key={section.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          {section.classroom?.name} - {section.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.classroom?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.turn?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.period?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {section.capacity || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {(section as any).priority || 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(section)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(section)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.total}
              itemsPerPage={pagination.limit}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        )}
      </Card>
    </div>
  );
};