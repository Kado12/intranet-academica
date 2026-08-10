import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  CalendarIcon,
  Square3Stack3DIcon,
  BookOpenIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  XMarkIcon,
  UserPlusIcon,
  ClockIcon,
  CreditCardIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: Role[];
}

const menuItems: MenuItem[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
  },
  {
    path: '/sedes',
    label: 'Sedes',
    icon: BuildingOfficeIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA],
  },
  {
    path: '/periods',
    label: 'Períodos',
    icon: CalendarIcon,
    roles: [Role.ADMIN, Role.COORDINADOR],
  },
  {
    path: '/classrooms',
    label: 'Salones',
    icon: Square3Stack3DIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA],
  },
  {
    path: '/turns',
    label: 'Turnos',
    icon: ClockIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA],
  },
  {
    path: '/sections',
    label: 'Secciones',
    icon: AcademicCapIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA],
  },
  {
    path: '/courses',
    label: 'Cursos',
    icon: BookOpenIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.DOCENTE],
  },
  {
    path: '/enrollments',
    label: 'Matrículas',
    icon: ClipboardDocumentListIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA],
  },
  {
    path: '/users',
    label: 'Usuarios',
    icon: UserGroupIcon,
    roles: [Role.ADMIN],
  },
  {
    path: '/parents',
    label: 'Padres',
    icon: UsersIcon,
    roles: [Role.ADMIN, Role.COORDINADOR, Role.SECRETARIA],
  },
  {
    path: '/students/register',
    label: 'Registrar Estudiante',
    icon: UserPlusIcon,
    roles: [Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR],
  },
  {
    path: '/payment-plans',
    label: 'Planes de Pago',
    icon: CreditCardIcon,
    roles: [Role.ADMIN, Role.SECRETARIA],
  },
  {
    path: '/payments',
    label: 'Seguimiento de Pagos',
    icon: BanknotesIcon,
    roles: [Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR],
  },
  {
    path: '/audit',
    label: 'Historial de Cambios',
    icon: ClipboardDocumentListIcon,
    roles: [Role.ADMIN, Role.INFORMATICO],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, hasAnyRole, logout } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    return hasAnyRole(item.roles);
  });

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
          <h1 className="text-xl font-bold">Intranet Académica</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center px-4 py-3 mt-2 rounded-lg
                  transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white text-sm"
            >
              Salir
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};