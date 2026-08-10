import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Modal, ConfirmModal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { getZodErrors, type FormErrors } from '../../utils/zodHelpers';
import { paymentPlansService, type PaymentPlan, type CreatePaymentPlanDto } from '../../api/payment-plans.service';
import { sedesService } from '../../api/academic.service';
import type { Sede } from '../../types';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

// Schema de validación
const planSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  type: z.string().min(1, 'Selecciona un tipo'),
  description: z.string().optional(),
  baseAmount: z.string().min(1, 'El monto base es requerido'),
  discount: z.string().min(0, 'El descuento es requerido'),
  installments: z.string().optional(),
  sedeId: z.string().optional(),
});

type PlanFormData = z.infer<typeof planSchema>;

const typeOptions = [
  { value: '', label: 'Selecciona un tipo' },
  { value: 'FULL_PAYMENT', label: 'Pago Completo' },
  { value: 'INSTALLMENTS', label: 'Pago en Cuotas' },
  { value: 'SIBLING_DISCOUNT', label: 'Descuento por Hermanos' },
  { value: 'AGREEMENT', label: 'Convenio Institucional' },
  { value: 'SCHOLARSHIP', label: 'Beca' },
  { value: 'OTHER', label: 'Otro' },
];

export const PaymentPlansPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PaymentPlan | null>(null);
  const [formData, setFormData] = useState<PlanFormData>({
    name: '',
    type: '',
    description: '',
    baseAmount: '',
    discount: '0',
    installments: '',
    sedeId: '',
  });
  const [errors, setErrors] = useState<FormErrors<PlanFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; plan: PaymentPlan | null }>({
    isOpen: false,
    plan: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  // ===== CARGAR DATOS =====

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [plansData, sedesData] = await Promise.all([
        paymentPlansService.findAll(),
        sedesService.findAll(),
      ]);
      setPlans(plansData);
      setSedes(sedesData);
    } catch (error) {
      addToast('error', 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ===== HANDLERS =====

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof PlanFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    try {
      planSchema.parse(formData);

      // Validar que el descuento esté entre 0 y 100
      const discount = parseFloat(formData.discount);
      if (discount < 0 || discount > 100) {
        setErrors(prev => ({ ...prev, discount: 'El descuento debe estar entre 0 y 100' }));
        return false;
      }

      // Si el tipo es INSTALLMENTS, debe tener cuotas
      if (formData.type === 'INSTALLMENTS' && (!formData.installments || parseInt(formData.installments) < 2)) {
        setErrors(prev => ({ ...prev, installments: 'Para pago en cuotas, especifica al menos 2 cuotas' }));
        return false;
      }

      return true;
    } catch (error) {
      setErrors(getZodErrors<PlanFormData>(error));
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const data: CreatePaymentPlanDto = {
        name: formData.name,
        type: formData.type as any,
        description: formData.description || undefined,
        baseAmount: parseFloat(formData.baseAmount),
        discount: parseFloat(formData.discount),
        installments: formData.installments ? parseInt(formData.installments) : undefined,
        sedeId: formData.sedeId || undefined,
        isActive: true,
      };

      if (editingPlan) {
        await paymentPlansService.update(editingPlan.id, data);
        addToast('success', 'Plan actualizado exitosamente');
      } else {
        await paymentPlansService.create(data);
        addToast('success', 'Plan creado exitosamente');
      }

      setShowForm(false);
      setEditingPlan(null);
      resetForm();
      loadData();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', Array.isArray(message) ? message.join(', ') : message || 'Error al guardar el plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      description: '',
      baseAmount: '',
      discount: '0',
      installments: '',
      sedeId: '',
    });
    setErrors({});
  };

  const handleEdit = (plan: PaymentPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      type: plan.type,
      description: plan.description || '',
      baseAmount: plan.baseAmount.toString(),
      discount: plan.discount.toString(),
      installments: plan.installments?.toString() || '',
      sedeId: plan.sedeId || '',
    });
    setShowForm(true);
  };

  const handleDeleteClick = (plan: PaymentPlan) => {
    setDeleteModal({ isOpen: true, plan });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.plan) return;

    setIsDeleting(true);

    try {
      await paymentPlansService.remove(deleteModal.plan.id);
      addToast('success', 'Plan eliminado exitosamente');
      setDeleteModal({ isOpen: false, plan: null });
      loadData();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al eliminar el plan');
    } finally {
      setIsDeleting(false);
    }
  };

  // Calcular monto final en tiempo real
  const calculatedFinalAmount = () => {
    const base = parseFloat(formData.baseAmount) || 0;
    const discount = parseFloat(formData.discount) || 0;
    return base * (1 - discount / 100);
  };

  const calculatedInstallmentAmount = () => {
    const final = calculatedFinalAmount();
    const installments = parseInt(formData.installments) || 1;
    return final / installments;
  };

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Planes de Pago</h1>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setEditingPlan(null);
            setShowForm(true);
          }}
        >
          <span className="flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Nuevo Plan
          </span>
        </Button>
      </div>

      {/* Modal de formulario */}
      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingPlan(null);
          resetForm();
        }}
        title={editingPlan ? 'Editar Plan de Pago' : 'Nuevo Plan de Pago'}
        size="lg"
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre del plan"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Pago Completo, Plan Hermanos, etc."
              error={errors.name}
              required
            />

            <Select
              label="Tipo de plan"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={typeOptions}
              error={errors.type}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción opcional del plan..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Monto base (S/)"
              type="number"
              name="baseAmount"
              value={formData.baseAmount}
              onChange={handleChange}
              placeholder="1500"
              min="0"
              step="0.01"
              error={errors.baseAmount}
              required
            />

            <Input
              label="Descuento (%)"
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="0"
              min="0"
              max="100"
              error={errors.discount}
            />

            <Input
              label="Número de cuotas"
              type="number"
              name="installments"
              value={formData.installments}
              onChange={handleChange}
              placeholder="1 (pago único)"
              min="1"
              error={errors.installments}
            />
          </div>

          {/* Vista previa del cálculo */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 mb-2">Resumen del plan</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-blue-600">Monto base</p>
                <p className="font-bold text-lg">S/ {calculatedFinalAmount() > 0 ? formData.baseAmount : '0.00'}</p>
              </div>
              <div>
                <p className="text-blue-600">Monto final</p>
                <p className="font-bold text-lg text-green-600">S/ {calculatedFinalAmount().toFixed(2)}</p>
              </div>
              {parseInt(formData.installments) > 1 && (
                <div>
                  <p className="text-blue-600">Por cuota</p>
                  <p className="font-bold text-lg text-purple-600">
                    S/ {calculatedInstallmentAmount().toFixed(2)} x {formData.installments}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Select
            label="Sede (opcional)"
            name="sedeId"
            value={formData.sedeId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Global (todas las sedes)' },
              ...sedes.map(s => ({ value: s.id, label: s.name })),
            ]}
          />

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowForm(false);
                setEditingPlan(null);
                resetForm();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              {editingPlan ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de eliminación */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, plan: null })}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Plan de Pago"
        message={`¿Estás seguro de que deseas eliminar el plan "${deleteModal.plan?.name}"? Esta acción solo desactivará el plan.`}
        isLoading={isDeleting}
      />

      {/* Tabla de planes */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CreditCardIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            No hay planes de pago registrados
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Base</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descuento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto Final</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cuotas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{plan.name}</p>
                        {plan.description && (
                          <p className="text-xs text-gray-500 truncate max-w-xs">{plan.description}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                        {plan.type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      S/ {plan.baseAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {plan.discount > 0 ? (
                        <span className="text-green-600 font-medium">-{plan.discount}%</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      S/ {plan.finalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plan.installments ? (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {plan.installments} cuotas
                        </span>
                      ) : (
                        <span className="text-gray-400">Pago único</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(plan)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(plan)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};