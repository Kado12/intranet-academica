const { PrismaClient } = require('@intranet/database');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// ===== UTILIDADES =====

const generatePassword = (firstName, documentNumber) => {
  return `${firstName.charAt(0).toUpperCase()}_${documentNumber}`;
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const log = {
  section: (title) => console.log(`\n${'='.repeat(50)}\n📋 ${title}\n${'='.repeat(50)}`),
  success: (msg) => console.log(`  ✅ ${msg}`),
  info: (msg) => console.log(`  ℹ️  ${msg}`),
  warning: (msg) => console.log(`  ⚠️  ${msg}`),
  error: (msg) => console.error(`  ❌ ${msg}`),
};

// ===== DATOS BASE =====

const ADMIN_PASSWORD = 'Admin2026!';

const TEACHERS = [
  {
    firstName: 'María',
    lastName: 'González Pérez',
    email: 'maria.gonzalez@intranet.edu',
    documentNumber: '10000001',
    phone: '+51 999 000 001',
  },
  {
    firstName: 'Carlos',
    lastName: 'Ramírez Silva',
    email: 'carlos.ramirez@intranet.edu',
    documentNumber: '10000002',
    phone: '+51 999 000 002',
  },
  {
    firstName: 'Ana',
    lastName: 'Torres Mendoza',
    email: 'ana.torres@intranet.edu',
    documentNumber: '10000003',
    phone: '+51 999 000 003',
  },
  {
    firstName: 'Luis',
    lastName: 'Fernández Castro',
    email: 'luis.fernandez@intranet.edu',
    documentNumber: '10000004',
    phone: '+51 999 000 004',
  },
];

const STUDENTS = [
  { firstName: 'Juan', lastName: 'Pérez García', documentNumber: '12345678', birthDate: '2008-05-15', gender: 'M' },
  { firstName: 'Lucía', lastName: 'Rodríguez López', documentNumber: '12345679', birthDate: '2008-07-22', gender: 'F' },
  { firstName: 'Diego', lastName: 'Martínez Sánchez', documentNumber: '12345680', birthDate: '2008-03-10', gender: 'M' },
  { firstName: 'Valentina', lastName: 'Flores Ramírez', documentNumber: '12345681', birthDate: '2008-09-05', gender: 'F' },
  { firstName: 'Mateo', lastName: 'Torres Díaz', documentNumber: '12345682', birthDate: '2008-01-18', gender: 'M' },
  { firstName: 'Camila', lastName: 'Vargas Ruiz', documentNumber: '12345683', birthDate: '2008-11-30', gender: 'F' },
  { firstName: 'Sebastián', lastName: 'Castro Morales', documentNumber: '12345684', birthDate: '2008-06-25', gender: 'M' },
  { firstName: 'Isabella', lastName: 'Mendoza Ortega', documentNumber: '12345685', birthDate: '2008-04-12', gender: 'F' },
  { firstName: 'Thiago', lastName: 'Rojas Paredes', documentNumber: '12345686', birthDate: '2008-08-08', gender: 'M' },
  { firstName: 'Sofía', lastName: 'Quispe Huamán', documentNumber: '12345687', birthDate: '2008-02-14', gender: 'F' },
];

const COURSES = [
  { code: 'MAT001', name: 'Matemática' },
  { code: 'COM001', name: 'Comunicación' },
  { code: 'ING001', name: 'Inglés' },
  { code: 'CIE001', name: 'Ciencia y Tecnología' },
  { code: 'HIS001', name: 'Ciencias Sociales' },
  { code: 'EDF001', name: 'Educación Física' },
];

// ===== FUNCIONES DE CREACIÓN =====

async function createBaseUsers() {
  log.section('Usuarios Base');

  const users = [
    {
      email: 'admin@intranet.edu',
      password: ADMIN_PASSWORD,
      firstName: 'Administrador',
      lastName: 'Principal',
      documentNumber: '00000000',
      role: 'ADMIN',
    },
    {
      email: 'informatico@intranet.edu',
      password: 'Informatico2026!',
      firstName: 'Roberto',
      lastName: 'Silva Informático',
      documentNumber: '00000001',
      role: 'INFORMATICO',
    },
    {
      email: 'secretaria@intranet.edu',
      password: 'Secretaria2026!',
      firstName: 'Patricia',
      lastName: 'López Secretaria',
      documentNumber: '00000002',
      role: 'SECRETARIA',
    },
    {
      email: 'coordinador@intranet.edu',
      password: 'Coordinador2026!',
      firstName: 'Fernando',
      lastName: 'Díaz Coordinador',
      documentNumber: '00000003',
      role: 'COORDINADOR',
    },
  ];

  for (const userData of users) {
    const existing = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existing) {
      log.info(`${userData.email} ya existe`);
      continue;
    }

    const passwordHash = await hashPassword(userData.password);

    await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash,
        profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            documentType: 'DNI',
            documentNumber: userData.documentNumber,
          },
        },
        memberships: {
          create: {
            role: userData.role,
            status: 'ACTIVE',
          },
        },
      },
    });

    log.success(`${userData.role}: ${userData.email} / ${userData.password}`);
  }
}

