const { PrismaClient } = require('@intranet/database');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@intranet.edu';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin2026!';
  
  console.log(`Creando usuario admin: ${adminEmail}`);
  
  // Verificar si ya existe
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('El usuario admin ya existe');
    return;
  }

  // Hashear contraseña
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  // Crear usuario admin
  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash,
      profile: {
        create: {
          firstName: 'Administrador',
          lastName: 'Principal',
        },
      },
      memberships: {
        create: {
          role: 'ADMIN',
          status: 'ACTIVE',
        },
      },
    },
  });

  console.log(`Usuario admin creado exitosamente con ID: ${admin.id}`);
  console.log('Email:', adminEmail);
  console.log('Password:', adminPassword);
  console.log('⚠️  IMPORTANTE: Cambia la contraseña inmediatamente después del primer login');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });