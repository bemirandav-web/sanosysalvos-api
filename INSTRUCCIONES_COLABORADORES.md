# 🤝 Instrucciones para Colaboradores - Sanos y Salvos API

## 📋 Tabla de Contenidos
- [Requisitos Previos](#-requisitos-previos)
- [Clonar el Repositorio](#-paso-1-clonar-el-repositorio)
- [Instalar Dependencias](#-paso-2-instalar-dependencias)
- [Configurar Variables de Entorno](#-paso-3-configurar-variables-de-entorno)
- [Ejecutar el Proyecto](#-paso-4-ejecutar-el-proyecto)
- [Flujo de Trabajo con Git Flow](#-flujo-de-trabajo-con-git-flow)
- [Crear tu Rama de Trabajo](#-paso-5-crear-tu-rama-de-trabajo)
- [Hacer Commits y Push](#-paso-6-hacer-commits-y-push)
- [Crear Pull Requests](#-paso-7-crear-pull-requests)
- [Ejecutar Tests](#-ejecutar-tests)
- [Buenas Prácticas](#-buenas-prácticas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Resolución de Problemas](#-resolución-de-problemas)

---

## 🔧 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

| Herramienta | Versión Mínima | Verificar con |
|------------|----------------|---------------|
| **Node.js** | v18+ | `node --version` |
| **npm** | v9+ | `npm --version` |
| **Git** | v2.30+ | `git --version` |
| **VS Code** | Última | - |

> 💡 **Tip**: Descarga Node.js desde [nodejs.org](https://nodejs.org/) (versión LTS recomendada)

---

## 📥 Paso 1: Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/bemirandav-web/sanosysalvos-api.git

# Entrar al directorio del proyecto
cd sanosysalvos-api

# Ver todas las ramas disponibles
git branch -a
```

### Ramas disponibles:
| Rama | Descripción |
|------|------------|
| `main` | Rama de producción (código estable y probado) |
| `develop` | Rama de desarrollo (integración de features) |
| `feature/*` | Ramas de funcionalidades específicas |

---

## 📦 Paso 2: Instalar Dependencias

```bash
# Instalar todas las dependencias del proyecto
npm install
```

Esto instalará automáticamente todas las librerías necesarias definidas en `package.json`:
- Express, TypeScript, Supabase, JWT, bcryptjs, Jest, etc.

---

## ⚙️ Paso 3: Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar con tu editor preferido
code .env   # VS Code
# o
nano .env   # Terminal
```

Completa las variables con los valores del equipo:
```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
JWT_SECRET=tu-secreto-jwt
JWT_EXPIRATION=24h
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

> ⚠️ **Importante**: NUNCA subas el archivo `.env` al repositorio. Ya está en `.gitignore`.

---

## ▶️ Paso 4: Ejecutar el Proyecto

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# El servidor se ejecutará en http://localhost:8080
```

Verifica que funciona visitando: `http://localhost:8080/api/health`

---

## 🌿 Flujo de Trabajo con Git Flow

Nuestro equipo sigue la estrategia **Git Flow** para mantener el código organizado:

```
main ─────────────────────────────────── (producción estable)
  │
  └── develop ────────────────────────── (integración de features)
        │
        ├── feature/nueva-funcionalidad ── (tu trabajo)
        ├── feature/otra-funcionalidad ─── (trabajo de otro compañero)
        └── feature/fix-bug ───────────── (correcciones)
```

### Reglas importantes:
1. ❌ **NUNCA** hagas commits directamente en `main`
2. ❌ **NUNCA** hagas commits directamente en `develop`
3. ✅ **SIEMPRE** crea una rama `feature/` para tu trabajo
4. ✅ **SIEMPRE** crea un Pull Request para integrar tus cambios

---

## 🌱 Paso 5: Crear tu Rama de Trabajo

```bash
# 1. Asegúrate de estar en develop y actualizado
git checkout develop
git pull origin develop

# 2. Crear tu rama de feature
git checkout -b feature/nombre-de-tu-feature

# Ejemplos de nombres de ramas:
# git checkout -b feature/login-frontend
# git checkout -b feature/crud-mascotas
# git checkout -b feature/notificaciones-push
# git checkout -b fix/correccion-auth
```

### Convención de nombres de ramas:
| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feature/` | Nueva funcionalidad | `feature/filtro-mascotas` |
| `fix/` | Corrección de errores | `fix/validacion-email` |
| `docs/` | Documentación | `docs/api-swagger` |
| `refactor/` | Mejora de código existente | `refactor/optimizar-queries` |

---

## 💾 Paso 6: Hacer Commits y Push

### Hacer commits frecuentes y descriptivos:

```bash
# Ver qué archivos cambiaste
git status

# Agregar archivos al staging
git add .                    # Todos los archivos
# o
git add src/services/        # Solo una carpeta específica

# Crear un commit con mensaje descriptivo
git commit -m "feat: agregar endpoint para filtrar mascotas por ubicación"

# Subir tu rama al repositorio remoto
git push origin feature/nombre-de-tu-feature
```

### Convención de mensajes de commit:
| Prefijo | Significado | Ejemplo |
|---------|-------------|---------|
| `feat:` | Nueva funcionalidad | `feat: agregar búsqueda por nombre` |
| `fix:` | Corrección de bug | `fix: corregir validación de email` |
| `docs:` | Documentación | `docs: actualizar README` |
| `test:` | Tests | `test: agregar tests para ReporteService` |
| `refactor:` | Refactorización | `refactor: simplificar lógica de auth` |
| `chore:` | Tareas de mantenimiento | `chore: actualizar dependencias` |
| `style:` | Formato/estilo | `style: formatear código con prettier` |

---

## 🔄 Paso 7: Crear Pull Requests

### Desde GitHub:
1. Ve al repositorio en GitHub
2. Verás un banner amarillo que dice "Compare & pull request" — haz clic
3. Configura:
   - **Base**: `develop` (a donde van tus cambios)
   - **Compare**: `feature/tu-rama` (tu rama de trabajo)
4. Escribe un título descriptivo y descripción de tus cambios
5. Haz clic en **"Create pull request"**
6. Espera la revisión de tu equipo antes de hacer merge

### Ejemplo de descripción de PR:
```markdown
## ¿Qué cambios hice?
- Agregué endpoint GET /api/mascotas/buscar para búsqueda por nombre
- Implementé el servicio de búsqueda con filtros

## ¿Cómo probarlo?
1. Ejecutar `npm run dev`
2. Hacer GET request a `/api/mascotas/buscar?nombre=Max`

## Checklist:
- [x] Los tests pasan (`npm test`)
- [x] El código compila (`npm run build`)
- [x] Agregué tests nuevos si aplica
```

---

## 🧪 Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch (se re-ejecutan al guardar)
npm run test:watch

# Ver cobertura de código
npm test -- --coverage
```

> Actualmente hay **47 pruebas unitarias** que cubren servicios, patrones de diseño y autenticación.

---

## ✅ Buenas Prácticas

### Para el código:
1. 📝 Escribe código en **TypeScript** con tipos explícitos
2. 🧩 Sigue los **patrones de diseño** ya implementados (Repository, Strategy, Builder, Factory)
3. 🔒 Nunca expongas datos sensibles (contraseñas, tokens, keys)
4. ✅ Escribe tests para cada nueva funcionalidad
5. 📖 Agrega comentarios JSDoc en funciones complejas

### Para Git:
1. 🔄 Haz `git pull origin develop` frecuentemente para mantenerte actualizado
2. 💾 Commits pequeños y frecuentes (no un mega-commit con 50 archivos)
3. 📝 Mensajes de commit claros y descriptivos
4. 🚫 Nunca hagas `git push --force` en ramas compartidas
5. 👀 Revisa los PR de tus compañeros antes de hacer merge

### Si hay conflictos:
```bash
# 1. Actualizar tu rama con los últimos cambios de develop
git checkout develop
git pull origin develop

# 2. Volver a tu rama y hacer merge de develop
git checkout feature/tu-rama
git merge develop

# 3. Si hay conflictos, Git te los marcará en los archivos
# Abre los archivos conflictivos y resuelve manualmente
# Busca las marcas: <<<<<<< , ======= , >>>>>>>

# 4. Después de resolver los conflictos
git add .
git commit -m "merge: resolver conflictos con develop"
git push origin feature/tu-rama
```

---

## 📁 Estructura del Proyecto

```
sanosysalvos-api/
├── src/
│   ├── __tests__/          # 🧪 Tests unitarios (47 tests)
│   ├── builders/           # 🏗️ Builder Pattern (ReporteBuilder)
│   ├── config/             # ⚙️ Configuración (Supabase, Singleton)
│   ├── controllers/        # 🎮 Controladores (rutas de la API)
│   ├── factories/          # 🏭 Factory Pattern (ServiceFactory)
│   ├── middleware/          # 🛡️ Middleware (JWT Auth, Admin)
│   ├── models/             # 📦 Modelos/Interfaces TypeScript
│   ├── repositories/       # 📚 Repository Pattern (acceso a datos)
│   ├── services/           # 💼 Lógica de negocio
│   ├── strategies/         # 🎯 Strategy Pattern (notificaciones)
│   └── server.ts           # 🚀 Punto de entrada principal
├── supabase/
│   └── migration.sql       # 🗃️ Script de migración de base de datos
├── package.json            # 📋 Dependencias y scripts
├── tsconfig.json           # ⚙️ Configuración TypeScript
├── jest.config.js          # 🧪 Configuración de Jest
├── vercel.json             # ☁️ Configuración de Vercel
├── .env.example            # 🔐 Variables de entorno (template)
├── README.md               # 📖 Documentación principal
└── PATRONES_DISEÑO.md      # 🎨 Documentación de patrones de diseño
```

---

## 🔧 Resolución de Problemas

### Error: "Cannot find module"
```bash
npm install   # Reinstalar dependencias
```

### Error: "Port 8080 already in use"
```bash
# Cambiar el puerto en .env
PORT=3001
```

### Error al hacer push
```bash
# Si tu rama está desactualizada
git pull origin feature/tu-rama --rebase
git push origin feature/tu-rama
```

### Error de TypeScript
```bash
# Verificar que compila correctamente
npm run build
```

---

## 📞 Contacto del Equipo

Si tienes dudas:
1. Revisa la documentación en `README.md` y `PATRONES_DISEÑO.md`
2. Abre un **Issue** en GitHub describiendo tu problema
3. Contacta al equipo por el canal de comunicación acordado

---

> 🚀 **¡Bienvenido al equipo! Cualquier duda, no dudes en preguntar.**
