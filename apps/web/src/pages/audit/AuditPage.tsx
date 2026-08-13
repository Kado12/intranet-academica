import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { auditService, type AuditLog } from '../../api/audit.service';
import {
  ClipboardDocumentListIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

// Configuración de visualización por tipo de acción
const ACTION_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  CREATE: { label: 'Creación', color: 'bg-green-100 text-green-800', icon: '➕' },
  UPDATE: { label: 'Actualización', color: 'bg-blue-100 text-blue-800', icon: '✏️' },
  DELETE: { label: 'Eliminación', color: 'bg-red-100 text-red-800', icon: '🗑️' },
  TRANSFER: { label: 'Transferencia', color: 'bg-purple-100 text-purple-800', icon: '🔄' },
  RESET_PASSWORD: { label: 'Reseteo de Contraseña', color: 'bg-yellow-100 text-yellow-800', icon: '🔑' },
  LOGIN: { label: 'Inicio de Sesión', color: 'bg-gray-100 text-gray-800', icon: '🔓' },
  LOGOUT: { label: 'Cierre de Sesión', color: 'bg-gray-100 text-gray-800', icon: '🔒' },
  UPLOAD_PHOTO: { label: 'Subida de Foto', color: 'bg-indigo-100 text-indigo-800', icon: '📷' },
  DOWNLOAD_PDF: { label: 'Descarga de PDF', color: 'bg-pink-100 text-pink-800', icon: '📄' },
};

const ENTITY_CONFIG: Record<string, string> = {
  USER: 'Usuario',
  PROFILE: 'Perfil',
  ENROLLMENT: 'Matrícula',
  SECTION: 'Sección',
  CLASSROOM: 'Salón',
  SEDE: 'Sede',
  PAYMENT_PLAN: 'Plan de Pago',
  PERIOD: 'Período',
  COURSE: 'Curso',
};

export const AuditPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    entity: '',
    action: '',
    startDate: '',
    endDate: '',
  });

  // Modal de detalle
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  // ===== CARGAR HISTORIAL =====

  const loadHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await auditService.getHistory({
        entity: filters.entity || undefined,
        action: filters.action || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        page: pagination.page,
        limit: pagination.limit,
      });
      setLogs(response.logs);
      setPagination(response.pagination);
    } catch (error) {
      addToast('error', 'Error al cargar el historial');
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, addToast]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // ===== HANDLERS =====

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleViewDetail = (log: AuditLog) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  const clearFilters = () => {
    setFilters({ entity: '', action: '', startDate: '', endDate: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Historial de Cambios</h1>
        <p className="text-sm text-gray-500">
          Total: {pagination.total} registros
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filters.entity}
            onChange={(e) => handleFilterChange('entity', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las entidades</option>
            {Object.entries(ENTITY_CONFIG).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={filters.action}
            onChange={(e) => handleFilterChange('action', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las acciones</option>
            {Object.entries(ACTION_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Fecha inicio"
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Fecha fin"
          />

          {(filters.entity || filters.action || filters.startDate || filters.endDate) && (
            <Button variant="secondary" onClick={clearFilters}>
              Limpiar filtros
            </Button>
          )}
        </div>
      </Card>

      {/* Tabla de historial */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ClipboardDocumentListIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay registros de auditoría
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => {
                  const actionConfig = ACTION_CONFIG[log.action] || { label: log.action, color: 'bg-gray-100 text-gray-800', icon: '❓' };

                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${actionConfig.color}`}>
                          {actionConfig.icon} {actionConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {ENTITY_CONFIG[log.entity] || log.entity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.entityName || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.user?.profile
                          ? `${log.user.profile.firstName} ${log.user.profile.lastName}`
                          : log.user?.email || 'Sistema'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.changedFields && Array.isArray(log.changedFields) && log.changedFields.length > 0
                          ? log.changedFields.slice(0, 3).join(', ') + (log.changedFields.length > 3 ? '...' : '')
                          : '-'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetail(log)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Ver detalle"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <p className="text-sm text-gray-500">
              Página {pagination.page} de {pagination.totalPages}
            </p>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page <= 1}
              >
                Anterior
              </Button>
              <Button
                variant="secondary"
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page >= pagination.totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modal de detalle */}
      <Modal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedLog(null);
        }}
        title="Detalle de Auditoría"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-4">
            {/* Información general */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              <div>
                <p className="text-xs text-gray-500">Fecha</p>
                <p className="font-medium">{formatDate(selectedLog.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Acción</p>
                <p className="font-medium">{ACTION_CONFIG[selectedLog.action]?.label || selectedLog.action}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Entidad</p>
                <p className="font-medium">{ENTITY_CONFIG[selectedLog.entity] || selectedLog.entity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Usuario</p>
                <p className="font-medium">
                  {selectedLog.user?.profile
                    ? `${selectedLog.user.profile.firstName} ${selectedLog.user.profile.lastName}`
                    : selectedLog.user?.email || 'Sistema'
                  }
                </p>
              </div>
            </div>

            {/* Datos anteriores y nuevos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h3 className="font-medium text-red-800 mb-2">Datos Anteriores</h3>
                {selectedLog.oldData ? (
                  <div className="space-y-1 text-sm">
                    {Object.entries(selectedLog.oldData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-red-700">{key}:</span>
                        <span className="font-mono">{formatValue(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-700 text-sm">No aplica (nuevo registro)</p>
                )}
              </div>

              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h3 className="font-medium text-green-800 mb-2">Datos Nuevos</h3>
                {selectedLog.newData ? (
                  <div className="space-y-1 text-sm">
                    {Object.entries(selectedLog.newData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-green-700">{key}:</span>
                        <span className="font-mono">{formatValue(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-700 text-sm">No aplica (eliminación)</p>
                )}
              </div>
            </div>

            {/* Campos que cambiaron */}
            {selectedLog.changedFields && Array.isArray(selectedLog.changedFields) && selectedLog.changedFields.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Campos Modificados</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLog.changedFields.map((field) => (
                    <span key={field} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Información técnica */}
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
              <p><strong>ID del registro:</strong> {selectedLog.id}</p>
              {selectedLog.ipAddress && <p><strong>IP:</strong> {selectedLog.ipAddress}</p>}
              {selectedLog.entityId && <p><strong>ID de entidad:</strong> {selectedLog.entityId}</p>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};