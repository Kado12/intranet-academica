import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { sedesService, turnsService, classroomsService, sectionsService } from '../../api/academic.service';
import type { Sede, Turn, Classroom, Section } from '../../types';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ExportFiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (filters: any) => void;
  title?: string;
  showPaymentFilters?: boolean;
}

export const ExportFiltersModal: React.FC<ExportFiltersModalProps> = ({
  isOpen,
  onClose,
  onExport,
  title = 'Descargar Excel',
  showPaymentFilters = false,
}) => {
  // Datos
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  // Filtros seleccionados
  const [filters, setFilters] = useState({
    sedeId: '',
    turnId: '',
    classroomId: '',
    sectionId: '',
    search: '',
  });

  const [isExporting, setIsExporting] = useState(false);

  // ===== CARGAR DATOS =====

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [sedesData, turnsData, classroomsData, sectionsData] = await Promise.all([
        sedesService.findAll(),
        turnsService.findAll(),
        classroomsService.findAll(),
        sectionsService.findAll(),
      ]);
      setSedes(sedesData);
      setTurns(turnsData);
      setClassrooms(classroomsData);
      setSections(sectionsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  };

  // ===== HANDLERS =====

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(filters);
      onClose();
      resetFilters();
    } finally {
      setIsExporting(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      sedeId: '',
      turnId: '',
      classroomId: '',
      sectionId: '',
      search: '',
    });
  };

  const handleClose = () => {
    onClose();
    resetFilters();
  };

  // ===== FILTRAR OPCIONES SEGÚN SELECCIÓN =====

  // Filtrar salones por sede
  const filteredClassrooms = filters.sedeId
    ? classrooms.filter(c => c.sedeId === filters.sedeId)
    : classrooms;

  // Filtrar secciones por salón y turno
  const filteredSections = sections.filter(s => {
    if (filters.classroomId && s.classroomId !== filters.classroomId) return false;
    if (filters.turnId && s.turnId !== filters.turnId) return false;
    return true;
  });

  // ===== RENDER =====

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="lg"
    >
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Puedes combinar múltiples filtros. Si no seleccionas ninguno, 
            se descargarán todos los registros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sede */}
          <Select
            label="Sede"
            name="sedeId"
            value={filters.sedeId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Todas las sedes' },
              ...sedes.map(s => ({ value: s.id, label: s.name })),
            ]}
          />

          {/* Turno */}
          <Select
            label="Turno"
            name="turnId"
            value={filters.turnId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Todos los turnos' },
              ...turns.map(t => ({ value: t.id, label: t.name })),
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Salón */}
          <Select
            label="Salón"
            name="classroomId"
            value={filters.classroomId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Todos los salones' },
              ...filteredClassrooms.map(c => ({
                value: c.id,
                label: `${c.name} (${sedes.find(s => s.id === c.sedeId)?.name || ''})`,
              })),
            ]}
          />

          {/* Sección */}
          <Select
            label="Sección"
            name="sectionId"
            value={filters.sectionId}
            onChange={handleChange}
            options={[
              { value: '', label: 'Todas las secciones' },
              ...filteredSections.map(s => ({
                value: s.id,
                label: `${s.name} (${s.classroom?.name || ''} - ${s.turn?.name || ''})`,
              })),
            ]}
          />
        </div>

        {/* Búsqueda */}
        <Input
          label="Buscar por nombre o documento"
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Ej: Juan, Pérez, 12345678"
        />

        {/* Resumen de filtros activos */}
        {(filters.sedeId || filters.turnId || filters.classroomId || filters.sectionId || filters.search) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Filtros activos:</p>
            <div className="flex flex-wrap gap-2">
              {filters.sedeId && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  🏫 {sedes.find(s => s.id === filters.sedeId)?.name}
                </span>
              )}
              {filters.turnId && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  🕐 {turns.find(t => t.id === filters.turnId)?.name}
                </span>
              )}
              {filters.classroomId && (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  🚪 {classrooms.find(c => c.id === filters.classroomId)?.name}
                </span>
              )}
              {filters.sectionId && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                  👥 {sections.find(s => s.id === filters.sectionId)?.name}
                </span>
              )}
              {filters.search && (
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  🔍 "{filters.search}"
                </span>
              )}
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            isLoading={isExporting}
          >
            <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
            Descargar Excel
          </Button>
        </div>
      </div>
    </Modal>
  );
};