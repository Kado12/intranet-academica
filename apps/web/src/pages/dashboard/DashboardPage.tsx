import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { type StatisticsOverview, statisticsService } from '../../api/statistics.service';
import { Button } from '../../components/ui/Button';
import { AcademicCapIcon, ArrowDownTrayIcon, BanknotesIcon, BuildingOfficeIcon, CheckCircleIcon, ClockIcon, DocumentTextIcon, ExclamationCircleIcon, UserGroupIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { exportsService } from '../../api/exports.service';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
const PAYMENT_COLORS = {
  paid: '#10b981',
  pending: '#f59e0b',
  overdue: '#ef4444',
  waived: '#6b7280',
};

export const DashboardPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  
  const { user } = useAuth();

  const navigate = useNavigate();
  const [stats, setStats] = useState<StatisticsOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  // Cargar estadisticas

  const loadStats = useCallback(
    async () => {
      setIsLoading(true);
      try {
        const data = await statisticsService.getOverview();
        setStats(data);
      } catch (error) {
        console.error('Error al cargar estadisticas: ', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  )
  useEffect(() => {
    loadStats();
  }, [loadStats]);
  
  // ===== FORMATO DE FECHAS =====

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(amount);
  };

  // ===== RENDER =====

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se pudieron cargar las estadísticas</p>
        <Button variant="primary" onClick={loadStats} className="mt-4">
          Reintentar
        </Button>
      </div>
    );
  }

  // Datos para el gráfico de pagos
  const paymentChartData = [
    { name: 'Pagados', value: stats.payments.paid.count, color: PAYMENT_COLORS.paid },
    { name: 'Pendientes', value: stats.payments.pending.count, color: PAYMENT_COLORS.pending },
    { name: 'Vencidos', value: stats.payments.overdue.count, color: PAYMENT_COLORS.overdue },
  ].filter(item => item.value > 0);

  const handleExportSummary = async () => {
    try {
      await exportsService.downloadSummary();
      addToast('success', 'Resumen descargado');
    } catch (error) {
      addToast('error', 'Error al descargar');
    }
  };

  return (
    
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

          <Card>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Bienvenido, {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Resumen general del sistema · {new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Button
            variant="primary"
            onClick={() => navigate('/students/register')}
            className="flex items-center"
          >
            <UserPlusIcon className="h-4 w-4 mr-2" />
            Inscribir Estudiante
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/payments')}
            className="flex items-center"
          >
            <BanknotesIcon className="h-4 w-4 mr-2" />
            Ver Pagos
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/enrollments')}
            className="flex items-center"
          >
            <DocumentTextIcon className="h-4 w-4 mr-2" />
            Matrículas
          </Button>
          <Button
            variant="secondary"
            onClick={handleExportSummary}
            className="flex items-center"
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Resumen Excel
          </Button>
        </div>
      </div>

      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Estudiantes */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Estudiantes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.counts.totalStudents}
              </p>
              <p className="text-xs text-green-600 mt-1">Activos</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Matrículas */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Matrículas</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.counts.totalActiveEnrollments}
              </p>
              <p className="text-xs text-green-600 mt-1">Activas</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Sedes */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sedes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.counts.totalSedes}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {stats.counts.totalClassrooms} salones
              </p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <BuildingOfficeIcon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
        </Card>

        {/* Docentes */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Docentes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.counts.totalTeachers}
              </p>
              <p className="text-xs text-green-600 mt-1">Activos</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserGroupIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Total recaudado */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Recaudado</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {formatCurrency(stats.payments.totalCollected)}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                {formatCurrency(stats.payments.totalPending)} pendiente
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <BanknotesIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Graficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico: Matrículas por sede */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Matrículas por Sede
          </h2>
          {stats.charts.enrollmentsBySede.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.charts.enrollmentsBySede}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" name="Matrículas" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No hay datos disponibles</p>
          )}
        </Card>

        {/* Gráfico: Estado de pagos */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Estado de Pagos
          </h2>
          {paymentChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No hay pagos registrados</p>
          )}
        </Card>

        {/* Gráfico: Matrículas por mes */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Matrículas por Mes
          </h2>
          {stats.charts.enrollmentsByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.charts.enrollmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Matrículas"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No hay datos de los últimos 6 meses</p>
          )}
        </Card>

        {/* Gráfico: Distribución de planes de pago */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Planes de Pago
          </h2>
          {stats.charts.paymentPlansDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.charts.paymentPlansDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.charts.paymentPlansDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-12">No hay planes de pago asignados</p>
          )}
        </Card>
      </div>

      {/* Últimos registros y distribución por turno */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos registros */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Últimos Registros
            </h2>
            <Button
              variant="secondary"
              onClick={() => navigate('/enrollments')}
              className="text-sm"
            >
              Ver todos
            </Button>
          </div>

          {stats.recentEnrollments.length > 0 ? (
            <div className="space-y-3">
              {stats.recentEnrollments.map((enrollment: any) => (
                <div
                  key={enrollment.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    {enrollment.student?.profile?.avatarUrl ? (
                      <img
                        src={enrollment.student.profile.avatarUrl}
                        alt="Foto"
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium text-sm">
                          {enrollment.student?.profile?.firstName?.[0]}
                          {enrollment.student?.profile?.lastName?.[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {enrollment.student?.profile?.firstName}{' '}
                        {enrollment.student?.profile?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {enrollment.section?.classroom?.sede?.name} ·{' '}
                        {enrollment.section?.turn?.name} ·{' '}
                        {enrollment.section?.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {formatDate(enrollment.enrolledAt)}
                    </p>
                    {enrollment.paymentPlan && (
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                        {enrollment.paymentPlan.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No hay registros recientes</p>
          )}
        </Card>

        {/* Distribución por turno */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Distribución por Turno
          </h2>
          {stats.charts.enrollmentsByTurn.length > 0 ? (
            <div className="space-y-4">
              {stats.charts.enrollmentsByTurn.map((turn, index) => {
                const total = stats.charts.enrollmentsByTurn.reduce(
                  (sum, t) => sum + t.count, 0
                );
                const percentage = (turn.count / total) * 100;

                return (
                  <div key={turn.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {turn.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {turn.count} estudiantes ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">No hay datos disponibles</p>
          )}

          {/* Resumen de pagos */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Resumen de Pagos
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">
                    {stats.payments.paid.count}
                  </span>
                </div>
                <p className="text-xs text-green-700 mt-1">Pagados</p>
                <p className="text-sm font-medium text-green-800">
                  {formatCurrency(stats.payments.paid.amount)}
                </p>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <ClockIcon className="h-5 w-5 text-yellow-600" />
                  <span className="text-2xl font-bold text-yellow-600">
                    {stats.payments.pending.count}
                  </span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">Pendientes</p>
                <p className="text-sm font-medium text-yellow-800">
                  {formatCurrency(stats.payments.pending.amount)}
                </p>
              </div>

              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                  <span className="text-2xl font-bold text-red-600">
                    {stats.payments.overdue.count}
                  </span>
                </div>
                <p className="text-xs text-red-700 mt-1">Vencidos</p>
                <p className="text-sm font-medium text-red-800">
                  {formatCurrency(stats.payments.overdue.amount)}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <BanknotesIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-2xl font-bold text-gray-600">
                    {stats.payments.waived.count}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mt-1">Condonados</p>
                <p className="text-sm font-medium text-gray-800">
                  {formatCurrency(stats.payments.waived.amount)}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};