async function createSedes() {
  log.section('Sedes');

  const sedes = [
    {
      name: 'Sede Central',
      address: 'Av. Principal 123, Lima',
      phone: '+51 1 234 5678',
    },
    {
      name: 'Sede Norte',
      address: 'Av. Los Olivos 456, Lima Norte',
      phone: '+51 1 876 5432',
    },
  ];

  const createdSedes = {};

  for (const sedeData of sedes) {
    let sede = await prisma.sede.findFirst({
      where: { name: sedeData.name },
    });

    if (!sede) {
      sede = await prisma.sede.create({ data: sedeData });
      log.success(`Sede creada: ${sede.name}`);
    } else {
      log.info(`Sede ya existe: ${sede.name}`);
    }

    createdSedes[sedeData.name] = sede;
  }

  return createdSedes;
}

async function createClassrooms(sedes) {
  log.section('Salones');

  const classrooms = [
    { name: 'A11', sedeKey: 'Sede Central', capacity: 30 },
    { name: 'A12', sedeKey: 'Sede Central', capacity: 30 },
    { name: 'B11', sedeKey: 'Sede Central', capacity: 25 },
    { name: 'B12', sedeKey: 'Sede Central', capacity: 25 },
    { name: 'C11', sedeKey: 'Sede Norte', capacity: 30 },
    { name: 'C12', sedeKey: 'Sede Norte', capacity: 30 },
    { name: 'D11', sedeKey: 'Sede Norte', capacity: 25 },
    { name: 'D12', sedeKey: 'Sede Norte', capacity: 25 },
  ];

  for (const classroomData of classrooms) {
    const sede = sedes[classroomData.sedeKey];
    
    const existing = await prisma.classroom.findFirst({
      where: {
        name: classroomData.name,
        sedeId: sede.id,
      },
    });

    if (!existing) {
      await prisma.classroom.create({
        data: {
          name: classroomData.name,
          capacity: classroomData.capacity,
          sedeId: sede.id,
        },
      });
      log.success(`Salón ${classroomData.name} en ${classroomData.sedeKey}`);
    } else {
      log.info(`Salón ${classroomData.name} ya existe`);
    }
  }
}

async function createTurns() {
  log.section('Turnos');

  const turns = ['Mañana', 'Tarde', 'Noche'];
  const createdTurns = {};

  for (const turnName of turns) {
    let turn = await prisma.turn.findFirst({
      where: { name: turnName },
    });

    if (!turn) {
      turn = await prisma.turn.create({ data: { name: turnName } });
      log.success(`Turno creado: ${turn.name}`);
    } else {
      log.info(`Turno ya existe: ${turn.name}`);
    }

    createdTurns[turnName] = turn;
  }

  return createdTurns;
}

