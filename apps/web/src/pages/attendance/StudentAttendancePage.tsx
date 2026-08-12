import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import { attendanceService, type Attendance } from '../../api/attendance.service';
import { sedesService, sectionsService, enrollmentsService } from '../../api/academic.service';
import { sectionCoursesService } from '../../api/section-courses.service';
import type { Sede, Section } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

interface SectionCourse {
  id: string;
  sectionId: string;
  courseId: string;
  teacherId: string;
  section?: Section & {
    name: string;
    classroom?: { name: string; sede?: { name: string } };
    turn?: { name: string };
  };
  course?: { id: string; name: string };
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  PRESENT: { label: 'Presente', color: 'bg-green-500', icon: CheckCircleIcon },
  ABSENT: { label: 'Ausente', color: 'bg-red-500', icon: XCircleIcon },
  LATE: { label: 'Tarde', color: 'bg-yellow-500', icon: ClockIcon },
  EXCUSED: { label: 'Justificado', color: 'bg-blue-500', icon: DocumentTextIcon },
};

export const StudentAttendancePage: React.FC = () => {
  const { toasts, addToast, removeToast } = useToast();
  const { user, hasAnyRole, hasRole } = useAuth();

  const isTeacher = hasRole('DOCENTE');
  const isAdmin = hasAnyRole(['ADMIN', 'COORDINADOR', 'INFORMATICO']);

  // Datos
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [sectionCourses, setSectionCourses] = useState<SectionCourse[]>([]);
  const [selectedSectionCourse, setSelectedSectionCourse] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Modal de justificación
  const [showExcuseModal, setShowExcuseModal] = useState(false);
  const [excuseAttendance, setExcuseAttendance] = useState<Attendance | null>(null);
  const [excuseNote, setExcuseNote] = useState('');

  // ===== CARGAR DATOS =====

  const loadData = useCallback(async () => {
    try {
      const [sedesData] = await Promise.all([
        sedesService.findAll(),
      ]);
      setSedes(sedesData);

      // Si es docente, cargar solo sus cursos
      if (isTeacher && user) {
        // Aquí necesitarías un endpoint para obtener los cursos del docente
        // Por ahora cargamos todos
        const scData = await sectionCoursesService.getMyCourses();
        setSectionCourses(scData);
      } else {
        const scData = await sectionCoursesService.findAll();
        setSectionCourses(scData);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
  }, [isTeacher, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ===== CARGAR ASISTENCIA =====

  const loadAttendance = useCallback(async () => {
    if (!selectedSectionCourse || !selectedDate) return;

    setIsLoading(true);
    try {
      const data = await attendanceService.findBySectionCourseAndDate(
        selectedSectionCourse,
        selectedDate
      );
      setAttendances(data);
    } catch (error) {
      console.error('Error al cargar asistencia:', error);
      setAttendances([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSectionCourse, selectedDate]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  // ===== HANDLERS =====

  const handleStatusChange = (attendanceId: string, status: string) => {
    setAttendances(prev =>
      prev.map(a => a.id === attendanceId ? { ...a, status } : a)
    );
  };

  const handleSave = async () => {
    if (attendances.length === 0) {
      addToast('error', 'No hay asistencias para guardar');
      return;
    }

    setIsSaving(true);

    try {
      await attendanceService.createBulkAttendance({
        date: selectedDate,
        sectionCourseId: selectedSectionCourse,
        attendances: attendances.map(a => ({
          studentId: a.studentId,
          status: a.status as any,
          notes: a.notes,
        })),
      });

      addToast('success', 'Asistencia guardada exitosamente');
      loadAttendance();
    } catch (error: any) {
      const message = error.response?.data?.message;
      addToast('error', message || 'Error al guardar asistencia');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExcuseClick = (attendance: Attendance) => {
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
      await attendanceService.excuseAttendance(excuseAttendance.id, excuseNote);
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

  // ===== OPCIONES =====

  const sectionCourseOptions = [
    { value: '', label: 'Selecciona un curso' },
    ...sectionCourses.map(sc => ({
      value: sc.id,
      label: `${sc.section?.name || ''} - ${sc.course?.name || ''} (${sc.section?.turn?.name || ''})`,
    })),
  ];

  // ===== ESTADÍSTICAS RÁPIDAS =====

  const stats = {
    total: attendances.length,
    present: attendances.filter(a => a.status === 'PRESENT').length,
    absent: attendances.filter(a => a.status === 'ABSENT').length,
    late: attendances.filter(a => a.status === 'LATE').length,
    excused: attendances.filter(a => a.status === 'EXCUSED').length,
  };

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Asistencia de Estudiantes</h1>
        <p className="text-sm text-gray-500 mt-1">
          Registra y consulta la asistencia diaria de los estudiantes
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Curso-Sección"
            value={selectedSectionCourse}
            onChange={(e) => setSelectedSectionCourse(e.target.value)}
            options={sectionCourseOptions}
          />

          <Input
            label="Fecha"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />

          <div className="flex items-end">
            <Button
              variant="secondary"
              onClick={loadAttendance}
              className="w-full"
            >
              Cargar Asistencia
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
              onClick={() => handleMarkAll('LATE')}
              className="text-sm px-3 py-1"
            >
              ⏰ Tarde
            </Button>
          </div>
        )}
      </Card>

      {/* Estadísticas rápidas */}
      {attendances.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
              <p className="text-2xl font-bold text-blue-600">{stats.excused}</p>
              <p className="text-xs text-gray-500">Justificados</p>
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
            {selectedSectionCourse && selectedDate
              ? 'No hay registros de asistencia para esta fecha. Se creará al guardar.'
              : 'Selecciona un curso y una fecha para ver la asistencia'
            }
          </div>
        ) : (
          <div className="space-y-3">
            {attendances.map((attendance) => (
              <div
                key={attendance.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {/* Info del estudiante */}
                <div className="flex items-center">
                  {attendance.student?.profile?.avatarUrl ? (
                    <img
                      src={attendance.student.profile.avatarUrl}
                      alt="Foto"
                      className="h-12 w-12 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">
                        {attendance.student?.profile?.firstName?.[0]}
                        {attendance.student?.profile?.lastName?.[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      {attendance.student?.profile?.firstName}{' '}
                      {attendance.student?.profile?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {attendance.student?.profile?.documentNumber || attendance.student?.email}
                    </p>
                  </div>
                </div>

                {/* Botones de estado */}
                <div className="flex items-center space-x-2">
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => {
                    const Icon = config.icon;
                    const isActive = attendance.status === status;

                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(attendance.id, status)}
                        className={`
                          p-2 rounded-full transition-colors
                          ${isActive
                            ? `${config.color} text-white`
                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                          }
                        `}
                        title={config.label}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    );
                  })}

                  {/* Botón de justificar (solo si está ausente) */}
                  {attendance.status === 'ABSENT' && isAdmin && (
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
                Guardar Asistencia
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
              {excuseAttendance?.student?.profile?.firstName}{' '}
              {excuseAttendance?.student?.profile?.lastName}
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
              placeholder="Ej: Cita médica programada, enfermedad, etc."
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