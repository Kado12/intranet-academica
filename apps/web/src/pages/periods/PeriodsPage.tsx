import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { periodsService } from '../../api/academic.service';
import { type AcademicPeriod, PeriodStatus } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import { getZodErrors, type FormErrors } from '../../utils/zodHelpers';

// Schema de validación
const periodSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  startDate: z.string().min(1, 'La fecha de inicio es requerida'),
  endDate: z.string().min(1, 'La fecha de fin es requerida'),
  status: z.nativeEnum(PeriodStatus).optional(),
});

type PeriodFormData = z.infer<typeof periodSchema>;

const statusOptions = [
  { value: PeriodStatus.DRAFT, label: 'Borrador' },
  { value: PeriodStatus.ACTIVE, label: 'Activo' },
  { value: PeriodStatus.FINISHED, label: 'Finalizado' },
];

export const PeriodsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  
  const [periods, setPeriods] = useState<AcademicPeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<AcademicPeriod | null>(null);
  const [formData, setFormData] = useState<PeriodFormData>({
    name: '',
    startDate: '',
    endDate: '',
    status: PeriodStatus.DRAFT,
  });
  const [errors, setErrors] = useState<FormErrors<PeriodFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; period: AcademicPeriod | null }>({
    isOpen: false,
    period: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadPeriods = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await periodsService.findAll();
      setPeriods(data);
    } catch (error: any) {
      addToast('error', 'Error al cargar los períodos');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadPeriods();
  }, [loadPeriods]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof PeriodFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      const data = periodSchema.parse(formData);
      
      // Validar que la fecha de inicio sea anterior a la fecha de fin
      if (new Date(data.startDate) >= new Date(data.endDate)) {
        setErrors({ endDate: 'La fecha de fin debe ser posterior a la fecha de inicio' });
        return false;
      }
      
      return true;
    } catch (error) {
      const fieldErrors = getZodErrors<PeriodFormData>(error);
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (editingPeriod) {
        await periodsService.update(editingPeriod.id, formData);
        addToast('success', 'Período actualizado exitosamente');
      } else {
        await periodsService.create(formData);
        addToast('success', 'Período creado exitosamente');
      }
      
      setShowForm(false);
      setEditingPeriod(null);
      resetForm();
      loadPeriods();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar el período');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      status: PeriodStatus.DRAFT,
    });
    setErrors({});
  };

  const handleEdit = (period: AcademicPeriod) => {
    setEditingPeriod(period);
    setFormData({
      name: period.name,
      startDate: period.startDate.split('T')[0],
      endDate: period.endDate.split('T')[0],
      status: period.status,
    });
    setShowForm(true);
  };

  const handleDeleteClick = (period: AcademicPeriod) => {
    setDeleteModal({ isOpen: true, period });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.period) return;

    setIsDeleting(true);

    try {
      await periodsService.remove(deleteModal.period.id);
      addToast('success', 'Período eliminado exitosamente');
      setDeleteModal({ isOpen: false, period: null });
      loadPeriods();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al eliminar el período');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleActivate = async (period: AcademicPeriod) => {
    try {
      await periodsService.activate(period.id);
      addToast('success', `Período ${period.name} activado`);
      loadPeriods();
    } catch (error: any) {
      addToast('error', 'Error al activar el período');
    }
  };

  const getStatusBadge = (status: PeriodStatus) => {
    const styles = {
      [PeriodStatus.DRAFT]: 'bg-gray-100 text-gray-800',
      [PeriodStatus.ACTIVE]: 'bg-green-100 text-green-800',
      [PeriodStatus.FINISHED]: 'bg-blue-100 text-blue-800',
    };

    const labels = {
      [PeriodStatus.DRAFT]: 'Borrador',
      [PeriodStatus.ACTIVE]: 'Activo',
      [PeriodStatus.FINISHED]: 'Finalizado',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Períodos Académicos</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingPeriod(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Período
          </span>
        </Button>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPeriod(null);
          resetForm();
        }}
        title={editingPeriod ? 'Editar Período' : 'Nuevo Período'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="2026-I"
            error={errors.name}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Fecha de inicio"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              required
            />

            <Input
              label="Fecha de fin"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}
              error={errors.endDate}
              required
            />
          </div>

          <Select
            label="Estado"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingPeriod(null);
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
              {editingPeriod ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, period: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Período"
        message={`¿Estás seguro de que deseas eliminar el período "${deleteModal.period?.name}"? Solo se pueden eliminar períodos en estado borrador.`}
        isLoading={isDeleting}
      />

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : periods.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CalendarIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay períodos académicos registrados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Período
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inicio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {periods.map((period) => (
                  <tr key={period.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{period.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(period.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(period.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(period.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {period.status === PeriodStatus.DRAFT && (
                          <button
                            onClick={() => handleActivate(period)}
                            className="text-green-600 hover:text-green-900"
                            title="Activar período"
                          >
                            <PlayIcon className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(period)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        {period.status === PeriodStatus.DRAFT && (
                          <button
                            onClick={() => handleDeleteClick(period)}
                            className="text-red-600 hover:text-red-900"
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