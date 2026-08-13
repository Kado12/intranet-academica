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

// ===== FUNCIONES DE CREACIÓN =====

async function createBaseUsers() {
  log.section('Usuarios Base');

  const users = [
    {
      email: 'admin@intranet.edu',
      password: 'Admin2026!',
      firstName: 'Administrador',
      lastName: 'Principal',
      documentNumber: '00000000',
      role: 'ADMIN',
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

async function main() {
  console.log('\n🌱 Iniciando seed completo de la base de datos...\n');

  try {
    // 1. Usuarios base
    await createBaseUsers();

    // ===== RESUMEN FINAL =====
    log.section('Resumen de Credenciales');

    console.log('\n👤 USUARIOS BASE:');
    console.log('  ADMIN:        admin@intranet.edu / Admin2026!');

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