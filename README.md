# 🏢 IFEDEM Platform - Sistema MLM

Sistema completo de Multi-Level Marketing (MLM) para IFEDEM, construido con Vue 3 + TypeScript + Firebase.

## 🚀 Inicio Rápido (5 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Generar datos de prueba
open generate-test-data.html  # Click en "Generar Datos"

# 3. Iniciar servidor
npm run dev

# 4. Abrir en navegador
# http://localhost:5176

# 5. Login
# Email: admin@test.com
# Password: password123
```

**¿Primera vez?** Lee la [Guía Rápida de Inicio](./GUIA_RAPIDA_INICIO.md) 📖

---

## 📚 Documentación Completa

### 📖 Para Empezar

- **[GUIA_RAPIDA_INICIO.md](./GUIA_RAPIDA_INICIO.md)** ⭐ **EMPIEZA AQUÍ**
  - Setup en 5 minutos
  - 4 pruebas prácticas
  - Credenciales de prueba
  - Solución de problemas

- **[DOCUMENTACION_COMPLETA.md](./DOCUMENTACION_COMPLETA.md)** 📚 **ÍNDICE GENERAL**
  - Índice de toda la documentación
  - Mapa de rutas según necesidad
  - Orden recomendado de lectura

### 🎯 Guías Prácticas

- **[EJEMPLOS_PRACTICOS.md](./EJEMPLOS_PRACTICOS.md)** - Escenarios reales con cálculos
- **[TUTORIAL_VISUAL.md](./TUTORIAL_VISUAL.md)** - Qué esperar en cada pantalla
- **[TEST_SCRIPTS.md](./TEST_SCRIPTS.md)** - Scripts para consola del navegador

### 🛠️ Guías Técnicas

- **[COMMISSION_SYSTEM_GUIDE.md](./COMMISSION_SYSTEM_GUIDE.md)** - Sistema de comisiones
- **[EJEMPLO_DATOS_PRUEBA.md](./EJEMPLO_DATOS_PRUEBA.md)** - Crear datos manualmente
- **[FIREBASE_RULES_SETUP.md](./FIREBASE_RULES_SETUP.md)** - Reglas de seguridad

### 🎯 Herramientas

- **[generate-test-data.html](./generate-test-data.html)** - Generador automático de datos

---

## ✨ Funcionalidades

### Implementadas ✅

- 🔐 **Autenticación**
  - Login/Registro con Firebase
  - Roles: Admin y Afiliado
  - Permisos granulares

- 📊 **Dashboard de Afiliado**
  - Stats en tiempo real
  - Progreso de rango visual
  - Link de referido (copiar/compartir)
  - Referidos recientes

- 🛍️ **Sistema de Productos**
  - Catálogo con filtros
  - Carrito de compras
  - Checkout completo
  - BV/CV/Puntos

- 💰 **Sistema de Comisiones**
  - Cálculo automático
  - 4 tipos: Direct, Unilevel, Fast Start, Binary
  - 7 niveles de profundidad
  - Estados: pending → approved → paid

- 💼 **Sistema de Wallets**
  - Balance pendiente/disponible
  - Historial completo
  - Sistema de retiros

- 👨‍💼 **Panel de Admin**
  - Gestión de productos
  - Gestión de órdenes
  - Gestión de usuarios
  - Aprobación de comisiones

- 📈 **Sistema de Rangos**
  - 4 rangos para IFEDEM
  - 8 rangos para iAcelera
  - Progreso automático por BV

### Próximamente 🔜

- 🌳 Genealogía visual (árbol de red)
- 📧 Sistema de notificaciones
- 📊 Reportes y gráficas
- 💳 Integración de pagos real
- 📱 App móvil

---

## 🏗️ Arquitectura

### Stack Tecnológico

- **Frontend:** Vue 3 + TypeScript + Vite
- **State:** Pinia
- **Routing:** Vue Router
- **Backend:** Firebase (Auth + Firestore)
- **Styling:** CSS3 + Variables CSS

### Estructura del Proyecto

```
src/
├── views/              # Páginas principales
│   ├── AffiliateDashboard.vue
│   ├── ProductCatalogView.vue
│   ├── CheckoutView.vue
│   ├── CommissionsView.vue
│   └── admin/          # Panel administrativo
│
├── shared/
│   ├── composables/    # Lógica reutilizable
│   │   ├── useAuth.ts
│   │   ├── useCommissions.ts
│   │   ├── useOrders.ts
│   │   └── useAffiliateStats.ts
│   │
│   └── services/
│       └── commissionCalculator.ts  # Motor de comisiones
│
├── stores/             # Pinia stores
│   ├── user.ts
│   └── cart.ts
│
└── config/
    └── firebase.ts     # Configuración de Firebase
