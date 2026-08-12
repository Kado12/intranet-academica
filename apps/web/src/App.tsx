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
import { TurnsPage } from './pages/turns/TurnsPage';
import { SectionsPage } from './pages/sections/SectionsPage';
import { CoursesPage } from './pages/courses/CoursesPage';
import { EnrollmentsPage } from './pages/enrollments/EnrollmentsPage';
import { StudentRegistrationPage } from './pages/students/StudentRegistrationPage';
import { PaymentPlansPage } from './pages/payment-plans/PaymentPlansPage';
import { PaymentsPage } from './pages/payments/PaymentsPage';
import { AuditPage } from './pages/audit/AuditPage';
import { Role } from './types';
import { TeacherAttendancePage } from './pages/attendance/TeacherAttendancePage';
import { StudentAttendancePage } from './pages/attendance/StudentAttendancePage';

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
                <Route path="/audit" element={<AuditPage />} />
                <Route path="/payment-plans" element={<PaymentPlansPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
              </Route>

              {/* Página de usuarios: solo ADMIN e INFORMATICO o COORDINADOR */}
              <Route element={<ProtectedRoute roles={[Role.ADMIN, Role.INFORMATICO, Role.COORDINADOR]} />}>
                <Route path="/attendance/students" element={<StudentAttendancePage />} />
                <Route path="/attendance/teachers" element={<TeacherAttendancePage />} />
              </Route>

              {/* Módulos académicos */}
              <Route path="/sedes" element={<SedesPage />} />
              <Route path="/periods" element={<PeriodsPage />} />
              <Route path="/classrooms" element={<ClassroomsPage />} />
              <Route path="/turns" element={<TurnsPage />} />
              <Route path="/sections" element={<SectionsPage/>} />
              <Route path="/courses" element={<CoursesPage/>} />
              <Route path="/enrollments" element={<EnrollmentsPage/>} />
              <Route path="/students/register" element={<StudentRegistrationPage />} />

              {/* Placeholder para rutas futuras */}
              <Route path="/parents" element={<div className="p-4">Módulo de Padres (próximamente)</div>} />
              <Route path="/payment-plans" element={<div className="p-4">Módulo de Padres (próximamente)</div>} />
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