async function createPeriod() {
  log.section('Período Académico');

  let period = await prisma.academicPeriod.findFirst({
    where: { name: '2026-I' },
  });

  if (!period) {
    period = await prisma.academicPeriod.create({
      data: {
        name: '2026-I',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-06-30'),
        status: 'ACTIVE',
      },
    });
    log.success(`Período creado: ${period.name}`);
  } else {
    // Asegurar que esté activo
    if (period.status !== 'ACTIVE') {
      await prisma.academicPeriod.update({
        where: { id: period.id },
        data: { status: 'ACTIVE' },
      });
      log.info('Período actualizado a ACTIVE');
    } else {
      log.info(`Período ya existe: ${period.name}`);
    }
  }

  return period;
}

async function createSections(sedes, classrooms, turns, period) {
  log.section('Secciones');

  // Obtener salones
  const allClassrooms = await prisma.classroom.findMany({
    include: { sede: true },
  });

  const sections = [
    { name: 'A11-M', classroom: 'A11', sede: 'Sede Central', turn: 'Mañana', priority: 1, capacity: 30 },
    { name: 'A11-T', classroom: 'A11', sede: 'Sede Central', turn: 'Tarde', priority: 2, capacity: 30 },
    { name: 'A12-M', classroom: 'A12', sede: 'Sede Central', turn: 'Mañana', priority: 1, capacity: 30 },
    { name: 'B11-M', classroom: 'B11', sede: 'Sede Central', turn: 'Mañana', priority: 2, capacity: 25 },
    { name: 'C11-M', classroom: 'C11', sede: 'Sede Norte', turn: 'Mañana', priority: 1, capacity: 30 },
    { name: 'C11-T', classroom: 'C11', sede: 'Sede Norte', turn: 'Tarde', priority: 2, capacity: 30 },
  ];

  const createdSections = {};

  for (const sectionData of sections) {
    const classroom = allClassrooms.find(
      c => c.name === sectionData.classroom && c.sede?.name === sectionData.sede
    );

    if (!classroom) {
      log.warning(`No se encontró salón ${sectionData.classroom} en ${sectionData.sede}`);
      continue;
    }

    const turn = turns[sectionData.turn];

    let section = await prisma.section.findFirst({
      where: {
        name: sectionData.name,
        periodId: period.id,
      },
    });

    if (!section) {
      section = await prisma.section.create({
        data: {
          name: sectionData.name,
          capacity: sectionData.capacity,
          priority: sectionData.priority,
          classroomId: classroom.id,
          turnId: turn.id,
          periodId: period.id,
        },
      });
      log.success(`Sección ${sectionData.name} (Prioridad ${sectionData.priority})`);
    } else {
      log.info(`Sección ${sectionData.name} ya existe`);
    }

    createdSections[sectionData.name] = section;
  }

  return createdSections;
}

async function createCourses() {
  log.section('Cursos');

  const createdCourses = {};

  for (const courseData of COURSES) {
    let course = await prisma.course.findFirst({
      where: { code: courseData.code },
    });

    if (!course) {
      course = await prisma.course.create({ data: courseData });
      log.success(`Curso ${courseData.code}: ${courseData.name}`);
    } else {
      log.info(`Curso ${courseData.code} ya existe`);
    }

    createdCourses[courseData.code] = course;
  }

  return createdCourses;
}

async function createTeachers(sedes) {
  log.section('Docentes');

  const createdTeachers = [];

  for (const teacherData of TEACHERS) {
    let user = await prisma.user.findUnique({
      where: { email: teacherData.email },
    });

    if (!user) {
      const password = generatePassword(teacherData.firstName, teacherData.documentNumber);
      const passwordHash = await hashPassword(password);

      user = await prisma.user.create({
        data: {
          email: teacherData.email,
          passwordHash,
          profile: {
            create: {
              firstName: teacherData.firstName,
              lastName: teacherData.lastName,
              documentType: 'DNI',
              documentNumber: teacherData.documentNumber,
              phone: teacherData.phone,
            },
          },
          memberships: {
            create: {
              role: 'DOCENTE',
              status: 'ACTIVE',
              sedeId: sedes['Sede Central'].id,
            },
          },
        },
        include: { profile: true },
      });

      log.success(`${teacherData.firstName} ${teacherData.lastName} / ${password}`);
    } else {
      log.info(`${teacherData.email} ya existe`);
    }

    createdTeachers.push(user);
  }

  return createdTeachers;
}

