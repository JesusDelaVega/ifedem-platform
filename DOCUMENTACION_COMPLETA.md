# 📚 Documentación Completa - Sistema MLM

Índice completo de toda la documentación disponible para el sistema MLM de IFEDEM/iAcelera.

---

## 🚀 Inicio Rápido

### [GUIA_RAPIDA_INICIO.md](./GUIA_RAPIDA_INICIO.md) ⭐ **EMPIEZA AQUÍ**
**5 minutos para tener el sistema funcionando**

- ✅ Paso 1: Publicar reglas de Firestore (1 minuto, solo una vez)
- ✅ Paso 2: Generar datos de prueba (30 segundos)
- ✅ Paso 3: Iniciar servidor local
- ✅ Paso 4: Probar el sistema completo

**¿Para quién?**
- Desarrolladores nuevos en el proyecto
- Cualquiera que quiera probar el sistema rápidamente
- Testing y demostración del sistema

**Contenido:**
- Instrucciones paso a paso
- 4 pruebas prácticas con resultados esperados
- Credenciales de prueba
- Solución de problemas comunes
- Próximos pasos

---

## 📖 Guías Prácticas

### [EJEMPLOS_PRACTICOS.md](./EJEMPLOS_PRACTICOS.md) ⭐ **EJEMPLOS DETALLADOS**
**Escenarios reales con cálculos exactos**

**7 Ejemplos Completos:**

1. **Primera Venta y Comisiones**
   - Paso a paso de una venta de $299.99
   - Cálculo detallado de comisiones
   - Qué ver en la UI

2. **Red de 3 Niveles**
   - Comisiones en múltiples niveles
   - Impacto en stats y dashboards
   - Actualización en tiempo real

3. **Múltiples Compras**
   - Usuario compra varios productos
   - Acumulación de comisiones
   - Historial completo

4. **Progreso de Rango**
   - Cómo avanzar de Manager a Director
   - Cálculo de BV necesarios
   - Simulación de crecimiento

5. **Fast Start Bonus** (iAcelera)
   - Bonus del 50% en primeros 30 días
   - Comparación con/sin bonus
   - Timeline detallado

6. **Sistema de Wallets**
   - Estados: pendiente → disponible → retirado
   - Proceso de aprobación
   - Solicitud de retiro

7. **Panel de Admin**
   - Crear productos
   - Aprobar órdenes
   - Gestionar usuarios

**Casos de Prueba:**
- Registro de nuevo usuario
- Búsqueda de productos
- Carrito de compras
- Cálculos de comisiones

**¿Para quién?**
- Usuarios que quieren entender el sistema a fondo
- Testing de escenarios específicos
- Documentación de comportamiento esperado

---

### [TUTORIAL_VISUAL.md](./TUTORIAL_VISUAL.md) 📸 **GUÍA VISUAL**
**Qué esperar en cada pantalla**

**Pantallas Detalladas:**

1. **Inicio de Sesión**
   - Layout completo
   - Campos a llenar
   - Proceso de autenticación
   - Errores comunes

2. **Dashboard Principal**
   - Vista general del afiliado
   - Tarjetas de estadísticas
   - Link de referido
   - Progreso de rango

3. **Catálogo de Productos**
   - Vista de productos
   - Detalles de producto
   - Carrito flotante
   - Información de comisiones

4. **Proceso de Compra**
   - Checkout paso a paso
   - Formulario completo
   - Confirmación de orden
   - Qué pasa en el sistema

5. **Ver Comisiones**
   - Vista principal
   - Filtros y búsqueda
   - Estados de comisiones
   - Solicitar retiro

6. **Panel de Admin**
   - Dashboard administrativo
   - Gestión de productos
   - Gestión de órdenes
   - Gestión de comisiones

**Flujo Completo:**
- Escenario de nueva venta de principio a fin
- 13 pasos desde login hasta retiro
- Qué ve cada usuario en cada momento

