import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Role } from '../../types';
import api from '../../api/axios';
import { usersService, type AdminUser } from '../../api/users.service';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { getZodErrors, type FormErrors } from '../../utils/zodHelpers';

// Schema de validación para crear usuario
const createUserSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  documentNumber: z.string().optional(),
  documentType: z.string().optional(),
  role: z.nativeEnum(Role, { message: 'Selecciona un rol válido' }),
});

type CreateUserData = z.infer<typeof createUserSchema>;

const roleOptions = Object.values(Role).map((role) => ({
  value: role,
  label: role.replace('_', ' '),
}));

// Solo roles administrativos para el filtro
const adminRoleOptions = [
  { value: '', label: 'Todos los roles' },
  { value: Role.ADMIN, label: 'ADMIN' },
  { value: Role.INFORMATICO, label: 'INFORMATICO' },
  { value: Role.SECRETARIA, label: 'SECRETARIA' },
  { value: Role.COORDINADOR, label: 'COORDINADOR' },
];

export const UsersPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    documentNumber: '',
    documentType: '',
    role: Role.ESTUDIANTE,
  });
  const [errors, setErrors] = useState<FormErrors<CreateUserData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Estado para la tabla de usuarios
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');

  // Cargar usuarios
  const loadUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    try {
      const data = await usersService.findAll(
        searchTerm || undefined,
        filterRole ? (filterRole as Role) : undefined
      );
      setUsers(data);
    } catch (error: any) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [searchTerm, filterRole]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadUsers();
    }, 300); // Debounce para la búsqueda

    return () => clearTimeout(debounceTimer);
  }, [loadUsers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CreateUserData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      createUserSchema.parse(formData);
      return true;
    } catch (error) {
      const fieldErrors = getZodErrors<CreateUserData>(error);
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      setSuccessMessage(`Usuario ${response.data.user.email} creado exitosamente`);
      
      // Resetear el formulario
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        documentNumber: '',
        documentType: '',
        role: Role.ESTUDIANTE,
      });
      setShowForm(false);
      
      // Recargar la lista de usuarios
      loadUsers();
    } catch (error: any) {
      const message = error.response?.data?.message;
      setErrorMessage(Array.isArray(message) ? message.join(', ') : message || 'Error al crear usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleActive = async (userId: string) => {
    try {
      await usersService.toggleActive(userId);
      loadUsers();
    } catch (error: any) {
      setErrorMessage('Error al cambiar el estado del usuario');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
        <Button
          variant="primary"
          onClick={() => setShowForm(!showForm)}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            {showForm ? 'Cancelar' : 'Nuevo Usuario'}
          </span>
        </Button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {showForm && (
        <Card>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Crear Nuevo Usuario</h2>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Juan"
                error={errors.firstName}
                required
              />

              <Input
                label="Apellido"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Pérez"
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@ejemplo.com"
              error={errors.email}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Tipo de documento"
                type="text"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                placeholder="DNI"
                error={errors.documentType}
              />

              <Input
                label="Número de documento"
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                placeholder="12345678"
                error={errors.documentNumber}
              />
            </div>

            <Select
              label="Rol"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              error={errors.role}
              required
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
              >
                Crear Usuario
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Filtros y búsqueda */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {adminRoleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="overflow-x-auto">
          {isLoadingUsers ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No se encontraron usuarios administrativos
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roles
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
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {user.profile?.firstName?.[0]}{user.profile?.lastName?.[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.profile?.firstName} {user.profile?.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.memberships.map((membership, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                          >
                            {membership.role.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isActive ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-5 w-5 mr-1" />
                          Activo
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircleIcon className="h-5 w-5 mr-1" />
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant={user.isActive ? 'danger' : 'success'}
                        onClick={() => handleToggleActive(user.id)}
                        className="text-xs px-2 py-1"
                      >
                        {user.isActive ? 'Desactivar' : 'Activar'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};