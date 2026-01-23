# Sistema de Comisiones MLM - Guía Completa

## 🎯 Sistema Implementado

Se ha creado un sistema completo de cálculo y gestión de comisiones MLM para ambas plataformas (iAcelera e IFEDEM).

---

## ✅ Funcionalidades Implementadas

### 1. Cálculo Automático de Comisiones
- ✅ Procesamiento automático al crear una orden
- ✅ Cálculo de comisiones directas del patrocinador
- ✅ Comisiones por niveles (unilevel)
- ✅ Fast Start Bonus (primeros 30 días)
- ✅ Estructura para comisiones binarias (iAcelera)

### 2. Tipos de Comisiones

#### Comisión Directa (DIRECT_SALE)
- Usuario recibe comisión cuando su patrocinado directo realiza una compra
- **iAcelera**: 10% del CV (Commissionable Value)
- **IFEDEM**: 12% del CV

#### Comisiones por Nivel (UNILEVEL)
Comisiones de todos los niveles del upline:

**iAcelera** (5 niveles):
- Nivel 1: 5%
- Nivel 2: 3%
- Nivel 3: 2%
- Nivel 4: 1%
- Nivel 5: 1%

**IFEDEM** (7 niveles):
- Nivel 1: 8%
- Nivel 2: 5%
- Nivel 3: 3%
- Nivel 4: 2%
- Nivel 5: 2%
- Nivel 6: 1%
- Nivel 7: 1%

#### Fast Start Bonus
- **Solo iAcelera**: 5% adicional
- **Requisito**: El comprador debe estar en sus primeros 30 días
- Se paga al patrocinador directo

### 3. Sistema de Wallets
- Balance pendiente (pending)
- Balance disponible (available)
- Historial de ganancias totales
- Tracking de retiros

### 4. Vista de Comisiones
- Dashboard con estadísticas
- Tabla con historial completo
- Filtros por estado, tipo y búsqueda
- Información de wallet en tiempo real

---

## 📊 Flujo del Sistema

```
1. Usuario crea una orden
   ↓
2. Orden se guarda en Firestore
   ↓
3. Sistema detecta la nueva orden
   ↓
4. CommissionCalculator.processOrderCommissions()
   ↓
5. Se calculan todas las comisiones:
   - Comisión directa del sponsor
   - Comisiones por niveles (upline)
   - Fast Start (si aplica)
   - Binarias (si aplica)
   ↓
6. Comisiones se guardan en Firestore
   ↓
7. Wallets se actualizan
   ↓
8. Usuario puede ver sus comisiones en /commissions
```

---

## 🚀 Cómo Usar

### Para Usuarios/Afiliados

1. **Ver Comisiones**
   - Navega a `/commissions` o desde el dashboard
   - Ve tu balance total, pendiente, aprobado y pagado
   - Filtra por estado o tipo de comisión

2. **Entender el Wallet**
   - **Pendiente**: Comisiones generadas pero no aprobadas
   - **Disponible**: Comisiones aprobadas, listas para retiro
   - **Mínimo para retiro**: $50.00

3. **Generar Comisiones**
   - Invita a nuevos afiliados con tu código de referido
   - Cuando tus referidos compren, generas comisiones
   - Comisiones se generan automáticamente

### Para Administradores

1. **Aprobar Comisiones**
   ```javascript
   // Cambiar estado de PENDING a APPROVED
   await updateDoc(doc(db, 'commissions', commissionId), {
     status: 'APPROVED',
     approvedAt: serverTimestamp()
   })
   ```

2. **Procesar Pagos**
   ```javascript
   // Cambiar estado de APPROVED a PAID
   await updateDoc(doc(db, 'commissions', commissionId), {
     status: 'PAID',
     paidAt: serverTimestamp(),
     paymentMethod: 'bank_transfer',
     paymentReference: 'TRANS-123456'
   })
   ```

3. **Ver Reporte de Comisiones**
   - Ir a Firestore → `commissions`
   - Filtrar por fecha, estado, plataforma
   - Exportar datos si necesario

---

## 📁 Estructura de Archivos