async function createPaymentPlans(sedes) {
  log.section('Planes de Pago');

  const plans = [
    {
      name: 'Pago Completo',
      type: 'FULL_PAYMENT',
      baseAmount: 1500,
      discount: 0,
      description: 'Pago único del ciclo completo',
    },
    {
      name: 'Pago en 3 Cuotas',
      type: 'INSTALLMENTS',
      baseAmount: 1500,
      discount: 0,
      installments: 3,
      description: 'Pago en 3 cuotas mensuales',
    },
    {
      name: 'Pago en 5 Cuotas',
      type: 'INSTALLMENTS',
      baseAmount: 1500,
      discount: 0,
      installments: 5,
      description: 'Pago en 5 cuotas mensuales',
    },
    {
      name: 'Descuento Hermanos',
      type: 'SIBLING_DISCOUNT',
      baseAmount: 1500,
      discount: 20,
      description: 'Descuento del 20% por hermanos',
    },
    {
      name: 'Convenio Institucional',
      type: 'AGREEMENT',
      baseAmount: 1500,
      discount: 30,
      description: 'Descuento por convenio con instituciones',
    },
  ];

  const createdPlans = {};

  for (const planData of plans) {
    let plan = await prisma.paymentPlan.findFirst({
      where: { name: planData.name },
    });

    if (!plan) {
      plan = await prisma.paymentPlan.create({
        data: {
          ...planData,
          finalAmount: planData.baseAmount * (1 - planData.discount / 100),
        },
      });
      log.success(`${planData.name}: S/ ${plan.finalAmount.toFixed(2)}`);
    } else {
      log.info(`${planData.name} ya existe`);
    }

    createdPlans[planData.name] = plan;
  }

  return createdPlans;
}

