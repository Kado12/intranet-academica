import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { coursesService } from '../../api/academic.service';
import type { Course } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { getZodErrors } from '../../utils/zodHelpers';

// Schema de validación
const courseSchema = z.object({
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

export const CoursesPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    code: '',
    name: '',
    description: '',
  });
  const [errors, setErrors] = useState<Partial<CourseFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; course: Course | null }>({
    isOpen: false,
    course: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await coursesService.findAll();
      setCourses(data);
    } catch (error: any) {
      addToast('error', 'Error al cargar los cursos');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CourseFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      courseSchema.parse(formData);
      return true;
    } catch (error) {
      const fieldErrors = getZodErrors<CourseFormData>(error);
      setErrors(fieldErrors);
      return false;
    }
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (editingCourse) {
        await coursesService.update(editingCourse.id, formData);
        addToast('success', 'Curso actualizado exitosamente');
      } else {
        await coursesService.create(formData);
        addToast('success', 'Curso creado exitosamente');
      }

      setShowForm(false);
      setEditingCourse(null);
      resetForm();
      loadCourses();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar el curso');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ code: '', name: '', description: '' });
    setErrors({});
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      description: course.description || '',
    });
    setShowForm(true);
  };

  const handleDeleteClick = (course: Course) => {
    setDeleteModal({ isOpen: true, course });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.course) return;

    setIsDeleting(true);

    try {
      await coursesService.remove(deleteModal.course.id);
      addToast('success', 'Curso eliminado exitosamente');
      setDeleteModal({ isOpen: false, course: null });
      loadCourses();
    } catch (error: any) {
      addToast('error', 'Error al eliminar el curso');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Cursos</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingCourse(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Curso
          </span>
        </Button>
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingCourse(null);
          resetForm();
        }}
        title={editingCourse ? 'Editar Curso' : 'Nuevo Curso'}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Código"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="MAT"
              error={errors.code}
              required
            />

            <Input
              label="Nombre"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Matemática"
              error={errors.name}
              required
            />
          </div>

          <Input
            label="Descripción"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Curso de matemática básica"
            error={errors.description}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingCourse(null);
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
              {editingCourse ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, course: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Curso"
        message={`¿Estás seguro de que deseas eliminar el curso "${deleteModal.course?.name}"?`}
        isLoading={isDeleting}
      />

      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay cursos registrados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {course.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpenIcon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm font-medium text-gray-900">{course.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                      {course.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(course)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
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