import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { teacherAttendanceService, type TeacherAttendance } from '../../api/teacher-attendance.service';
import { sedesService } from '../../api/academic.service';
import { usersService, type AdminUser } from '../../api/users.service';
import { type Sede, Role } from '../../types';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  PRESENT: { label: 'Presente', color: 'bg-green-500', icon: CheckCircleIcon },
  ABSENT: { label: 'Ausente', color: 'bg-red-500', icon: XCircleIcon },
  LATE: { label: 'Tarde', color: 'bg-yellow-500', icon: ClockIcon },
  EXCUSED: { label: 'Justificado', color: 'bg-blue-500', icon: DocumentTextIcon },
  VACATION: { label: 'Vacaciones', color: 'bg-purple-500', icon: SunIcon },
  SICK_LEAVE: { label: 'Licencia Médica', color: 'bg-indigo-500', icon: MoonIcon },
};

export const TeacherAttendancePage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();

  // Datos
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [teachers, setTeachers] = useState<AdminUser[]>([]);
  const [selectedSede, setSelectedSede] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [attendances, setAttendances] = useState<TeacherAttendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Modal de justificación
  const [showExcuseModal, setShowExcuseModal] = useState(false);
  const [excuseAttendance, setExcuseAttendance] = useState<TeacherAttendance | null>(null);
  const [excuseNote, setExcuseNote] = useState('');

  // ===== CARGAR DATOS =====

  const loadData = useCallback(async () => {
    try {
      const [sedesData, teachersData] = await Promise.all([
        sedesService.findAll(),
        usersService.findAll(undefined, Role.DOCENTE),
      ]);
      setSedes(sedesData);
      setTeachers(teachersData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ===== CARGAR ASISTENCIA =====

  const loadAttendance = useCallback(async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    try {
      const data = await teacherAttendanceService.findByDate(
        selectedDate,
        selectedSede || undefined
      );
      setAttendances(data);
    } catch (error) {
      console.error('Error al cargar asistencia:', error);
      setAttendances([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, selectedSede]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  // ===== CREAR ASISTENCIA DESDE CERO =====

  const initializeAttendance = () => {
    // Crear registros de asistencia para todos los docentes
    const newAttendances: TeacherAttendance[] = teachers.map(teacher => ({
      id: `temp-${teacher.id}`,
      date: selectedDate,
      status: 'PRESENT',
      teacherId: teacher.id,
      sedeId: selectedSede || undefined,
      teacher: {
        id: teacher.id,
        email: teacher.email,
        profile: teacher.profile,
      },
    }));

    setAttendances(newAttendances);
  };

  // ===== HANDLERS =====

  const handleStatusChange = (teacherId: string, status: string) => {
    setAttendances(prev =>
      prev.map(a => a.teacherId === teacherId ? { ...a, status } : a)
    );
  };

  const handleSave = async () => {
    if (attendances.length === 0) {
      addToast('error', 'No hay asistencias para guardar');
      return;
    }

    setIsSaving(true);

    try {
      await teacherAttendanceService.createBulkAttendance({
        date: selectedDate,
        sedeId: selectedSede || undefined,
        attendances: attendances.map(a => ({
          teacherId: a.teacherId,
          status: a.status as any,
          notes: a.notes,
        })),
      });

      addToast('success', 'Asistencia de docentes guardada exitosamente');
      loadAttendance();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al guardar asistencia');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExcuseClick = (attendance: TeacherAttendance) => {
    setExcuseAttendance(attendance);
    setExcuseNote('');
    setShowExcuseModal(true);
  };

  const handleExcuseConfirm = async () => {
    if (!excuseAttendance || !excuseNote.trim()) {
      addToast('error', 'Por favor ingresa el motivo de la justificación');
      return;
    }

    try {
      await teacherAttendanceService.excuseAttendance(excuseAttendance.id, excuseNote);
      addToast('success', 'Asistencia justificada');
      setShowExcuseModal(false);
      loadAttendance();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al justificar');
    }
  };

  const handleMarkAll = (status: string) => {
    setAttendances(prev => prev.map(a => ({ ...a, status })));
  };

  // ===== ESTADÍSTICAS RÁPIDAS =====

  const stats = {
    total: attendances.length,
    present: attendances.filter(a => a.status === 'PRESENT').length,
    absent: attendances.filter(a => a.status === 'ABSENT').length,
    late: attendances.filter(a => a.status === 'LATE').length,
    vacation: attendances.filter(a => a.status === 'VACATION').length,
    sickLeave: attendances.filter(a => a.status === 'SICK_LEAVE').length,
  };

  // ===== OPCIONES =====

  const sedeOptions = [
    { value: '', label: 'Todas las sedes' },
    ...sedes.map(s => ({ value: s.id, label: s.name })),
  ];

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Asistencia de Docentes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Registra y consulta la asistencia diaria de los docentes
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Sede"
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            options={sedeOptions}
          />

          <Input
            label="Fecha"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />

          <div className="flex items-end space-x-2">
            <Button
              variant="secondary"
              onClick={loadAttendance}
              className="flex-1"
            >
              Cargar
            </Button>
            <Button
              variant="primary"
              onClick={initializeAttendance}
              className="flex-1"
            >
              Nueva Asistencia
            </Button>
          </div>
        </div>

        {/* Botones de acción rápida */}
        {attendances.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm text-gray-600 mr-2">Marcar todos como:</span>
            <Button
              variant="success"
              onClick={() => handleMarkAll('PRESENT')}
              className="text-sm px-3 py-1"
            >
              ✓ Presentes
            </Button>
            <Button
              variant="danger"
              onClick={() => handleMarkAll('ABSENT')}
              className="text-sm px-3 py-1"
            >
              ✗ Ausentes
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleMarkAll('VACATION')}
              className="text-sm px-3 py-1"
            >
              🌴 Vacaciones
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleMarkAll('SICK_LEAVE')}
              className="text-sm px-3 py-1"
            >
              🏥 Licencia
            </Button>
          </div>
        )}
      </Card>

      {/* Estadísticas rápidas */}
      {attendances.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-xs text-gray-500">Presentes</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-xs text-gray-500">Ausentes</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
              <p className="text-xs text-gray-500">Tarde</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.vacation}</p>
              <p className="text-xs text-gray-500">Vacaciones</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">{stats.sickLeave}</p>
              <p className="text-xs text-gray-500">Licencias</p>
            </div>
          </Card>
        </div>
      )}

      {/* Lista de asistencia */}
      <Card>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : attendances.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No hay registros de asistencia para esta fecha.</p>
            <p className="text-sm mt-2">
              Haz click en "Nueva Asistencia" para crear los registros del día.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {attendances.map((attendance) => (
              <div
                key={attendance.teacherId}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Info del docente */}
                <div className="flex items-center">
                  {attendance.teacher?.profile?.avatarUrl ? (
                    <img
                      src={attendance.teacher.profile.avatarUrl}
                      alt="Foto"
                      className="h-12 w-12 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-medium">
                        {attendance.teacher?.profile?.firstName?.[0]}
                        {attendance.teacher?.profile?.lastName?.[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {attendance.teacher?.profile?.firstName}{' '}
                      {attendance.teacher?.profile?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {attendance.teacher?.email}
                    </p>
                  </div>
                </div>

                {/* Botones de estado */}
                <div className="flex items-center space-x-1">
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => {
                    const Icon = config.icon;
                    const isActive = attendance.status === status;

                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(attendance.teacherId, status)}
                        className={`
                          p-2 rounded-full transition-colors
                          ${isActive
                            ? `${config.color} text-white`
                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                          }
                        `}
                        title={config.label}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    );
                  })}

                  {/* Botón de justificar */}
                  {attendance.status === 'ABSENT' && (
                    <button
                      onClick={() => handleExcuseClick(attendance)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                      title="Justificar ausencia"
                    >
                      📝
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Botón guardar */}
            <div className="pt-4 border-t">
              <Button
                variant="primary"
                onClick={handleSave}
                isLoading={isSaving}
                className="w-full"
              >
                Guardar Asistencia de Docentes
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Modal de justificación */}
      <Modal
        isOpen={showExcuseModal}
        onClose={() => setShowExcuseModal(false)}
        title="Justificar Ausencia"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Vas a justificar la ausencia de{' '}
            <strong>
              {excuseAttendance?.teacher?.profile?.firstName}{' '}
              {excuseAttendance?.teacher?.profile?.lastName}
            </strong>
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Motivo de la justificación
            </label>
            <textarea
              value={excuseNote}
              onChange={(e) => setExcuseNote(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Cita médica programada, emergencia familiar, etc."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={() => setShowExcuseModal(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleExcuseConfirm}
            >
              Justificar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};