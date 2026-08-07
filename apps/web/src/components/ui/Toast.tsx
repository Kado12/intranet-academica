import React, { useEffect } from 'react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id)
    }, 5000);

    return () => clearTimeout(timer)
  }, [toast.id, onClose]);

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    error: <XCircleIcon className="h-6 w-6 text-red-500" />,
    warning: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />,
    info: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg shadow-lg border ${bgColors[toast.type]}`}>
      <div className="flex items-center space-x-3">
        {icons[toast.type]}
        <p className="text-gray-800">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

// Contenedor de toasts
interface ToastContainerProps {
  toasts: ToastData[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}