async function createStudentsAndEnrollments(sedes, sections, paymentPlans, period) {
  log.section('Estudiantes y Matrículas');

  // Distribuir estudiantes en diferentes secciones
  const sectionAssignments = [
    { section: 'A11-M', plan: 'Pago Completo', paymentDone: true },
    { section: 'A11-M', plan: 'Pago en 3 Cuotas', paymentDone: true },
    { section: 'A11-M', plan: 'Pago en 5 Cuotas', paymentDone: false },
    { section: 'A11-T', plan: 'Pago Completo', paymentDone: true },
    { section: 'A11-T', plan: 'Descuento Hermanos', paymentDone: true },
    { section: 'A12-M', plan: 'Pago Completo', paymentDone: false },
    { section: 'B11-M', plan: 'Pago en 5 Cuotas', paymentDone: true },
    { section: 'C11-M', plan: 'Pago Completo', paymentDone: true },
    { section: 'C11-M', plan: 'Convenio Institucional', paymentDone: false },
    { section: 'C11-T', plan: 'Pago en 3 Cuotas', paymentDone: true },
  ];

  for (let i = 0; i < STUDENTS.length; i++) {
    const studentData = STUDENTS[i];
    const assignment = sectionAssignments[i];
    const email = `${studentData.firstName.toLowerCase()}.${studentData.lastName.split(' ')[0].toLowerCase()}@intranet.edu`;

    // Verificar si ya existe
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      log.info(`${email} ya existe`);
      continue;
    }

    // Generar contraseña automática
    const password = generatePassword(studentData.firstName, studentData.documentNumber);
    const passwordHash = await hashPassword(password);

    const section = sections[assignment.section];
    const plan = paymentPlans[assignment.plan];

    if (!section || !plan) {
      log.warning(`No se encontró sección o plan para ${email}`);
      continue;
    }

    // Crear estudiante
    user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        profile: {
          create: {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            documentType: 'DNI',
            documentNumber: studentData.documentNumber,
            birthDate: new Date(studentData.birthDate),
            gender: studentData.gender,
          },
        },
        memberships: {
          create: {
            role: 'ESTUDIANTE',
            status: 'ACTIVE',
            sedeId: sedes['Sede Central'].id,
          },
        },
      },
    });

    // Crear matrícula
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: user.id,
        sectionId: section.id,
        status: 'ACTIVE',
        paymentPlanId: plan.id,
        enrolledAt: new Date(),
      },
    });

    // Crear registros de pago
    const now = new Date();
    const paymentRecords = [];

    if (plan.installments && plan.installments > 1) {
      // Plan en cuotas
      const amountPerInstallment = plan.finalAmount / plan.installments;
      
      for (let j = 1; j <= plan.installments; j++) {
        const dueDate = new Date(now);
        dueDate.setMonth(dueDate.getMonth() + (j - 1));
        dueDate.setDate(15);

        const isPaid = assignment.paymentDone && j === 1;

        paymentRecords.push({
          enrollmentId: enrollment.id,
          amount: Math.round(amountPerInstallment * 100) / 100,
          installmentNumber: j,
          totalInstallments: plan.installments,
          status: isPaid ? 'PAID' : 'PENDING',
          dueDate,
          paidAt: isPaid ? new Date() : null,
          paymentMethod: isPaid ? 'Efectivo' : null,
          reference: isPaid ? `Voucher-${studentData.documentNumber}-${j}` : null,
        });
      }
    } else {
      // Pago único
      paymentRecords.push({
        enrollmentId: enrollment.id,
        amount: plan.finalAmount,
        installmentNumber: null,
        totalInstallments: null,
        status: assignment.paymentDone ? 'PAID' : 'PENDING',
        dueDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        paidAt: assignment.paymentDone ? new Date() : null,
        paymentMethod: assignment.paymentDone ? 'Efectivo' : null,
        reference: assignment.paymentDone ? `Voucher-${studentData.documentNumber}` : null,
      });
    }

    await prisma.paymentRecord.createMany({ data: paymentRecords });

    log.success(
      `${studentData.firstName} ${studentData.lastName} → ${assignment.section} | ` +
      `${assignment.plan} | ${password}`
    );
  }
}

async function createTeacherSectionCourses(sections, courses, teachers) {
  log.section('Asignación Docente-Curso-Sección');

  // Asignar cursos a docentes en diferentes secciones
  const assignments = [
    { teacher: 0, course: 'MAT001', section: 'A11-M' },
    { teacher: 0, course: 'MAT001', section: 'A11-T' },
    { teacher: 1, course: 'COM001', section: 'A11-M' },
    { teacher: 1, course: 'COM001', section: 'A12-M' },
    { teacher: 2, course: 'ING001', section: 'A11-M' },
    { teacher: 2, course: 'ING001', section: 'C11-M' },
    { teacher: 3, course: 'CIE001', section: 'A11-T' },
    { teacher: 3, course: 'CIE001', section: 'C11-T' },
  ];

  for (const assignment of assignments) {
    const teacher = teachers[assignment.teacher];
    const course = courses[assignment.course];
    const section = sections[assignment.section];

    if (!teacher || !course || !section) {
      continue;
    }

    const existing = await prisma.sectionCourse.findFirst({
      where: {
        sectionId: section.id,
        courseId: course.id,
      },
    });

    if (!existing) {
      await prisma.sectionCourse.create({
        data: {
          sectionId: section.id,
          courseId: course.id,
          teacherId: teacher.id,
        },
      });
      log.success(
        `${teacher.profile.firstName} ${teacher.profile.lastName} → ` +
        `${course.name} en ${assignment.section}`
      );
    } else {
      log.info(`Asignación ya existe: ${course.name} en ${assignment.section}`);
    }
  }
}

