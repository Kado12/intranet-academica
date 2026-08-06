import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <Card>
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Bienvenido, {user?.firstName} {user?.lastName}
        </h2>
        <p className="text-gray-600">
          Has iniciado sesión correctamente en la Intranet Académica.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-gray-500">Tus roles</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {user?.roles.map((role) => (
              <span
                key={role}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
              >
                {role.replace('_', ' ')}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-500">Correo electrónico</h3>
          <p className="mt-2 text-lg font-semibold text-gray-800">{user?.email}</p>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-gray-500">Estado</h3>
          <p className="mt-2 text-lg font-semibold text-green-600">Activo</p>
        </Card>
      </div>
    </div>
  );
};