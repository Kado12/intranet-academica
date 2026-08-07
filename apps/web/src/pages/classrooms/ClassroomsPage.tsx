import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { classroomsService, sedesService } from '../../api/academic.service';
import type { Classroom, Sede } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Square3Stack3DIcon,
} from '@heroicons/react/24/outline';

// Schema de validación
const classroomSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  location: z.string().optional(),
  capacity: z.string().optional(),
  sedeId: z.string().min(1, 'Selecciona una sede'),
});

type ClassroomFormData = z.infer<typeof classroomSchema>;

export const ClassroomsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);
  const [formData, setFormData] = useState<ClassroomFormData>({
    name: '',
    location: '',
    capacity: '',
    sedeId: '',
  });
  const [errors, setErrors] = useState<Partial<ClassroomFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; classroom: Classroom | null }>({
    isOpen: false,
    classroom: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [classroomsData, sedesData] = await Promise.all([
        classroomsService.findAll(),
        sedesService.findAll(),
      ]);
      setClassrooms(classroomsData);
      setSedes(sedesData);
    } catch (error: any) {
      addToast('error', 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ClassroomFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      classroomSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<ClassroomFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ClassroomFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
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
        location: formData.location || undefined,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        sedeId: formData.sedeId,
      };

      if (editingClassroom) {
        await classroomsService.update(editingClassroom.id, data);
        addToast('success', 'Salón actualizado exitosamente');
      } else {
        await classroomsService.create(data);
        addToast('success', 'Salón creado exitosamente');
      }
      
      setShowForm(false);
      setEditingClassroom(null);
      resetForm();
      loadData();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar el salón');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', location: '', capacity: '', sedeId: '' });
    setErrors({});
  };

  const handleEdit = (classroom: Classroom) => {
    setEditingClassroom(classroom);
    setFormData({
      name: classroom.name,
      location: classroom.location || '',
      capacity: classroom.capacity?.toString() || '',
      sedeId: classroom.sedeId,
    });
    setShowForm(true);
  };

  const handleDeleteClick = (classroom: Classroom) => {
    setDeleteModal({ isOpen: true, classroom });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.classroom) return;

    setIsDeleting(true);

    try {
      await classroomsService.remove(deleteModal.classroom.id);
      addToast('success', 'Salón eliminado exitosamente');
      setDeleteModal({ isOpen: false, classroom: null });
      loadData();
    } catch (error: any) {
      addToast('error', 'Error al eliminar el salón');
    } finally {
      setIsDeleting(false);
    }
  };

  const sedeOptions = [
    { value: '', label: 'Selecciona una sede' },
    ...sedes.map((sede) => ({ value: sede.id, label: sede.name })),
  ];

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Salones</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingClassroom(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Salón
          </span>
        </Button>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingClassroom(null);
          resetForm();
        }}
        title={editingClassroom ? 'Editar Salón' : 'Nuevo Salón'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Salón 7"
            error={errors.name}
            required
          />

          <Select
            label="Sede"
            name="sedeId"
            value={formData.sedeId}
            onChange={handleChange}
            options={sedeOptions}
            error={errors.sedeId}
            required
          />

          <Input
            label="Ubicación"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Segundo piso"
            error={errors.location}
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

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingClassroom(null);
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
              {editingClassroom ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, classroom: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Salón"
        message={`¿Estás seguro de que deseas eliminar el salón "${deleteModal.classroom?.name}"?`}
        isLoading={isDeleting}
      />

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : classrooms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Square3Stack3DIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay salones registrados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salón
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sede
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ubicación
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classrooms.map((classroom) => (
                  <tr key={classroom.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Square3Stack3DIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{classroom.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classroom.sede?.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classroom.location || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classroom.capacity || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(classroom)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(classroom)}
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