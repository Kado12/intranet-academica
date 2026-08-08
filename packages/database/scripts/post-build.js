const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'src', 'generated');
const dest = path.join(__dirname, '..', 'dist', 'generated');

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      // Intentar copiar con retry para archivos bloqueados
      copyFileWithRetry(srcPath, destPath, 3);
    }
  }
}

function copyFileWithRetry(srcPath, destPath, maxRetries) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Si el archivo destino existe, intentar borrarlo primero
      if (fs.existsSync(destPath)) {
        try {
          fs.unlinkSync(destPath);
        } catch (unlinkError) {
          // Si no se puede borrar, esperar un poco
          if (attempt < maxRetries) {
            console.log(`⏳ Archivo ocupado, reintentando... (${attempt}/${maxRetries})`);
            const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
            // Sincronizar espera
            const start = Date.now();
            while (Date.now() - start < 1000) { /* esperar 1 segundo */ }
            continue;
          }
          throw unlinkError;
        }
      }

      fs.copyFileSync(srcPath, destPath);
      return; // Éxito
    } catch (error) {
      if (error.code === 'EBUSY' && attempt < maxRetries) {
        console.log(`⏳ Archivo ocupado: ${path.basename(srcPath)}, reintentando... (${attempt}/${maxRetries})`);
        const start = Date.now();
        while (Date.now() - start < 2000) { /* esperar 2 segundos */ }
        continue;
      }
      throw error;
    }
  }
}

// Limpiar dist/generated antes de copiar
if (fs.existsSync(dest)) {
  console.log('🗑️  Limpiando dist/generated/...');
  fs.rmSync(dest, { recursive: true, force: true });
}

if (fs.existsSync(src)) {
  console.log('📦 Copiando archivos generados por Prisma a dist/...');
  copyDir(src, dest);
  console.log('✅ Copied generated Prisma files to dist/');
} else {
  console.error('❌ src/generated/ not found. Run prisma generate first.');
  process.exit(1);
}