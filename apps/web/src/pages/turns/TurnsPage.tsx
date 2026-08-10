import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { turnsService } from '../../api/academic.service';
import type { Turn } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import { getZodErrors } from '../../utils/zodHelpers';

// Schema de validación
const turnSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

type TurnFormData = z.infer<typeof turnSchema>;

export const TurnsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast()

  // Estado de la lista
  const [turns, setTurns] = useState<Turn[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Estado del formulario
  const [showForm, setShowForm] = useState(false);
  const [editingTurn, setEditingTurn] = useState<Turn | null>(null);
  const [formData, setFormData] = useState<TurnFormData>({
    name: '',
    startTime: '',
    endTime: '',
  });
  const [errors, setErrors] = useState<Partial<TurnFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado del modal de eliminación
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; turn: Turn | null }>({
    isOpen: false,
    turn: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // Cargar turnos
  const loadTurns = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await turnsService.findAll();
      setTurns(data);
    } catch (error: any) {
      addToast('error', 'Error al cargar los turnos');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadTurns();
  }, [loadTurns]);

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof TurnFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validar formulario
  const validateForm = (): boolean => {
    try {
      turnSchema.parse(formData);
      return true;
    } catch (error) {
      const fieldErrors = getZodErrors<TurnFormData>(error);
      setErrors(fieldErrors);
      return false;
    }
  };

  // Crear o actualizar sede
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (editingTurn) {
        await turnsService.update(editingTurn.id, formData);
        addToast('success', 'Turno actualizado exitosamente');
      } else {
        await turnsService.create(formData);
        addToast('success', 'Turno creado exitosamente');
      }

      setShowForm(false);
      setEditingTurn(null);
      resetForm();
      loadTurns();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar el turno');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({ name: '', startTime: '', endTime: '' });
    setErrors({});
  };

  // Abrir modal de edición
  const handleEdit = (turn: Turn) => {
    setEditingTurn(turn);
    setFormData({
      name: turn.name,
      startTime: turn.startTime || '',
      endTime: turn.endTime || '',
    });
    setShowForm(true);
  };

  // Abrir modal de eliminación
  const handleDeleteClick = (turn: Turn) => {
    setDeleteModal({ isOpen: true, turn });
  };

  // Confirmar eliminación
  const handleDeleteConfirm = async () => {
    if (!deleteModal.turn) return;

    setIsDeleting(true);

    try {
      await turnsService.remove(deleteModal.turn.id);
      addToast('success', 'Turno eliminado exitosamente');
      setDeleteModal({ isOpen: false, turn: null });
      loadTurns();
    } catch (error: any) {
      addToast('error', 'Error al eliminar elw turno');
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
            setEditingTurn(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Turno
          </span>
        </Button>
      </div>

      {/* Modal de formulario */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTurn(null);
          resetForm();
        }}
        title={editingTurn ? 'Editar Turno' : 'Nuevo Turno'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Mañana"
            error={errors.name}
            required
          />

          <Input
            label="Hora de Inicio"
            type="text"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            placeholder="08:00 AM"
            error={errors.startTime}
          />

          <Input
            label="Hora de Fin"
            type="text"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            placeholder="12:45 PM"
            error={errors.endTime}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingTurn(null);
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
              {editingTurn ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, turn: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Turno"
        message={`¿Estás seguro de que deseas eliminar la sede "${deleteModal.turn?.name}"? Esta acción no se puede deshacer.`}
        isLoading={isDeleting}
      />

      {/* Tabla de sedes */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : turns.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BuildingOfficeIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay turnos registrados
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
                    Inicio de Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fin de Hora
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
                {turns.map((turn) => (
                  <tr key={turn.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{turn.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {turn.startTime || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {turn.endTime || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${turn.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {turn.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(turn)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(turn)}
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
}