```
src/
├── shared/
│   ├── services/
│   │   └── commissionCalculator.ts    # Lógica de cálculo
│   │
│   ├── composables/
│   │   ├── useCommissions.ts          # Composable para vistas
│   │   └── useOrders.ts               # Modificado para procesar comisiones
│   │
│   └── types/
│       ├── commission.ts              # Tipos de comisiones
│       ├── bonus.ts                   # Tipos de bonos
│       └── network.ts                 # Tipos de red
│
└── views/
    └── CommissionsView.vue            # Vista principal
```

---

## 🗄️ Estructura de Datos en Firestore

### Colección: `commissions`

```javascript
{
  id: "comm_abc123",
  userId: "user_xyz789",          // Quien RECIBE la comisión

  // Información de la orden
  orderId: "ord_123",
  orderNumber: "ORD-12345678-123",
  orderTotal: 299.99,
  orderBV: 150,
  orderCV: 200,

  // Generador de la comisión
  generatedBy: "user_buyer",      // Quien HIZO la compra
  generatedByName: "Juan Pérez",

  // Tipo y monto
  type: "DIRECT_SALE",            // o UNILEVEL, FAST_START, etc.
  amount: 20.00,
  percentage: 0.10,               // 10%
  calculatedFrom: 200,            // CV usado para cálculo

  // Jerarquía
  level: 1,                       // Nivel en el upline
  leg: null,                      // 'left' o 'right' para binario

  // Estado
  status: "PENDING",              // PENDING, APPROVED, PAID, CANCELLED
  platform: "iacelera",

  // Metadata
  description: "Comisión directa por venta de Juan Pérez",
  notes: null,

  // Rangos al momento
  userRankAtTime: "silver",
  generatorRankAtTime: "bronze",

  // Fechas
  createdAt: Timestamp,
  calculatedAt: Timestamp,
  approvedAt: Timestamp,
  paidAt: Timestamp,
  periodStart: Timestamp,
  periodEnd: Timestamp
}
```

### Colección: `wallets`

```javascript
{
  id: "user_xyz789_iacelera",      // userId_platform
  userId: "user_xyz789",
  platform: "iacelera",

  availableBalance: 150.00,        // Listo para retiro
  pendingBalance: 75.00,           // Esperando aprobación
  totalEarnings: 1250.00,          // Histórico
  totalWithdrawals: 1025.00,       // Total retirado

  currency: "USD",
  lastUpdated: Timestamp
}
```

---

## ⚙️ Configuración de Comisiones

Archivo: `src/shared/services/commissionCalculator.ts`

```typescript
const COMMISSION_CONFIG = {
  iacelera: {
    directSponsor: 0.10,      // 10%
    binaryMatch: 0.08,        // 8%
    fastStart: 0.05,          // 5%

    levelCommissions: {
      1: 0.05,
      2: 0.03,
      3: 0.02,
      4: 0.01,
      5: 0.01,
    },
  },

  ifedem: {
    directSponsor: 0.12,      // 12%

    levelCommissions: {
      1: 0.08,
      2: 0.05,
      3: 0.03,
      4: 0.02,
      5: 0.02,
      6: 0.01,
      7: 0.01,
    },
  }
}
```

Para modificar porcentajes, editar este objeto.

---

## 🧪 Testing del Sistema

### 1. Crear Usuario de Prueba con Patrocinador

```javascript
// En Firebase Console
// Usuario A (patrocinador)
{
  id: "userA",
  email: "patron@test.com",
  firstName: "Patron",
  lastName: "Test",
  sponsorId: null,
  referralCode: "PATEST001"
}

// Usuario B (patrocinado)
{
  id: "userB",
  email: "afiliado@test.com",
  firstName: "Afiliado",
  lastName: "Nuevo",
  sponsorId: "userA",
  referralCode: "AFINUE002"
}
```

### 2. Crear Orden como Usuario B

```javascript
// Crear una orden de $299.99 con CV de $200
// Usuario B hace la compra
```

### 3. Verificar Comisiones Generadas

```javascript
// Ir a Firestore → commissions
// Debe haber:
// - 1 comisión DIRECT_SALE para userA (10% o 12% de $200)
// - Si hay más upline, comisiones UNILEVEL
```