```

### Base de Datos (Firestore)

```
firestore/
├── users/          # Usuarios y afiliados
├── products/       # Catálogo de productos
├── orders/         # Órdenes de compra
├── commissions/    # Comisiones generadas
└── wallets/        # Wallets de usuarios
```

---

## 🧪 Testing

### Datos de Prueba

Usa el generador automático:

```bash
open generate-test-data.html
# Click en "Generar Datos de Prueba"
```

**Usuarios creados:**

| Email | Password | Rol | Rango |
|-------|----------|-----|-------|
| admin@test.com | password123 | admin | Admin |
| sponsora@test.com | password123 | affiliate | Manager |
| sponsorb@test.com | password123 | affiliate | Affiliate |
| afiliado1@test.com | password123 | affiliate | Affiliate |
| afiliado2@test.com | password123 | affiliate | Affiliate |

### Scripts de Test

Abre la consola del navegador (F12) y usa los scripts en [TEST_SCRIPTS.md](./TEST_SCRIPTS.md):

```javascript
// Ver comisiones del usuario actual
// Ver estado del wallet
// Calcular comisiones manualmente
// Y más...
```

---

## 🔧 Desarrollo

### Requisitos

- Node.js 18+
- npm 9+
- Navegador moderno

### Setup

```bash
# Instalar dependencias
npm install

# Configurar Firebase (solo primera vez)
# 1. Copia tu config de Firebase en src/config/firebase.ts
# 2. Publica firestore.rules en Firebase Console

# Iniciar desarrollo
npm run dev
```

### Comandos

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Lint
npm run lint

# Type check
npm run type-check
```

### IDE Setup Recomendado

- **VS Code** + extensiones:
  - [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Browser DevTools

- [Vue.js devtools](https://devtools.vuejs.org/) - Debugging de Vue
- Custom Object Formatters - Mejores logs en consola

---

## 📦 Deployment

### Vercel (Recomendado)

```bash
# 1. Push a GitHub
git push origin main

# 2. Conecta repo en Vercel
# vercel.com

# 3. Deploy automático en cada push
```

### Firebase Hosting

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

### Variables de Entorno

Crea `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
# etc...
```

---

## 🐛 Troubleshooting

### Problemas Comunes

**"No puedo hacer login"**
- Verifica que generaste datos de prueba
- Password: `password123` para todos
- Ver [GUIA_RAPIDA_INICIO.md](./GUIA_RAPIDA_INICIO.md)

**"Missing or insufficient permissions"**
- Debes publicar `firestore.rules` en Firebase Console
- Ver [FIREBASE_RULES_SETUP.md](./FIREBASE_RULES_SETUP.md)

**"No se generan comisiones"**
- Verifica que el usuario tenga `sponsorId`
- Revisa consola (F12) para errores
- Ver [COMMISSION_SYSTEM_GUIDE.md](./COMMISSION_SYSTEM_GUIDE.md)

**"Dashboard muestra stats en 0"**
- Normal si no hay compras
- Haz una compra como afiliado
- Ver [EJEMPLOS_PRACTICOS.md](./EJEMPLOS_PRACTICOS.md)

### Logs de Debugging

El sistema incluye logs detallados en consola:

```
🔐 Usuario autenticado: admin@test.com
💰 Procesando comisiones para orden: ORD-123
✅ 2 comisiones generadas
💼 Wallets actualizados
```

---

## 📊 Sistema de Comisiones

### Plataforma IFEDEM

- **Comisión Directa:** 12% del CV
- **Niveles:** 7 niveles (8%, 5%, 3%, 2%, 2%, 1%, 1%)
- **Rangos:** Affiliate → Manager → Director → Executive

### Plataforma iAcelera

- **Comisión Directa:** 10% del CV
- **Niveles:** 5 niveles (5%, 3%, 2%, 1%, 1%)
- **Fast Start:** 5% extra (primeros 30 días)
- **Binary Match:** 8%
- **Rangos:** Bronze → Silver → Gold → Platinum → Diamond → Executive → Presidential → Ambassador

**Detalles completos:** [COMMISSION_SYSTEM_GUIDE.md](./COMMISSION_SYSTEM_GUIDE.md)

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones

- TypeScript estricto
- ESLint + Prettier
- Commits descriptivos
- Tests para nuevas features

---

## 📄 Licencia

Copyright © 2026 IFEDEM. Todos los derechos reservados.

---

## 📞 Soporte

- 📚 **Documentación:** [DOCUMENTACION_COMPLETA.md](./DOCUMENTACION_COMPLETA.md)
- 🐛 **Issues:** GitHub Issues
- 📧 **Email:** soporte@ifedem.com

---

## 🎉 ¡Empieza Ahora!

1. ✅ Lee [GUIA_RAPIDA_INICIO.md](./GUIA_RAPIDA_INICIO.md)
2. ✅ Genera datos con `generate-test-data.html`
3. ✅ Inicia servidor: `npm run dev`
4. ✅ Login: `admin@test.com` / `password123`
5. ✅ Explora el sistema con [TUTORIAL_VISUAL.md](./TUTORIAL_VISUAL.md)

**¡Bienvenido al sistema MLM más completo!** 🚀