async function createSampleAttendances(sections) {
  log.section('Asistencias de Prueba');

  // Obtener estudiantes matriculados en una sección
  const section = sections['A11-M'];
  if (!section) return;

  const enrollments = await prisma.enrollment.findMany({
    where: {
      sectionId: section.id,
      status: 'ACTIVE',
    },
    include: { student: true },
  });

  if (enrollments.length === 0) {
    log.info('No hay estudiantes para crear asistencias');
    return;
  }

  // Obtener cursos de la sección
  const sectionCourses = await prisma.sectionCourse.findMany({
    where: { sectionId: section.id },
    include: { course: true },
  });

  if (sectionCourses.length === 0) {
    log.info('No hay cursos asignados a la sección');
    return;
  }

  // Crear asistencias para los últimos 5 días
  const statuses = ['PRESENT', 'PRESENT', 'PRESENT', 'PRESENT', 'ABSENT', 'LATE'];
  let count = 0;

  for (let daysAgo = 5; daysAgo >= 1; daysAgo--) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(0, 0, 0, 0);

    // Solo días de semana
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    for (const sectionCourse of sectionCourses.slice(0, 2)) {
      for (const enrollment of enrollments) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        const existing = await prisma.attendance.findFirst({
          where: {
            studentId: enrollment.studentId,
            sectionCourseId: sectionCourse.id,
            date,
          },
        });

        if (!existing) {
          await prisma.attendance.create({
            data: {
              studentId: enrollment.studentId,
              sectionCourseId: sectionCourse.id,
              date,
              status: randomStatus,
            },
          });
          count++;
        }
      }
    }
  }

  log.success(`${count} registros de asistencia creados`);
}

// ===== FUNCIÓN PRINCIPAL =====

async function main() {
  console.log('\n🌱 Iniciando seed completo de la base de datos...\n');

  try {
    // 1. Usuarios base
    await createBaseUsers();

    // 2. Estructura académica
    const sedes = await createSedes();
    await createClassrooms(sedes);
    const turns = await createTurns();
    const period = await createPeriod();
    const sections = await createSections(sedes, {}, turns, period);

    // 3. Cursos
    const courses = await createCourses();

    // 4. Docentes
    const teachers = await createTeachers(sedes);

    // 5. Planes de pago
    const paymentPlans = await createPaymentPlans(sedes);

    // 6. Estudiantes y matrículas
    await createStudentsAndEnrollments(sedes, sections, paymentPlans, period);

    // 7. Asignaciones docente-curso-sección
    await createTeacherSectionCourses(sections, courses, teachers);

    // 8. Asistencias de prueba
    await createSampleAttendances(sections);

    // ===== RESUMEN FINAL =====
    log.section('Resumen de Credenciales');

    console.log('\n👤 USUARIOS BASE:');
    console.log('  ADMIN:        admin@intranet.edu / Admin2026!');
    console.log('  INFORMATICO:  informatico@intranet.edu / Informatico2026!');
    console.log('  SECRETARIA:   secretaria@intranet.edu / Secretaria2026!');
    console.log('  COORDINADOR:  coordinador@intranet.edu / Coordinador2026!');

    console.log('\n👨‍🏫 DOCENTES (contraseña: INICIAL_DNI):');
    TEACHERS.forEach(t => {
      console.log(`  ${t.email} / ${generatePassword(t.firstName, t.documentNumber)}`);
    });

    console.log('\n👨‍🎓 ESTUDIANTES (contraseña: INICIAL_DNI):');
    STUDENTS.slice(0, 5).forEach(s => {
      const email = `${s.firstName.toLowerCase()}.${s.lastName.split(' ')[0].toLowerCase()}@intranet.edu`;
      console.log(`  ${email} / ${generatePassword(s.firstName, s.documentNumber)}`);
    });
    console.log(`  ... y ${STUDENTS.length - 5} más`);

    console.log('\n🎉 Seed completado exitosamente!\n');

  } catch (error) {
    log.error(`Error en el seed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });