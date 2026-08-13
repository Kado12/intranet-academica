import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { paymentsService, type PaymentRecord } from '../../api/payments.service';
import { sedesService } from '../../api/academic.service';
import type { Sede } from '../../types';
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
  PAID: { label: 'Pagado', color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
  OVERDUE: { label: 'Vencido', color: 'bg-red-100 text-red-800', icon: XCircleIcon },
  WAIVED: { label: 'Condonado', color: 'bg-gray-100 text-gray-800', icon: XCircleIcon },
};

export const PaymentsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    status: '',
    sedeId: '',
    search: '',
  });
  const [summary, setSummary] = useState<any>(null);

  // Modal de pago
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [payFormData, setPayFormData] = useState({
    paymentMethod: '',
    reference: '',
    notes: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // ===== CARGAR DATOS =====

  const loadPayments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await paymentsService.findAll({
        status: filters.status || undefined,
        sedeId: filters.sedeId || undefined,
        search: filters.search || undefined,
        page: pagination.page,
        limit: pagination.limit,
      });
      setPayments(response.payments);
      setPagination(response.pagination);
    } catch (error) {
      addToast('error', 'Error al cargar los pagos');
    } finally {
      setIsLoading(false);
    }
  }, [filters, pagination.page, pagination.limit, addToast]);

  const loadSummary = useCallback(async () => {
    try {
      const data = await paymentsService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Error al cargar resumen:', error);
    }
  }, []);

  const loadSedes = useCallback(async () => {
    try {
      const data = await sedesService.findAll();
      setSedes(data);
    } catch (error) {
      console.error('Error al cargar sedes:', error);
    }
  }, []);

  useEffect(() => {
    loadSedes();
    loadSummary();
  }, [loadSedes, loadSummary]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      loadPayments();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [loadPayments]);

  // ===== HANDLERS =====

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePayClick = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setPayFormData({ paymentMethod: '', reference: '', notes: '' });
    setShowPayModal(true);
  };

  const handlePayFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPayFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPayment) return;

    if (!payFormData.paymentMethod) {
      addToast('error', 'Selecciona un método de pago');
      return;
    }

    setIsProcessing(true);

    try {
      await paymentsService.updatePayment(selectedPayment.id, {
        status: 'PAID',
        paymentMethod: payFormData.paymentMethod,
        reference: payFormData.reference || undefined,
        notes: payFormData.notes || undefined,
      });

      addToast('success', 'Pago registrado exitosamente');
      setShowPayModal(false);
      setSelectedPayment(null);
      loadPayments();
      loadSummary();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Seguimiento de Pagos</h1>
      </div>

      {/* Resumen */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pagados</p>
                <p className="text-2xl font-bold text-green-600">{summary.counts.paid}</p>
                <p className="text-xs text-gray-400">S/ {summary.amounts.paid.toFixed(2)}</p>
              </div>
              <CheckCircleIcon className="h-10 w-10 text-green-500" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">{summary.counts.pending}</p>
                <p className="text-xs text-gray-400">S/ {summary.amounts.pending.toFixed(2)}</p>
              </div>
              <ClockIcon className="h-10 w-10 text-yellow-500" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vencidos</p>
                <p className="text-2xl font-bold text-red-600">{summary.counts.overdue}</p>
              </div>
              <XCircleIcon className="h-10 w-10 text-red-500" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-blue-600">{summary.counts.total}</p>
              </div>
              <BanknotesIcon className="h-10 w-10 text-blue-500" />
            </div>
          </Card>
        </div>
      )}

      {/* Filtros */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o documento..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="PENDING">Pendiente</option>
            <option value="PAID">Pagado</option>
            <option value="OVERDUE">Vencido</option>
            <option value="WAIVED">Condonado</option>
          </select>

          <select
            value={filters.sedeId}
            onChange={(e) => handleFilterChange('sedeId', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas las sedes</option>
            {sedes.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Modal de pago */}
      <Modal
        isOpen={showPayModal}
        onClose={() => {
          setShowPayModal(false);
          setSelectedPayment(null);
        }}
        title="Registrar Pago"
      >
        {selectedPayment && (
          <form className="space-y-4" onSubmit={handleProcessPayment}>
            {/* Info del estudiante */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Estudiante:</strong> {selectedPayment.enrollment?.student?.profile?.firstName}{' '}
                {selectedPayment.enrollment?.student?.profile?.lastName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Plan:</strong> {selectedPayment.enrollment?.paymentPlan?.name}
              </p>
              {selectedPayment.installmentNumber && (
                <p className="text-sm text-gray-600">
                  <strong>Cuota:</strong> {selectedPayment.installmentNumber} de {selectedPayment.totalInstallments}
                </p>
              )}
              <p className="text-lg font-bold text-blue-600 mt-2">
                Monto: S/ {selectedPayment.amount.toFixed(2)}
              </p>
            </div>

            <Select
              label="Método de pago"
              name="paymentMethod"
              value={payFormData.paymentMethod}
              onChange={handlePayFormChange}
              options={[
                { value: '', label: 'Selecciona un método' },
                { value: 'Efectivo', label: 'Efectivo' },
                { value: 'Transferencia', label: 'Transferencia bancaria' },
                { value: 'Tarjeta', label: 'Tarjeta de crédito/débito' },
                { value: 'Yape', label: 'Yape' },
                { value: 'Plin', label: 'Plin' },
                { value: 'Otro', label: 'Otro' },
              ]}
              required
            />

            <Input
              label="Referencia / Voucher"
              type="text"
              name="reference"
              value={payFormData.reference}
              onChange={handlePayFormChange}
              placeholder="Número de operación, voucher, etc."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                name="notes"
                value={payFormData.notes}
                onChange={handlePayFormChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Observaciones adicionales..."
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowPayModal(false);
                  setSelectedPayment(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="success" isLoading={isProcessing}>
                Confirmar Pago
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Tabla de pagos */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BanknotesIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay registros de pago
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estudiante</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cuota</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => {
                  const statusConfig = STATUS_CONFIG[payment.status] || STATUS_CONFIG.PENDING;
                  const StatusIcon = statusConfig.icon;

                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {payment.enrollment?.student?.profile?.avatarUrl ? (
                            <img
                              src={payment.enrollment.student.profile.avatarUrl}
                              alt="Foto"
                              className="h-8 w-8 rounded-full object-cover mr-3"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-medium text-xs">
                                {payment.enrollment?.student?.profile?.firstName?.[0]}
                              </span>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {payment.enrollment?.student?.profile?.firstName}{' '}
                              {payment.enrollment?.student?.profile?.lastName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {payment.enrollment?.student?.profile?.documentNumber}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.enrollment?.paymentPlan?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.installmentNumber
                          ? `${payment.installmentNumber}/${payment.totalInstallments}`
                          : 'Único'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        S/ {payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full inline-flex items-center ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {payment.status === 'PENDING' || payment.status === 'OVERDUE' ? (
                          <Button
                            variant="success"
                            onClick={() => handlePayClick(payment)}
                            className="text-xs px-2 py-1"
                          >
                            💰 Registrar Pago
                          </Button>
                        ) : payment.status === 'PAID' ? (
                          <div className="text-xs text-gray-500">
                            <p>Pagado el {payment.paidAt ? formatDate(payment.paidAt) : '-'}</p>
                            <p className="text-gray-400">{payment.paymentMethod}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
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
    </div>
  );
};