**Versión Móvil:**
- Cómo se adaptan las pantallas
- Navegación en móvil

**¿Para quién?**
- Diseñadores UI/UX
- QA testers
- Usuarios nuevos
- Documentación de interfaces

---

### [TEST_SCRIPTS.md](./TEST_SCRIPTS.md) 🧪 **SCRIPTS DE PRUEBA**
**Scripts para consola del navegador**

**7 Scripts Principales:**

1. **Verificar Usuario Actual**
   - Info de autenticación
   - Datos de Firestore
   - Estado del usuario

2. **Ver Comisiones del Usuario**
   - Lista todas las comisiones
   - Totales por estado
   - Resumen financiero

3. **Calcular Comisiones Manualmente**
   - Simulador de cálculos
   - Por niveles
   - Totales distribuidos

4. **Ver Red de Referidos**
   - Referidos directos
   - Info de cada referido
   - Team BV

5. **Simular Compra**
   - Qué pasaría si...
   - Comisiones generadas
   - Impacto en stats

6. **Verificar Wallet**
   - Balance pendiente/disponible
   - Total ganado/retirado
   - Puede retirar?

7. **Ver Todas las Órdenes**
   - Lista completa
   - Detalles de items
   - Total gastado

**Script Completo de Test:**
- Verifica todo el sistema
- 6 checks automáticos
- Diagnóstico completo

**¿Para quién?**
- Developers
- QA testers
- Troubleshooting
- Verificación de datos

---

## 📋 Guías Técnicas

### [COMMISSION_SYSTEM_GUIDE.md](./COMMISSION_SYSTEM_GUIDE.md) 💰 **SISTEMA DE COMISIONES**
**Documentación técnica completa del sistema de comisiones**

**Contenido:**
- Tipos de comisiones (DIRECT_SALE, UNILEVEL, FAST_START, BINARY_MATCH)
- Cálculos y porcentajes
- Diferencias entre plataformas (IFEDEM vs iAcelera)
- Estructura de Firestore
- Configuración del sistema
- Flujo de procesamiento
- Testing y verificación

**Secciones:**
1. Introducción al sistema
2. Tipos de comisiones
3. Configuración por plataforma
4. Estructura de datos
5. Cálculo automático
6. Wallets y pagos
7. Testing
8. Troubleshooting

**¿Para quién?**
- Developers trabajando en comisiones
- Configuración del sistema
- Entender cálculos internos
- Debugging

---

### [EJEMPLO_DATOS_PRUEBA.md](./EJEMPLO_DATOS_PRUEBA.md) 🗂️ **DATOS DE PRUEBA MANUAL**
**Guía paso a paso para crear datos de prueba manualmente**

**Contenido:**
- Estructura de red de ejemplo
- JSON templates para cada tipo de dato
- Usuarios, productos, órdenes
- Cómo crear datos en Firebase Console
- Verificación de datos

**¿Para quién?**
- Quienes prefieren crear datos manualmente
- Entender estructura de datos
- Testing específico
- Personalización de datos

**Nota:** Existe también `generate-test-data.html` que hace esto automáticamente con un click.

---

### [FIREBASE_RULES_SETUP.md](./FIREBASE_RULES_SETUP.md) 🔒 **REGLAS DE FIRESTORE**
**Configuración de seguridad de Firestore**

**Contenido:**
- Cómo publicar reglas
- Explicación de cada regla
- Permisos por colección
- Troubleshooting de permisos

**¿Para quién?**
- Setup inicial del proyecto
- Problemas de permisos
- Seguridad de datos

---

## 🛠️ Herramientas

### [generate-test-data.html](./generate-test-data.html) 🎯 **GENERADOR AUTOMÁTICO**
**Generador de datos de prueba con UI**

**Funcionalidad:**
- Un click para generar todo
- Crea 5 usuarios en red jerárquica
- Crea 3 productos
- Logs en tiempo real
- Manejo de usuarios existentes

