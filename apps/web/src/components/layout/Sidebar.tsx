import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import {
  HomeIcon,
  BuildingOfficeIcon,
  Square2StackIcon,
  ClockIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  UserGroupIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  BanknotesIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  CheckCircleIcon,
  PresentationChartBarIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  path: string;
  label: string;
  icon: any;
  roles?: Role[];
}

interface MenuGroup {
  title: string;
  icon?: any;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasAnyRole, logout } = useAuth();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Estudiantes']);

  // ===== MENÚ AGRUPADO =====

  const menuGroups: MenuGroup[] = [
    {
      title: 'Principal',
      items: [
        {
          path: '/dashboard',
          label: 'Dashboard',
          icon: HomeIcon,
        },
      ],
    },
    {
      title: 'Gestión Académica',
      icon: AcademicCapIcon,
      items: [
        {
          path: '/sedes',
          label: 'Sedes',
          icon: BuildingOfficeIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA],
        },
        {
          path: '/classrooms',
          label: 'Salones',
          icon: Square2StackIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA],
        },
        {
          path: '/turns',
          label: 'Turnos',
          icon: ClockIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA],
        },
        {
          path: '/periods',
          label: 'Períodos',
          icon: CalendarDaysIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA],
        },
        {
          path: '/sections',
          label: 'Secciones',
          icon: UserGroupIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA],
        },
        {
          path: '/courses',
          label: 'Cursos',
          icon: AcademicCapIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA, Role.COORDINADOR],
        },
      ],
    },
    {
      title: 'Estudiantes',
      icon: UserPlusIcon,
      items: [
        {
          path: '/students/register',
          label: 'Inscripción',
          icon: UserPlusIcon,
          roles: [Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR],
        },
        {
          path: '/enrollments',
          label: 'Matrículas',
          icon: ClipboardDocumentListIcon,
          roles: [Role.ADMIN, Role.SECRETARIA, Role.COORDINADOR],
        },
        {
          path: '/attendance/students',
          label: 'Asistencia Alumnos',
          icon: CheckCircleIcon,
          roles: [Role.DOCENTE, Role.COORDINADOR, Role.ADMIN, Role.INFORMATICO],
        },
      ],
    },
    {
      title: 'Pagos',
      icon: BanknotesIcon,
      items: [
        {
          path: '/payment-plans',
          label: 'Planes de Pago',
          icon: CreditCardIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA],
        },
        {
          path: '/payments',
          label: 'Seguimiento de Pagos',
          icon: BanknotesIcon,
          roles: [Role.ADMIN, Role.INFORMATICO, Role.SECRETARIA, Role.COORDINADOR],
        },
      ],
    },
    {
      title: 'Docentes',
      icon: UsersIcon,
      items: [
        {
          path: '/attendance/teachers',
          label: 'Asistencia Docentes',
          icon: CheckCircleIcon,
          roles: [Role.COORDINADOR, Role.ADMIN, Role.INFORMATICO],
        },
      ],
    },
    {
      title: 'Usuarios',
      icon: UsersIcon,
      items: [
        {
          path: '/users',
          label: 'Gestión de Usuarios',
          icon: UsersIcon,
          roles: [Role.ADMIN, Role.INFORMATICO],
        },
      ],
    },
    {
      title: 'Sistema',
      icon: ClipboardDocumentIcon,
      items: [
        {
          path: '/audit',
          label: 'Historial de Cambios',
          icon: ClipboardDocumentIcon,
          roles: [Role.ADMIN, Role.INFORMATICO],
        },
      ],
    },
  ];

  // ===== TOGGLE DE GRUPOS =====

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev =>
      prev.includes(title)
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  // ===== FILTRAR ITEMS POR ROL =====

  const filterItemsByRole = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      if (!item.roles || item.roles.length === 0) return true;
      return hasAnyRole(item.roles);
    });
  };

  // ===== RENDER =====

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-lg font-bold text-gray-800">
              🎓 Intranet Académica
            </h1>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Usuario */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center">
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </span>
                </div>
              )}
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.roles?.join(', ') || 'Usuario'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-3 w-full text-sm text-red-600 hover:text-red-700 text-left"
            >
              Cerrar sesión
            </button>
          </div>

          {/* Menú */}
          <nav className="flex-1 overflow-y-auto p-2">
            {menuGroups.map((group) => {
              const filteredItems = filterItemsByRole(group.items);
              
              // No renderizar grupos sin items visibles
              if (filteredItems.length === 0) return null;

              const isExpanded = expandedGroups.includes(group.title);

              return (
                <div key={group.title} className="mb-2">
                  {/* Header del grupo */}
                  {group.title !== 'Principal' && (
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
                    >
                      <span>{group.title}</span>
                      <svg
                        className={`h-4 w-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {/* Items del grupo */}
                  {(group.title === 'Principal' || isExpanded) && (
                    <ul className="space-y-1 mt-1">
                      {filteredItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              className={({ isActive }) => `
                                flex items-center px-3 py-2 rounded-lg text-sm font-medium
                                transition-colors
                                ${isActive
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'text-gray-700 hover:bg-gray-50'
                                }
                              `}
                            >
                              <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                              {item.label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t text-xs text-gray-400">
            © 2026 Intranet Académica
          </div>
        </div>
      </aside>
    </>
  );
};