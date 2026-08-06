import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UsersPage } from './pages/users/UsersPage';
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

              {/* Placeholder para rutas futuras */}
              <Route path="/sedes" element={<div className="p-4">Módulo de Sedes (próximamente)</div>} />
              <Route path="/periods" element={<div className="p-4">Módulo de Períodos (próximamente)</div>} />
              <Route path="/classrooms" element={<div className="p-4">Módulo de Salones (próximamente)</div>} />
              <Route path="/sections" element={<div className="p-4">Módulo de Secciones (próximamente)</div>} />
              <Route path="/courses" element={<div className="p-4">Módulo de Cursos (próximamente)</div>} />
              <Route path="/enrollments" element={<div className="p-4">Módulo de Matrículas (próximamente)</div>} />
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