**Usuarios Creados:**
- Admin (admin@test.com)
- Sponsor A (sponsora@test.com)
- Sponsor B (sponsorb@test.com)
- Afiliado 1 (afiliado1@test.com)
- Afiliado 2 (afiliado2@test.com)
- Password para todos: `password123`

**¿Cómo usar?**
1. Abre el archivo HTML en el navegador
2. Click en "Generar Datos de Prueba"
3. Espera 30 segundos
4. ¡Listo!

---

## 📊 Documentación del Sistema

### Arquitectura del Sistema

**Frontend:**
- Vue 3 + TypeScript
- Vite para build
- Pinia para state management
- Vue Router para navegación

**Backend:**
- Firebase Authentication
- Firestore Database
- Firebase Storage (futuro)
- Firebase Functions (futuro)

**Estructura de Código:**

```
src/
├── views/              # Páginas principales
│   ├── AuthView.vue           # Login/Registro
│   ├── AffiliateDashboard.vue # Dashboard de afiliado
│   ├── ProductCatalogView.vue # Catálogo
│   ├── CheckoutView.vue       # Checkout
│   ├── CommissionsView.vue    # Comisiones
│   └── admin/                 # Vistas de admin
│
├── shared/             # Código compartido
│   ├── composables/           # Vue composables
│   │   ├── useAuth.ts         # Autenticación
│   │   ├── useCommissions.ts  # Comisiones
│   │   ├── useOrders.ts       # Órdenes
│   │   ├── useProducts.ts     # Productos
│   │   └── useAffiliateStats.ts # Estadísticas
│   │
│   └── services/              # Servicios
│       └── commissionCalculator.ts # Motor de comisiones
│
├── stores/             # Pinia stores
│   ├── user.ts        # Estado del usuario
│   └── cart.ts        # Carrito de compras
│
└── config/             # Configuración
    └── firebase.ts    # Config de Firebase
```

### Colecciones de Firestore

```
firestore/
├── users/              # Usuarios
├── products/           # Productos
├── orders/             # Órdenes
├── commissions/        # Comisiones
└── wallets/            # Wallets
```

---

## 🎯 Rutas del Mapa

### ¿Qué documentación leer según tu necesidad?

**Quiero empezar a usar el sistema:**
→ `GUIA_RAPIDA_INICIO.md`

**Quiero entender cómo funciona todo:**
→ `EJEMPLOS_PRACTICOS.md` + `TUTORIAL_VISUAL.md`

**Necesito probar funcionalidades específicas:**
→ `TEST_SCRIPTS.md`

**Voy a trabajar en comisiones:**
→ `COMMISSION_SYSTEM_GUIDE.md`

**Tengo problemas de permisos:**
→ `FIREBASE_RULES_SETUP.md`

**Necesito crear datos de prueba:**
→ `generate-test-data.html` (automático)
→ `EJEMPLO_DATOS_PRUEBA.md` (manual)

**Quiero ver cómo debería verse la UI:**
→ `TUTORIAL_VISUAL.md`

**Debugging de cálculos:**
→ `TEST_SCRIPTS.md` + `EJEMPLOS_PRACTICOS.md`

---

## 📝 Resumen de Funcionalidades

### ✅ Implementado

**Autenticación:**
- Login/Registro con Firebase Auth
- Manejo de sesiones
- Permisos por rol (admin/affiliate)

**Dashboard:**
- Stats en tiempo real
- Progreso de rango
- Link de referido
- Referidos recientes
- Acciones rápidas

**Productos:**
- Catálogo con filtros
- Detalle de producto
- Carrito de compras
- Checkout completo

**Comisiones:**
- Cálculo automático
- 4 tipos (Direct, Unilevel, Fast Start, Binary)
- 7 niveles de profundidad
- Estados: pending → approved → paid

**Wallets:**
- Balance pendiente
- Balance disponible
- Total ganado
- Sistema de retiros

