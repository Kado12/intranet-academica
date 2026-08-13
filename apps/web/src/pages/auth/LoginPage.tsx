import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { AcademicCapIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { getZodErrors } from '../../utils/zodHelpers';

// Schema de validación con Zod
const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Limpiar errores al escribir
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      return true;
    } catch (error) {
      const fieldErrors = getZodErrors<LoginFormData>(error);
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setServerError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // ⚠️ CORRECCIÓN: Pasar email y password como parámetros separados
      await login(formData);
      navigate('/dashboard');
    } catch (error: any) {
      // ⚠️ CORRECCIÓN: Extraer correctamente el mensaje del backend
      let errorMessage = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
      
      if (error.response?.data?.message) {
        // Error del backend (Axios)
        const msg = error.response.data.message;
        errorMessage = Array.isArray(msg) ? msg.join(', ') : msg;
      } else if (error.message) {
        // Error de JavaScript
        errorMessage = error.message;
      } else if (error.request) {
        // Error de red
        errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión.';
      }
      
      setServerError(errorMessage);
      
      // Limpiar el campo de contraseña para que el usuario intente de nuevo
      setFormData(prev => ({ ...prev, password: '' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <AcademicCapIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Intranet Académica
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión para continuar
          </p>
        </div>

        <Card>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Mensaje de error del servidor */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                <ExclamationCircleIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{serverError}</span>
              </div>
            )}

            <Input
              label="Correo electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@intranet.edu"
              error={errors.email}
              required
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Si no tienes cuenta, contacta al administrador del sistema.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};