# 📚 Ejemplos Prácticos - Sistema MLM

## 🎯 Índice de Ejemplos

1. [Ejemplo 1: Primera Venta y Comisiones](#ejemplo-1-primera-venta-y-comisiones)
2. [Ejemplo 2: Red de 3 Niveles](#ejemplo-2-red-de-3-niveles)
3. [Ejemplo 3: Múltiples Compras](#ejemplo-3-múltiples-compras)
4. [Ejemplo 4: Progreso de Rango](#ejemplo-4-progreso-de-rango)
5. [Ejemplo 5: Fast Start Bonus](#ejemplo-5-fast-start-bonus)
6. [Ejemplo 6: Sistema de Wallets](#ejemplo-6-sistema-de-wallets)
7. [Ejemplo 7: Panel de Admin](#ejemplo-7-panel-de-admin)

---

## Ejemplo 1: Primera Venta y Comisiones

### 📖 Escenario
Juan (afiliado1@test.com) hace su primera compra del "Kit de Inicio Emprendedor" por $299.99

### 👥 Estructura de Red
```
ADMIN (admin@test.com)
  └─ SPONSOR A (sponsora@test.com)
      └─ JUAN (afiliado1@test.com) ← COMPRA AQUÍ
```

### 💰 Cálculo de Comisiones Paso a Paso

**Producto Comprado:**
- Nombre: Kit de Inicio Emprendedor
- Precio: $299.99
- CV (Commissionable Value): 250
- BV (Business Volume): 150

**Comisión para Sponsor A (Nivel 1 - Directo):**
```javascript
// Comisión directa = 12% del CV
CV = 250
Porcentaje = 12%
Comisión = 250 × 0.12 = $30.00
Tipo: DIRECT_SALE
Estado: PENDING
```

**Comisión para Admin (Nivel 2):**
```javascript
// Comisión unilevel nivel 2 = 5% del CV
CV = 250
Porcentaje = 5%
Comisión = 250 × 0.05 = $12.50
Tipo: UNILEVEL
Nivel: 2
Estado: PENDING
```

### 📊 Resultado Final

**Orden Creada:**
```json
{
  "orderNumber": "ORD-1737740123456",
  "userId": "afiliado1-uid",
  "total": 299.99,
  "subtotal": 299.99,
  "status": "pending",
  "paymentMethod": "bank_transfer",
  "items": [
    {
      "productId": "kit-001",
      "name": "Kit de Inicio Emprendedor",
      "price": 299.99,
      "quantity": 1,
      "bv": 150,
      "cv": 250
    }
  ]
}
```

**Comisiones Generadas:**
```json
[
  {
    "userId": "sponsora-uid",
    "amount": 30.00,
    "type": "DIRECT_SALE",
    "status": "PENDING",
    "level": 1,
    "fromUserId": "afiliado1-uid",
    "orderId": "order-123"
  },
  {
    "userId": "admin-uid",
    "amount": 12.50,
    "type": "UNILEVEL",
    "status": "PENDING",
    "level": 2,
    "fromUserId": "afiliado1-uid",
    "orderId": "order-123"
  }
]
```

**Wallets Actualizados:**
- **Sponsor A:** Pendiente = $30.00, Disponible = $0.00
- **Admin:** Pendiente = $12.50, Disponible = $0.00

### 🖥️ Qué Verás en la UI

**Dashboard de Sponsor A:**
```
┌─────────────────────────────────────┐
│ 💵 Ventas de Equipo                 │
│ $299.99                             │
│ ↑ Desde el inicio                   │
├─────────────────────────────────────┤
│ 💰 Ganancias Totales                │
│ $30.00                              │
│ 1 comisión pendiente                │
├─────────────────────────────────────┤
│ 📊 Business Volume                  │
│ 150 BV                              │
│ ↑ Tu equipo generó                  │
├─────────────────────────────────────┤
│ 👥 Red Activa                       │
│ 2 Referidos Directos                │
│ 2 Total en tu red                   │
└─────────────────────────────────────┘
```

**Página de Comisiones de Sponsor A:**
```
┌───────────────────────────────────────────────────────────┐
│ Comisión #1                                               │
├───────────────────────────────────────────────────────────┤
│ Tipo: Venta Directa          Estado: 🟡 Pendiente        │
│ Monto: $30.00                                             │
│ Generado por: Juan Pérez (afiliado1@test.com)            │
│ Orden: ORD-1737740123456                                  │
│ Fecha: 24/01/2026 11:30 AM                                │
│ Nivel: 1                                                  │
└───────────────────────────────────────────────────────────┘
```

---

## Ejemplo 2: Red de 3 Niveles

### 📖 Escenario
María (afiliado2@test.com) también compra un producto, demostrando comisiones en 3 niveles.

### 👥 Estructura de Red
```
ADMIN (nivel 2)
  └─ SPONSOR A (nivel 1)
      └─ MARÍA (nivel 0) ← COMPRA AQUÍ
```

### 💰 Compra: Curso Digital de Marketing

**Producto:**
- Precio: $99.99
- CV: 80
- BV: 50

### 📊 Comisiones Generadas

**1. Sponsor A (Patrocinador Directo):**
```
Tipo: DIRECT_SALE
Cálculo: 80 CV × 12% = $9.60
Estado: PENDING
```

**2. Admin (Nivel 2):**
```
Tipo: UNILEVEL
Nivel: 2
Cálculo: 80 CV × 5% = $4.00
Estado: PENDING
```

### 🖥️ Dashboard Actualizado

**Sponsor A ahora muestra:**
```
Ventas de Equipo: $399.98  (Juan $299.99 + María $99.99)
Ganancias Totales: $39.60  ($30.00 + $9.60)
Team BV: 200               (150 + 50)
Referidos: 2               (Juan + María)
Comisiones Pendientes: 2
```

**Admin ahora muestra:**
```
Ventas de Equipo: $399.98
Ganancias Totales: $16.50  ($12.50 + $4.00)
Team BV: 200
Red Total: 4 personas      (Sponsor A + Sponsor B + Juan + María)
Comisiones Pendientes: 2
```

---

## Ejemplo 3: Múltiples Compras del Mismo Usuario

### 📖 Escenario
Juan hace una segunda compra: Membresía Premium por $49.99

### 💰 Nueva Compra

**Producto:**
- Precio: $49.99
- CV: 40
- BV: 30

### 📊 Comisiones Adicionales

**Sponsor A:**
```
Comisión Nueva: 40 CV × 12% = $4.80
Comisiones Totales: $30.00 + $9.60 + $4.80 = $44.40
```

**Admin:**
```
Comisión Nueva: 40 CV × 5% = $2.00
Comisiones Totales: $12.50 + $4.00 + $2.00 = $18.50
```

### 🖥️ Historial de Comisiones de Sponsor A

```
┌────────────────────────────────────────────────────────┐
│ Todas las Comisiones (3)                               │
├────────────────────────────────────────────────────────┤
│ 1. $30.00 | Venta Directa | Juan Pérez | Kit Inicio   │
│    24/01/2026 11:30 AM | 🟡 Pendiente                  │
├────────────────────────────────────────────────────────┤
│ 2. $9.60  | Venta Directa | María López | Curso       │
│    24/01/2026 12:15 PM | 🟡 Pendiente                  │
├────────────────────────────────────────────────────────┤
│ 3. $4.80  | Venta Directa | Juan Pérez | Membresía    │
│    24/01/2026 14:20 PM | 🟡 Pendiente                  │
└────────────────────────────────────────────────────────┘

Total Pendiente: $44.40
```

---

## Ejemplo 4: Progreso de Rango

### 📖 Escenario
Sponsor A está trabajando para alcanzar el rango de "Director"

### 🎯 Requisitos para Director (IFEDEM)
- Team BV: 5,000 BV
- Actualmente: 200 BV
- Faltante: 4,800 BV

### 📊 Progreso Visual

**Dashboard:**
```
┌────────────────────────────────────────────────────────┐
│ 📈 Progreso de Rango                                   │
├────────────────────────────────────────────────────────┤
│ Rango Actual: MANAGER                                  │
│                                                        │
│ Próximo Rango: DIRECTOR                                │
│ Requisito: 5,000 BV de equipo                          │
│                                                        │
│ Tu Progreso:                                           │
│ ▓▓░░░░░░░░░░░░░░░░░░░░░░░░ 4% (200 / 5,000 BV)       │
│                                                        │
│ ¡Sigue así! Necesitas 4,800 BV más                     │
│                                                        │
│ 💡 Tip: Cada Kit de Inicio = 150 BV                    │
│    Necesitas ~32 ventas más para alcanzar Director    │
└────────────────────────────────────────────────────────┘
```

### 📈 Simulación de Crecimiento

**Después de 10 Kits vendidos en tu equipo:**
```
Team BV: 1,700 BV (200 + 1,500)
Progreso: 34%
Faltante: 3,300 BV
Ventas necesarias: ~22 Kits más
```

**Después de 30 Kits vendidos:**
```
Team BV: 4,700 BV
Progreso: 94%
Faltante: 300 BV
Ventas necesarias: ~2 Kits más
¡Casi ahí! 🎉
```

**Al alcanzar Director:**
```
┌────────────────────────────────────────────────────────┐
│ 🎉 ¡FELICIDADES!                                       │
│                                                        │
│ Has alcanzado el rango de DIRECTOR                     │
│                                                        │
│ Nuevos Beneficios:                                     │
│ ✅ Comisiones de hasta 7 niveles                       │
│ ✅ Bonos mensuales por liderazgo                       │
│ ✅ Badge de Director en tu perfil                      │
│                                                        │
│ Próximo objetivo: EXECUTIVE (25,000 BV)                │
└────────────────────────────────────────────────────────┘
```

---

## Ejemplo 5: Fast Start Bonus (Solo iAcelera)

### 📖 Escenario
Nuevo afiliado en iAcelera hace su primera venta en los primeros 30 días.

### 👥 Estructura
```
MENTOR (iacelera)
  └─ NUEVO AFILIADO (registrado hace 10 días)
      └─ CLIENTE (compra Kit $299.99)
```

### 💰 Comisiones con Fast Start

**Producto:**
- Precio: $299.99
- CV: 250
- BV: 150

**Comisión Directa (10% en iAcelera):**
```
250 CV × 10% = $25.00
Tipo: DIRECT_SALE
```

**Fast Start Bonus (5% extra - primeros 30 días):**
```
250 CV × 5% = $12.50
Tipo: FAST_START
Nota: "Solo aplica en primeros 30 días"
```

**Total para Nuevo Afiliado:**
```
$25.00 + $12.50 = $37.50
(vs $25.00 normal sin Fast Start)
¡50% más de comisión! 🚀
```

### 🖥️ Vista de Comisiones

```
┌────────────────────────────────────────────────────────┐
│ Comisiones del Día                                     │
├────────────────────────────────────────────────────────┤
│ 1. $25.00 | Venta Directa | Cliente X | Kit Inicio    │
│    Estado: 🟡 Pendiente                                │
├────────────────────────────────────────────────────────┤
│ 2. $12.50 | Fast Start Bonus ⚡ | Cliente X            │
│    Estado: 🟡 Pendiente                                │
│    ⏰ Válido hasta: 03/02/2026 (20 días restantes)     │
└────────────────────────────────────────────────────────┘

💡 ¡Aprovecha tus primeros 30 días! Cada venta te da 50% más
```

### 📅 Timeline de Fast Start

```
Día 1-30:  Vendes y recibes 15% total (10% + 5% Fast Start)
Día 31+:   Vendes y recibes 10% (solo comisión directa)

Ejemplo:
- Día 15: Venta de $1,000 → Ganas $150
- Día 45: Venta de $1,000 → Ganas $100

¡Diferencia de $50!
```

---

## Ejemplo 6: Sistema de Wallets

### 📖 Escenario
Sponsor A ha acumulado comisiones y quiere retirar dinero.

### 💰 Estado del Wallet

**Vista Inicial:**
```
┌────────────────────────────────────────────────────────┐
│ 💼 Mi Wallet                                           │
├────────────────────────────────────────────────────────┤
│ Balance Pendiente:        $450.00                      │
│ (Esperando aprobación del admin)                       │
│                                                        │
│ Balance Disponible:       $0.00                        │
│ (Listo para retiro)                                    │
│                                                        │
│ Total Ganado Histórico:   $450.00                      │
├────────────────────────────────────────────────────────┤
│ ⚠️ Mínimo para retiro: $50.00                          │
│                                                        │
│ [ Solicitar Retiro ] (deshabilitado)                   │
│ Necesitas balance disponible                           │
└────────────────────────────────────────────────────────┘
```

### 👨‍💼 Admin Aprueba Comisiones

**Panel de Admin:**
```
Comisiones Pendientes (15)
┌────────────────────────────────────────────────────────┐
│ Seleccionar todas | [ Aprobar Seleccionadas ]          │
├────────────────────────────────────────────────────────┤
│ ☑️ Sponsor A | $30.00 | Venta Directa | 24/01/2026    │
│ ☑️ Sponsor A | $9.60  | Venta Directa | 24/01/2026    │
│ ☑️ Sponsor A | $4.80  | Venta Directa | 24/01/2026    │
│ ... (12 más)                                           │
└────────────────────────────────────────────────────────┘

[Aprobar] ← Admin hace click
```

**Sistema actualiza automáticamente:**
```javascript
// Antes
wallet.pending = 450.00
wallet.available = 0.00

// Después
wallet.pending = 0.00
wallet.available = 450.00  // ← Movido a disponible
wallet.totalEarned = 450.00

// Comisiones
status: PENDING → APPROVED
```

### 💸 Sponsor A Solicita Retiro

**Wallet Actualizado:**
```
┌────────────────────────────────────────────────────────┐
│ 💼 Mi Wallet                                           │
├────────────────────────────────────────────────────────┤
│ Balance Pendiente:        $0.00                        │
│                                                        │
│ Balance Disponible:       $450.00 ✅                   │
│ (Listo para retiro)                                    │
│                                                        │
│ Total Ganado Histórico:   $450.00                      │
├────────────────────────────────────────────────────────┤
│ ✅ Puedes retirar hasta $450.00                        │
│                                                        │
│ Monto a retirar: [___400___]                           │
│                                                        │
│ [ Solicitar Retiro de $400 ] ← Habilitado             │
└────────────────────────────────────────────────────────┘
```

**Después del Retiro:**
```
Balance Disponible: $50.00  ($450 - $400)
Balance Retirado: $400.00
Método: Transferencia Bancaria
Estado: Procesando
```

### 📊 Historial de Transacciones

```
┌────────────────────────────────────────────────────────┐
│ Historial de Wallet                                    │
├────────────────────────────────────────────────────────┤
│ 24/01/2026 | +$30.00  | Comisión Aprobada             │
│ 24/01/2026 | +$9.60   | Comisión Aprobada             │
│ 24/01/2026 | +$4.80   | Comisión Aprobada             │
│ 25/01/2026 | +$405.60 | Comisiones Aprobadas (12)     │
│ 25/01/2026 | -$400.00 | Retiro Solicitado ⏳          │
├────────────────────────────────────────────────────────┤
│ Balance Actual: $50.00                                 │
└────────────────────────────────────────────────────────┘
```

---

## Ejemplo 7: Panel de Admin

### 📖 Escenario
Admin necesita gestionar productos, órdenes y usuarios.

### 🛍️ Crear Nuevo Producto

**Formulario:**
```
┌────────────────────────────────────────────────────────┐
│ ➕ Crear Nuevo Producto                                │
├────────────────────────────────────────────────────────┤
│ Nombre: [Masterclass de Ventas___________________]    │
│                                                        │
│ Descripción:                                           │
│ [Aprende técnicas avanzadas de cierre de ventas]      │
│                                                        │
│ SKU: [MASTER-001_______]                               │
│                                                        │
│ Precio: [$__199.99____]                                │
│                                                        │
│ Tipo: [▼ course        ]                               │
│       - course                                         │
│       - starter_kit                                    │
│       - membership                                     │
│       - physical                                       │
│                                                        │
│ Business Volume (BV): [__80_____]                      │
│ Commissionable Value (CV): [__160____]                 │
│ Puntos: [__80_____]                                    │
│                                                        │
│ Stock: [__100____]  (-1 = ilimitado)                   │
│                                                        │
│ Categoría: [▼ education]                               │
│                                                        │
│ [ Cancelar ]  [ Crear Producto ]                       │
└────────────────────────────────────────────────────────┘
```

**Producto Creado:**
```json
{
  "id": "master-001",
  "name": "Masterclass de Ventas",
  "sku": "MASTER-001",
  "price": 199.99,
  "bv": 80,
  "cv": 160,
  "points": 80,
  "type": "course",
  "category": "education",
  "stock": 100,
  "status": "active",
  "createdAt": "2026-01-24T18:00:00Z"
}
```

### 📦 Gestión de Órdenes

**Lista de Órdenes:**
```
┌──────────────────────────────────────────────────────────────┐
│ 📦 Gestión de Órdenes                                        │
│ Filtros: [Todas ▼] [Fecha ▼] [Buscar____________]           │
├──────────────────────────────────────────────────────────────┤
│ ORD-123456 | Juan Pérez | $299.99 | 🟡 Pendiente            │
│ 24/01/2026 11:30 AM | Kit de Inicio | Transferencia          │
│ [ Ver Detalles ] [ Aprobar ] [ Cancelar ]                    │
├──────────────────────────────────────────────────────────────┤
│ ORD-123457 | María López | $99.99 | 🟡 Pendiente            │
│ 24/01/2026 12:15 PM | Curso Digital | Transferencia          │
│ [ Ver Detalles ] [ Aprobar ] [ Cancelar ]                    │
├──────────────────────────────────────────────────────────────┤
│ ORD-123458 | Pedro García | $49.99 | ✅ Completado          │
│ 23/01/2026 09:00 AM | Membresía | PayPal                     │
│ [ Ver Detalles ]                                             │
└──────────────────────────────────────────────────────────────┘
```

**Detalle de Orden:**
```
┌──────────────────────────────────────────────────────────────┐
│ 📦 Orden ORD-123456                                          │
├──────────────────────────────────────────────────────────────┤
│ Cliente: Juan Pérez (afiliado1@test.com)                     │
│ Fecha: 24/01/2026 11:30:15 AM                                │
│ Estado: 🟡 Pendiente                                         │
│                                                              │
│ Items:                                                       │
│ 1x Kit de Inicio Emprendedor                 $299.99        │
│    BV: 150 | CV: 250                                         │
│                                                              │
│ Subtotal:                                    $299.99        │
│ Envío:                                       $0.00          │
│ Total:                                       $299.99        │
│                                                              │
│ Método de Pago: Transferencia Bancaria                       │
│                                                              │
│ Dirección de Envío:                                          │
│ Calle Reforma 123                                            │
│ Ciudad de México, CDMX 06600                                 │
│ México                                                       │
│                                                              │
│ Comisiones Generadas (2):                                    │
│ - Sponsor A: $30.00 (DIRECT_SALE)                            │
│ - Admin: $12.50 (UNILEVEL nivel 2)                           │
│                                                              │
│ [ Aprobar Orden ] [ Cancelar Orden ] [ Imprimir ]            │
└──────────────────────────────────────────────────────────────┘
```

### 👥 Gestión de Usuarios

**Lista de Usuarios:**
```
┌──────────────────────────────────────────────────────────────┐
│ 👥 Gestión de Usuarios (125 total)                          │
│ Filtros: [Todos ▼] [Rango ▼] [Buscar____________]           │
├──────────────────────────────────────────────────────────────┤
│ Sponsor A | sponsora@test.com | MANAGER                      │
│ Equipo: 45 | BV: 12,450 | Ventas: $45,890                    │
│ [ Ver Perfil ] [ Editar ] [ Ver Red ]                        │
├──────────────────────────────────────────────────────────────┤
│ Sponsor B | sponsorb@test.com | AFFILIATE                    │
│ Equipo: 12 | BV: 3,200 | Ventas: $12,450                     │
│ [ Ver Perfil ] [ Editar ] [ Ver Red ]                        │
├──────────────────────────────────────────────────────────────┤
│ Juan Pérez | afiliado1@test.com | AFFILIATE                  │
│ Equipo: 0 | BV: 0 | Ventas: $299.99                          │
│ [ Ver Perfil ] [ Editar ] [ Ver Red ]                        │
└──────────────────────────────────────────────────────────────┘
```

**Perfil de Usuario:**
```
┌──────────────────────────────────────────────────────────────┐
│ 👤 Perfil: Sponsor A                                         │
├──────────────────────────────────────────────────────────────┤
│ Información Personal:                                        │
│ - Email: sponsora@test.com                                   │
│ - Nombre: Ana García Rodríguez                               │
│ - Teléfono: +52 55 1234 5678                                 │
│ - Fecha Registro: 15/12/2025                                 │
│                                                              │
│ Estado del Afiliado:                                         │
│ - Rol: Affiliate                                             │
│ - Rango: MANAGER                                             │
│ - Estado: ✅ Activo                                          │
│ - Email Verificado: ✅ Sí                                    │
│                                                              │
│ Estadísticas:                                                │
│ - Referidos Directos: 45                                     │
│ - Total en Red: 127                                          │
│ - Team BV: 12,450                                            │
│ - Ventas de Equipo: $45,890.50                               │
│ - Comisiones Ganadas: $5,234.60                              │
│                                                              │
│ Wallet:                                                      │
│ - Pendiente: $450.00                                         │
│ - Disponible: $1,234.60                                      │
│ - Total Ganado: $5,234.60                                    │
│ - Total Retirado: $3,550.00                                  │
│                                                              │
│ Red Genealógica:                                             │
│ - Patrocinador: Admin (admin@test.com)                       │
│ - Nivel en la red: 2                                         │
│                                                              │
│ [ Editar ] [ Ver Red Completa ] [ Ajustar Comisiones ]       │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Casos de Prueba Completos

### Caso de Prueba 1: Nuevo Usuario se Registra

```javascript
// 1. Usuario hace click en link de referido
URL: https://ifedem.com/register?ref=sponsora123

// 2. Formulario pre-llenado
sponsorCode: "sponsora123" (ya capturado del URL)

// 3. Usuario llena datos
email: "nuevo@test.com"
password: "password123"
firstName: "Carlos"
lastName: "Mendoza"

// 4. Sistema crea usuario
{
  id: "nuevo-uid",
  email: "nuevo@test.com",
  sponsorId: "sponsora-uid",  // ← Automático del link
  rank: "Affiliate",
  status: "active",
  platforms: ["ifedem"],
  createdAt: "2026-01-24T18:00:00Z"
}

// 5. Se agrega a la red de Sponsor A
SponsorA.directReferrals += 1
```

### Caso de Prueba 2: Sistema de Búsqueda de Productos

```javascript
// Usuario busca "curso"
Productos encontrados:
1. Curso Digital de Marketing ($99.99)
2. Masterclass de Ventas ($199.99)

// Usuario filtra por precio < $150
Productos mostrados:
1. Curso Digital de Marketing ($99.99)

// Usuario ordena por BV (mayor a menor)
1. Kit de Inicio (150 BV)
2. Curso Digital (50 BV)
3. Membresía Premium (30 BV)
```

### Caso de Prueba 3: Carrito de Compras

```javascript
// Usuario agrega productos
cart.items = [
  {
    productId: "kit-001",
    quantity: 1,
    price: 299.99,
    bv: 150,
    cv: 250
  },
  {
    productId: "curso-001",
    quantity: 2,
    price: 99.99,
    bv: 50,
    cv: 80
  }
]

// Cálculo de totales
cart.subtotal = 499.97  // 299.99 + (99.99 × 2)
cart.shipping = 0.00
cart.total = 499.97
cart.totalBV = 250      // 150 + (50 × 2)
cart.totalCV = 410      // 250 + (80 × 2)

// Comisiones que se generarán
Sponsor Directo: 410 CV × 12% = $49.20
Nivel 2: 410 CV × 5% = $20.50
Total comisiones: $69.70
```

---

## 📝 Notas Finales

### Diferencias Entre Plataformas

**IFEDEM:**
- Comisión directa: 12%
- Niveles: 7 (8%, 5%, 3%, 2%, 2%, 1%, 1%)
- Sin Fast Start Bonus
- 4 rangos (Affiliate → Executive)

**iAcelera:**
- Comisión directa: 10%
- Niveles: 5 (5%, 3%, 2%, 1%, 1%)
- Con Fast Start Bonus: 5% extra (primeros 30 días)
- Con Binary Match Bonus: 8%
- 8 rangos (Bronze → Ambassador)

### Valores Importantes

- **BV (Business Volume):** Usado para calcular rangos
- **CV (Commissionable Value):** Usado para calcular comisiones
- **Puntos:** Sistema de recompensas adicional
- **Mínimo retiro:** $50.00
- **Estados de comisión:** PENDING → APPROVED → PAID
- **Estados de orden:** pending → processing → completed → shipped

### Tips para Maximizar Ganancias

1. **Aprovecha Fast Start (iAcelera):** Los primeros 30 días ganas 50% más
2. **Construye profundidad:** Comisiones hasta 7 niveles
3. **Enfócate en BV:** Productos con alto BV = progreso de rango más rápido
4. **Combina productos:** Carritos grandes = comisiones mayores
5. **Ayuda a tu equipo:** Sus ventas = tus comisiones de nivel

---

**¿Preguntas?** Revisa `COMMISSION_SYSTEM_GUIDE.md` para detalles técnicos.
