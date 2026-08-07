import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { sedesService } from '../../api/academic.service';
import type { Sede } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

// Schema de validación
const sedeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type SedeFormData = z.infer<typeof sedeSchema>;

export const SedesPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  
  // Estado de la lista
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estado del formulario
  const [showForm, setShowForm] = useState(false);
  const [editingSede, setEditingSede] = useState<Sede | null>(null);
  const [formData, setFormData] = useState<SedeFormData>({
    name: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<SedeFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del modal de eliminación
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; sede: Sede | null }>({
    isOpen: false,
    sede: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Cargar sedes
  const loadSedes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await sedesService.findAll();
      setSedes(data);
    } catch (error: any) {
      addToast('error', 'Error al cargar las sedes');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadSedes();
  }, [loadSedes]);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SedeFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validar formulario
  const validateForm = (): boolean => {
    try {
      sedeSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<SedeFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof SedeFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  // Crear o actualizar sede
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (editingSede) {
        await sedesService.update(editingSede.id, formData);
        addToast('success', 'Sede actualizada exitosamente');
      } else {
        await sedesService.create(formData);
        addToast('success', 'Sede creada exitosamente');
      }
      
      setShowForm(false);
      setEditingSede(null);
      resetForm();
      loadSedes();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar la sede');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({ name: '', address: '', phone: '' });
    setErrors({});
  };

  // Abrir modal de edición
  const handleEdit = (sede: Sede) => {
    setEditingSede(sede);
    setFormData({
      name: sede.name,
      address: sede.address || '',
      phone: sede.phone || '',
    });
    setShowForm(true);
  };

  // Abrir modal de eliminación
  const handleDeleteClick = (sede: Sede) => {
    setDeleteModal({ isOpen: true, sede });
  };

  // Confirmar eliminación
  const handleDeleteConfirm = async () => {
    if (!deleteModal.sede) return;

    setIsDeleting(true);

    try {
      await sedesService.remove(deleteModal.sede.id);
      addToast('success', 'Sede eliminada exitosamente');
      setDeleteModal({ isOpen: false, sede: null });
      loadSedes();
    } catch (error: any) {
      addToast('error', 'Error al eliminar la sede');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Notificaciones */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Sedes</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingSede(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nueva Sede
          </span>
        </Button>
      </div>

      {/* Modal de formulario */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingSede(null);
          resetForm();
        }}
        title={editingSede ? 'Editar Sede' : 'Nueva Sede'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Sede Central"
            error={errors.name}
            required
          />

          <Input
            label="Dirección"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Av. Principal 123"
            error={errors.address}
          />

          <Input
            label="Teléfono"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+51 999 999 999"
            error={errors.phone}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingSede(null);
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
              {editingSede ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, sede: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Sede"
        message={`¿Estás seguro de que deseas eliminar la sede "${deleteModal.sede?.name}"? Esta acción no se puede deshacer.`}
        isLoading={isDeleting}
      />

      {/* Tabla de sedes */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : sedes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay sedes registradas
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dirección
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teléfono
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
                {sedes.map((sede) => (
                  <tr key={sede.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{sede.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sede.address || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {sede.phone || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        sede.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {sede.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(sede)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(sede)}
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
          </div>
        )}
      </Card>
    </div>
  );
};