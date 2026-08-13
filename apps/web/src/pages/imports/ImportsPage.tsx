import React, { useState, useRef } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { importsService, type ImportResult } from '../../api/imports.service';
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

type ImportType = 'students' | 'classrooms' | 'sections';

const IMPORT_CONFIG: Record<ImportType, { 
  label: string; 
  description: string; 
  icon: any;
  color: string;
}> = {
  students: {
    label: 'Alumnos',
    description: 'Importar estudiantes con matrícula y plan de pago',
    icon: AcademicCapIcon,
    color: 'blue',
  },
  classrooms: {
    label: 'Salones',
    description: 'Importar salones por sede',
    icon: BuildingOfficeIcon,
    color: 'purple',
  },
  sections: {
    label: 'Secciones',
    description: 'Importar secciones con turno y período',
    icon: UserGroupIcon,
    color: 'yellow',
  },
};

export const ImportsPage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  const [selectedType, setSelectedType] = useState<ImportType | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = async (type: ImportType) => {
    try {
      await importsService.downloadTemplate(type);
      addToast('success', 'Plantilla descargada');
    } catch (error) {
      addToast('error', 'Error al descargar plantilla');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!selectedType || !selectedFile) return;

    setIsUploading(true);
    try {
      const importResult = await importsService.importFile(selectedType, selectedFile);
      setResult(importResult);

      if (importResult.failed === 0) {
        addToast('success', `✅ ${importResult.successful} registros importados correctamente`);
      } else if (importResult.successful > 0) {
        addToast('warning', `⚠️ ${importResult.successful} exitosos, ${importResult.failed} fallidos`);
      } else {
        addToast('error', `❌ Todos los registros fallaron (${importResult.failed})`);
      }
    } catch (error: any) {
      addToast('error', error.response?.data?.message || 'Error al importar');
    } finally {
      setIsUploading(false);
    }
  };

  const resetImport = () => {
    setSelectedFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Importación Masiva</h1>
        <p className="text-sm text-gray-500 mt-1">
          Importa datos desde archivos Excel de forma masiva
        </p>
      </div>

      {/* Tarjetas de tipos de importación */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(IMPORT_CONFIG).map(([type, config]) => {
          const Icon = config.icon;
          const isSelected = selectedType === type;

          return (
            <Card 
              key={type}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-blue-500' : ''
              }`}
              // onClick={() => {
              //   setSelectedType(type as ImportType);
              //   resetImport();
              // }}
            >
              <div className="flex items-start gap-3" 
              onClick={() => {
                setSelectedType(type as ImportType);
                resetImport();
              }}>
                <div className={`p-2 rounded-lg bg-${config.color}-100`}>
                  <Icon className={`h-6 w-6 text-${config.color}-600`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{config.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{config.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Área de trabajo */}
      {selectedType && (
        <Card>
          <div className="space-y-6">
            {/* Paso 1: Descargar plantilla */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Paso 1: Descargar plantilla
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Descarga la plantilla Excel, complétala con tus datos y súbela en el paso 2.
              </p>
              <Button
                variant="secondary"
                onClick={() => handleDownloadTemplate(selectedType)}
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Descargar Plantilla
              </Button>
            </div>

            {/* Paso 2: Subir archivo */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Paso 2: Subir archivo Excel
              </h3>

              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                  transition-colors hover:border-blue-400 hover:bg-blue-50
                  ${selectedFile ? 'border-green-400 bg-green-50' : 'border-gray-300'}
                `}
                onClick={() => fileInputRef.current?.click()}
              >
                <DocumentArrowUpIcon className={`h-12 w-12 mx-auto mb-3 ${
                  selectedFile ? 'text-green-500' : 'text-gray-400'
                }`} />
                
                {selectedFile ? (
                  <>
                    <p className="font-medium text-green-700">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Click para cambiar archivo
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">Click para seleccionar un archivo Excel</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Formatos: .xlsx, .xls (máx. 10MB)
                    </p>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile && !result && (
                <Button
                  variant="primary"
                  onClick={handleImport}
                  isLoading={isUploading}
                  className="mt-4 w-full"
                >
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                  Importar {IMPORT_CONFIG[selectedType].label}
                </Button>
              )}
            </div>

            {/* Resultados */}
            {result && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Resultados de la importación
                </h3>

                {/* Resumen */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{result.total}</p>
                    <p className="text-sm text-blue-700">Total</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{result.successful}</p>
                    <p className="text-sm text-green-700">Exitosos</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{result.failed}</p>
                    <p className="text-sm text-red-700">Fallidos</p>
                  </div>
                </div>

                {/* Errores */}
                {result.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <XCircleIcon className="h-5 w-5" />
                      Registros con errores ({result.errors.length})
                    </h4>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {result.errors.map((error, idx) => (
                        <div key={idx} className="text-sm bg-white rounded p-2 border border-red-200">
                          <span className="font-medium text-red-700">Fila {error.row}:</span>{' '}
                          <span className="text-red-600">{error.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  variant="secondary"
                  onClick={resetImport}
                  className="mt-4"
                >
                  Importar otro archivo
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Guía */}
      <Card>
        <h3 className="font-semibold text-gray-800 mb-3">📋 Guía rápida</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✅ <strong>Descarga la plantilla</strong> antes de crear tu archivo Excel</li>
          <li>✅ <strong>Respeta los encabezados</strong> exactamente como están en la plantilla</li>
          <li>✅ <strong>Verifica los datos</strong> antes de subir (DNIs únicos, emails válidos)</li>
          <li>✅ <strong>Revisa los resultados</strong> para ver qué filas fallaron y por qué</li>
          <li>⚠️ Para alumnos sin sección, se asignará automáticamente una con cupo disponible</li>
          <li>⚠️ La foto del alumno se debe subir después desde la página de matrículas</li>
        </ul>
      </Card>
    </div>
  );
};