### 4. Verificar Wallet Actualizado

```javascript
// Ir a Firestore → wallets → userA_platform
// Debe tener pendingBalance actualizado
```

---

## 🔧 Próximas Mejoras

### Pendientes de Implementar:

1. **Comisiones Binarias Completas** (iAcelera)
   - Tracking de pierna izquierda/derecha
   - Cálculo de volumen por pierna
   - Binary match commission

2. **Bonos por Rango**
   - Bono mensual por calificación de rango
   - Bonos de liderazgo
   - Pool bonuses

3. **Sistema de Retiros**
   - Solicitud de retiro
   - Aprobación de admin
   - Procesamiento de pagos
   - Tracking de métodos de pago

4. **Notificaciones**
   - Email al generar comisión
   - Email al aprobar comisión
   - Email al procesar pago

5. **Reportes Avanzados**
   - Gráficas de crecimiento
   - Comisiones por período
   - Top earners
   - Exportar a CSV/Excel

---

## 📖 Ejemplos de Uso

### Ejemplo 1: Venta Directa Simple

**Escenario:**
- Usuario A es patrocinador
- Usuario B se registra con código de A
- Usuario B compra producto de $200 CV
- Plataforma: IFEDEM (12% directo)

**Resultado:**
- Usuario A recibe: $24.00 (12% de $200)
- Tipo: DIRECT_SALE
- Estado: PENDING

### Ejemplo 2: Comisiones Multi-Nivel

**Escenario:**
- Usuario A → Usuario B → Usuario C → Usuario D
- Usuario D compra producto de $200 CV
- Plataforma: iAcelera

**Resultado:**
- Usuario C recibe: $10.00 (5% nivel 1)
- Usuario B recibe: $6.00 (3% nivel 2)
- Usuario A recibe: $4.00 (2% nivel 3)
- Todos tipo: UNILEVEL
- Todos estado: PENDING

### Ejemplo 3: Fast Start Bonus

**Escenario:**
- Usuario B se registró hace 15 días
- Usuario A es su patrocinador
- Usuario B compra $200 CV
- Plataforma: iAcelera

**Resultado:**
- Usuario A recibe: $20.00 (10% directo)
- Usuario A recibe: $10.00 (5% fast start)
- Total para A: $30.00

---

## 🚨 Troubleshooting

### Comisiones no se generan

**Problema:** Al crear orden, no aparecen comisiones

**Solución:**
1. Verificar que el usuario tenga `sponsorId`
2. Revisar consola del navegador para errores
3. Verificar que la orden tenga `platform` definido
4. Revisar reglas de Firestore (deben permitir escritura a `commissions`)

### Wallet no se actualiza

**Problema:** Las comisiones existen pero wallet no cambia

**Solución:**
1. Verificar que existe documento en `wallets/userId_platform`
2. Revisar reglas de Firestore para wallets
3. Ver logs en consola del servidor

### Montos incorrectos

**Problema:** Los porcentajes no coinciden

**Solución:**
1. Revisar `COMMISSION_CONFIG` en `commissionCalculator.ts`
2. Verificar que se esté usando CV y no total
3. Revisar que la plataforma sea correcta

---

## 📞 Soporte

Para dudas o problemas:
1. Revisar esta guía
2. Ver logs en consola (F12)
3. Revisar Firestore directamente
4. Consultar código en `src/shared/services/commissionCalculator.ts`

---

## ✅ Estado Actual

**Implementado:**
- ✅ Cálculo automático de comisiones
- ✅ Comisiones directas
- ✅ Comisiones por niveles
- ✅ Fast Start Bonus
- ✅ Actualización de wallets
- ✅ Vista de comisiones para usuarios
- ✅ Filtros y búsqueda
- ✅ Stats en tiempo real

**Pendiente:**
- ❌ Comisiones binarias completas
- ❌ Sistema de retiros
- ❌ Aprobación de comisiones (admin)
- ❌ Notificaciones por email
- ❌ Reportes avanzados

El sistema básico está completo y funcional. Las comisiones se generan automáticamente en cada venta.
