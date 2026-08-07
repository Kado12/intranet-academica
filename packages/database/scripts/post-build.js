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
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(src)) {
  copyDir(src, dest);
  console.log('✅ Copied generated Prisma files to dist/');
} else {
  console.error('❌ src/generated/ not found. Run prisma generate first.');
  process.exit(1);
}