**Panel Admin:**
- Dashboard general
- Gestión de productos
- Gestión de órdenes
- Gestión de usuarios
- Gestión de comisiones

**Rangos:**
- Sistema de progreso
- BV automático
- Visualización de progreso
- 4 rangos IFEDEM / 8 rangos iAcelera

### 🔜 Próximamente

- Genealogía visual (árbol de red)
- Sistema de notificaciones
- Reportes y gráficas
- Integración de pagos real
- App móvil
- Email automation
- Sistema de tickets de soporte

---

## 🐛 Troubleshooting

### Problemas Comunes

**"No puedo hacer login"**
→ Ver: `GUIA_RAPIDA_INICIO.md` sección "Solución de Problemas"

**"Missing or insufficient permissions"**
→ Ver: `FIREBASE_RULES_SETUP.md`

**"No se generan comisiones"**
→ Ver: `COMMISSION_SYSTEM_GUIDE.md` sección "Testing"

**"Dashboard muestra stats en 0"**
→ Haz una compra primero
→ Ver: `EJEMPLOS_PRACTICOS.md` → Ejemplo 1

**"Cálculos incorrectos"**
→ Usa scripts de: `TEST_SCRIPTS.md`
→ Compara con: `EJEMPLOS_PRACTICOS.md`

---

## 🤝 Contribuir

Para contribuir al proyecto:

1. **Lee la documentación relevante**
2. **Prueba el sistema** con `generate-test-data.html`
3. **Reporta bugs** con pasos para reproducir
4. **Propón mejoras** con casos de uso específicos

---

## 📞 Soporte

**Documentación:**
- Esta página: Índice completo
- Guías individuales: Ver arriba

**Testing:**
- Scripts automáticos en `TEST_SCRIPTS.md`
- Generador de datos en `generate-test-data.html`

**Ejemplos:**
- Escenarios prácticos en `EJEMPLOS_PRACTICOS.md`
- Tutorial visual en `TUTORIAL_VISUAL.md`

---

## 🎓 Orden Recomendado de Lectura

### Para Usuarios Nuevos:
1. `GUIA_RAPIDA_INICIO.md` - Setup inicial
2. `TUTORIAL_VISUAL.md` - Familiarízate con la UI
3. `EJEMPLOS_PRACTICOS.md` - Entiende cómo funciona

### Para Developers:
1. `GUIA_RAPIDA_INICIO.md` - Setup y datos de prueba
2. `COMMISSION_SYSTEM_GUIDE.md` - Sistema técnico
3. `TEST_SCRIPTS.md` - Herramientas de debugging
4. Estructura de código (arriba)

### Para QA/Testers:
1. `GUIA_RAPIDA_INICIO.md` - Setup
2. `generate-test-data.html` - Datos
3. `EJEMPLOS_PRACTICOS.md` - Casos de prueba
4. `TEST_SCRIPTS.md` - Verificación

### Para Admin/Product:
1. `TUTORIAL_VISUAL.md` - Ver funcionalidades
2. `EJEMPLOS_PRACTICOS.md` - Casos de uso
3. `COMMISSION_SYSTEM_GUIDE.md` - Entender comisiones

---

## 🚀 Empezar Ahora

```bash
# 1. Clona el repositorio
git clone https://github.com/JesusDelaVega/ifedem-platform.git
cd ifedem-platform

# 2. Instala dependencias
npm install

# 3. Abre el generador de datos
open generate-test-data.html
# Click en "Generar Datos de Prueba"

# 4. Inicia el servidor
npm run dev

# 5. Abre en navegador
# http://localhost:5176

# 6. Login
# Email: admin@test.com
# Password: password123

# 🎉 ¡Listo!
```

**Siguiente paso:** Lee `GUIA_RAPIDA_INICIO.md` para ver qué probar.

---

**Última actualización:** Enero 2026
**Versión:** 1.0.0
**Plataformas:** IFEDEM + iAcelera
