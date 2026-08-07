# 🎓 Intranet Académica

Sistema de intranet académica full-stack desarrollado con arquitectura monorepo. Gestiona sedes, salones, secciones, cursos, matrículas, docentes, estudiantes y padres de familia con un sistema robusto de autenticación y autorización por roles.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Scripts Disponibles](#-scripts-disponibles)
- [Variables de Entorno](#-variables-de-entorno)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

## ✨ Características

- 🔐 **Autenticación segura** con JWT y bcrypt
- 👥 **Sistema de roles** (ADMIN, DOCENTE, ESTUDIANTE, PADRE_DE_FAMILIA, COORDINADOR, INFORMATICO, SECRETARIA)
- 🏢 **Multi-sede** con gestión de sedes, salones y turnos
- 📚 **Gestión académica completa** (períodos, secciones, cursos, matrículas)
- 📱 **API REST** preparada para consumir desde web y móvil
- 🎨 **UI moderna y responsiva** con Tailwind CSS
- 📊 **Documentación automática** con Swagger
- ✅ **Validación robusta** con Zod (frontend) y class-validator (backend)
- 🗄️ **Base de datos MySQL** con Prisma ORM
- 🔄 **Monorepo** con Turborepo para builds eficientes

## 🛠 Stack Tecnológico

### Backend
- **Framework**: [NestJS](https://nestjs.com/) 11.x
- **Lenguaje**: TypeScript
- **ORM**: [Prisma](https://www.prisma.io/) 6.x
- **Base de Datos**: MySQL 8.4
- **Autenticación**: JWT con Passport
- **Validación**: class-validator
- **Documentación**: Swagger

### Frontend
- **Framework**: [React](https://react.dev/) 18.x
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Lenguaje**: TypeScript
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) 4.x
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Validación**: [Zod](https://zod.dev/)
- **Iconos**: Heroicons

### Infraestructura
- **Monorepo**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/) 9.x
- **Containerización**: Docker Compose
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (frontend) + Railway (backend)

## 🏗 Arquitectura
```text
┌─────────────────┐           ┌─────────────────┐
│ Frontend        │           │ Mobile App      │
│ (Vercel)        │           │ (React Native)  │
└────────┬────────┘           └────────┬────────┘
         │                             │
         └──────────────┬──────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Backend API           │
            │ (Railway)             │
            │ - NestJS              │
            │ - JWT Auth            │
            │ - Swagger             │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │ Database              │
            │ - MySQL 8.4           │
            │ - Prisma ORM          │
            └───────────────────────┘

```

## 📁 Estructura del Proyecto
```text
intranet-academica/
├── apps/
│ ├── api/ # Backend NestJS
│ │ ├── src/
│ │ │ ├── academic/ # Módulos académicos
│ │ │ ├── auth/ # Autenticación y autorización
│ │ │ ├── prisma/ # Servicio de base de datos
│ │ │ ├── users/ # Gestión de usuarios
│ │ │ └── main.ts # Entry point
│ │ ├── .env
│ │ └── package.json
│ └── web/ # Frontend React
│ ├── src/
│ │ ├── api/ # Servicios HTTP
│ │ ├── components/ # Componentes UI
│ │ ├── context/ # Context API
│ │ ├── pages/ # Páginas
│ │ ├── types/ # Tipos TypeScript
│ │ └── App.tsx
│ ├── .env
│ └── package.json
├── packages/
│ └── database/ # Paquete de base de datos
│ ├── prisma/
│ │ ├── schema.prisma # Schema de Prisma
│ │ └── migrations/ # Migraciones
│ ├── src/
│ │ ├── generated/ # Cliente Prisma generado
│ │ └── index.ts # Barrel export
│ └── package.json
├── docker-compose.yml # MySQL local
├── turbo.json # Configuración de Turborepo
├── pnpm-workspace.yaml # Configuración de workspace
└── package.json # Scripts raíz
```

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) 20.x o superior
- [pnpm](https://pnpm.io/) 9.x o superior
- [Docker](https://www.docker.com/) y Docker Compose
- [Git](https://git-scm.com/)

### Instalación de pnpm

```bash
npm install -g pnpm

node --version    # v20.x.x o superior
pnpm --version    # 9.x.x o superior
docker --version  # 24.x.x o superior
git --version     # 2.x.x o superior

git clone https://github.com/tu-usuario/intranet-academica.git
cd intranet-academica

pnpm install

cp apps/api/.env.example apps/api/.env

cp apps/web/.env.example apps/web/.env

cp packages/database/.env.example packages/database/.env
```

### Editar **apps/api/.env**

```bash
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="mysql://intranet:intranet@localhost:3306/intranet"

# JWT
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
JWT_EXPIRATION=7d

# CORS
CORS_ORIGIN="http://localhost:5173"
```

### Editar **apps/web/.env**

```bash
VITE_API_URL=http://localhost:3000
```

### Editar **packages/database/.env**

```bash
DATABASE_URL="mysql://intranet:intranet@localhost:3306/intranet"
```

### Inicia la Base de Datos

```bash
pnpm db:up

pnpm db:migrate

cd packages/database
pnpm exec prisma generate
cd ../..

pnpm --filter @intranet/database run build
```

### Inicia todos los servicios
```bash
# Terminal 1: Base de datos
pnpm db:up

# Terminal 2: Backend
pnpm api:dev

# Terminal 3: Frontend
pnpm web:dev

# Inicia backend y frontend simultáneamente
pnpm dev
```

### URLs de desarrollo
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api/docs
- Prisma Studio: http://localhost:5555 (ejecutar **pnpm db:studio**)

## 📜 Scripts Disponibles
### Scripts raíz

```bash
# Desarrollo
pnpm dev              # Inicia todos los servicios en paralelo
pnpm api:dev          # Solo backend
pnpm web:dev          # Solo frontend

# Build
pnpm build            # Build de todos los paquetes
pnpm api:build        # Build del backend
pnpm web:build        # Build del frontend

# Base de datos
pnpm db:up            # Levantar MySQL con Docker
pnpm db:down          # Detener MySQL
pnpm db:reset         # Resetear base de datos (elimina volumen)
pnpm db:generate      # Generar cliente de Prisma
pnpm db:migrate       # Ejecutar migraciones
pnpm db:studio        # Abrir Prisma Studio

# Calidad de código
pnpm lint             # Ejecutar ESLint
pnpm typecheck        # Verificar tipos TypeScript
```

### Scripts del backend (apps/api)

```bash
pnpm --filter api run dev      # Desarrollo con hot reload
pnpm --filter api run build    # Build de producción
pnpm --filter api run start    # Iniciar en producción
pnpm --filter api run test     # Ejecutar tests
```

### Scripts del frontend (apps/web)

```bash
pnpm --filter web run dev      # Desarrollo con hot reload
pnpm --filter web run build    # Build de producción
pnpm --filter web run preview  # Preview del build
```

### Scripts de base de datos (packages/database)

```bash
pnpm --filter @intranet/database run prisma:generate  # Generar cliente
pnpm --filter @intranet/database run prisma:migrate   # Migraciones
pnpm --filter @intranet/database run prisma:studio    # Prisma Studio
```