import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UsersPage } from './pages/users/UsersPage';
import { SedesPage } from './pages/sedes/SedesPage';
import { PeriodsPage } from './pages/periods/PeriodsPage';
import { ClassroomsPage } from './pages/classrooms/ClassroomsPage';
import { SectionsPage } from './pages/sections/SectionsPage';
import { CoursesPage } from './pages/courses/CoursesPage';
import { EnrollmentsPage } from './pages/enrollments/EnrollmentsPage';
import { StudentRegistrationPage } from './pages/students/StudentRegistrationPage';
import { Role } from './types';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública: solo login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Página de usuarios: solo ADMIN e INFORMATICO */}
              <Route element={<ProtectedRoute roles={[Role.ADMIN, Role.INFORMATICO]} />}>
                <Route path="/users" element={<UsersPage />} />
              </Route>

              {/* Módulos académicos */}
              <Route path="/sedes" element={<SedesPage />} />
              <Route path="/periods" element={<PeriodsPage />} />
              <Route path="/classrooms" element={<ClassroomsPage />} />
              <Route path="/sections" element={<SectionsPage/>} />
              <Route path="/courses" element={<CoursesPage/>} />
              <Route path="/enrollments" element={<EnrollmentsPage/>} />
              <Route path="/students/register" element={<StudentRegistrationPage />} />

              {/* Placeholder para rutas futuras */}
              <Route path="/parents" element={<div className="p-4">Módulo de Padres (próximamente)</div>} />
            </Route>
          </Route>

          {/* Redirigir rutas desconocidas al dashboard si está autenticado, o al login si no */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;