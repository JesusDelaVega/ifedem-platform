# 🧪 Generador de Datos de Prueba

Este documento te guía para crear datos de prueba completos y poder testear todo el sistema MLM.

---

## 📋 Paso a Paso

### PASO 1: Aplicar Reglas de Firestore ⚠️ CRÍTICO

**SIN ESTO NADA FUNCIONARÁ**

1. Ve a https://console.firebase.google.com
2. Proyecto: **ace-ife**
3. Firestore Database → pestaña **Reglas**
4. Copia TODO el contenido del archivo `firestore.rules`
5. Pégalo en el editor
6. Click en **Publicar**

---

### PASO 2: Crear Estructura de Red

Vamos a crear una red de ejemplo con 3 niveles:

```
                  ADMIN
                    |
        ┌───────────┴───────────┐
        │                       │
    SPONSOR A              SPONSOR B
        |                       |
    ┌───┴───┐               ┌───┴───┐
    |       |               |       |
AFIL1   AFIL2           AFIL3   AFIL4
```

---

### PASO 3: Crear Usuarios en Firestore

Ve a Firebase Console → Firestore Database → Colección `users`

#### Usuario 1: ADMIN (Tú)

Click en **+ Agregar documento**

**ID del documento**: `admin001` (o déjalo auto-generar y copia el ID)

```json
{
  "email": "admin@test.com",
  "firstName": "Admin",
  "lastName": "Master",
  "phone": "+52 123 456 7890",
  "role": "admin",
  "status": "active",
  "platforms": ["ifedem"],
  "primaryPlatform": "ifedem",
  "sponsorId": null,
  "referralCode": "ADMMAS001",
  "isVerified": true,
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z"
}
```

**IMPORTANTE**: Copia el ID que se generó para este usuario.

---

#### Usuario 2: SPONSOR A

```json
{
  "email": "sponsora@test.com",
  "firstName": "Sponsor",
  "lastName": "Alpha",
  "phone": "+52 123 456 7891",
  "role": "affiliate",
  "status": "active",
  "platforms": ["ifedem"],
  "primaryPlatform": "ifedem",
  "sponsorId": "admin001",
  "referralCode": "SPOALP002",
  "currentRank": "manager",
  "isVerified": true,
  "createdAt": "2026-01-05T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z"
}
```

**IMPORTANTE**: Reemplaza `"admin001"` con el ID real del Admin que creaste.

---

#### Usuario 3: SPONSOR B

```json
{
  "email": "sponsorb@test.com",
  "firstName": "Sponsor",
  "lastName": "Beta",
  "phone": "+52 123 456 7892",
  "role": "affiliate",
  "status": "active",
  "platforms": ["ifedem"],
  "primaryPlatform": "ifedem",
  "sponsorId": "admin001",
  "referralCode": "SPOBET003",
  "currentRank": "affiliate",
  "isVerified": true,
  "createdAt": "2026-01-10T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z"
}
```

---

#### Usuario 4: AFIL1 (Afiliado de Sponsor A)

```json
{
  "email": "afiliado1@test.com",
  "firstName": "Juan",
  "lastName": "Pérez",
  "phone": "+52 123 456 7893",
  "role": "affiliate",
  "status": "active",
  "platforms": ["ifedem"],
  "primaryPlatform": "ifedem",
  "sponsorId": "[ID de Sponsor A]",
  "referralCode": "JUAPER004",
  "currentRank": "affiliate",
  "isVerified": true,
  "createdAt": "2026-01-15T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z"
}
```

---

#### Usuario 5: AFIL2 (Afiliado de Sponsor A)

```json
{
  "email": "afiliado2@test.com",
  "firstName": "María",
  "lastName": "González",
  "phone": "+52 123 456 7894",
  "role": "affiliate",
  "status": "active",
  "platforms": ["ifedem"],
  "primaryPlatform": "ifedem",
  "sponsorId": "[ID de Sponsor A]",
  "referralCode": "MARGON005",
  "currentRank": "affiliate",
  "isVerified": true,
  "createdAt": "2026-01-18T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z"
}
```

---

### PASO 4: Crear Productos

Colección `products` → **+ Agregar documento**

#### Producto 1: Curso Básico

```json
{
  "sku": "CURSO-001",
  "name": "Curso de Emprendimiento Digital",
  "description": "Aprende a crear tu negocio online desde cero",
  "shortDescription": "Curso completo de emprendimiento",
  "type": "course",
  "status": "active",
  "platform": "ifedem",

  "price": 99.99,
  "currency": "USD",
  "compareAtPrice": 149.99,

  "bv": 50,
  "cv": 80,
  "points": 100,

  "trackInventory": false,
  "inventoryQuantity": 9999,
  "allowBackorder": true,

  "isRecurring": false,

  "images": ["https://via.placeholder.com/400x300/667eea/ffffff?text=Curso+Digital"],
  "thumbnail": "https://via.placeholder.com/200x150/667eea/ffffff?text=Curso",

  "categories": ["cursos", "digital"],
  "tags": ["emprendimiento", "digital", "online"],

  "requiresShipping": false,
  "requiresQualification": false,

  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z",
  "createdBy": "admin001"
}
```

---

#### Producto 2: Kit de Inicio

```json
{
  "sku": "KIT-001",
  "name": "Kit de Inicio Emprendedor",
  "description": "Kit completo con todo lo necesario para iniciar en IFEDEM",
  "shortDescription": "Kit de inicio completo",
  "type": "starter_kit",
  "status": "active",
  "platform": "ifedem",

  "price": 299.99,
  "currency": "USD",
  "compareAtPrice": 399.99,

  "bv": 150,
  "cv": 250,
  "points": 300,

  "trackInventory": true,
  "inventoryQuantity": 50,
  "allowBackorder": false,

  "isRecurring": false,

  "images": ["https://via.placeholder.com/400x300/10b981/ffffff?text=Kit+Inicio"],
  "thumbnail": "https://via.placeholder.com/200x150/10b981/ffffff?text=Kit",

  "categories": ["kits", "starter"],
  "tags": ["inicio", "emprendimiento", "completo"],

  "requiresShipping": true,
  "weight": 2.5,
  "dimensions": {
    "length": 30,
    "width": 25,
    "height": 15,
    "unit": "cm"
  },

  "requiresQualification": false,

  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z",
  "createdBy": "admin001"
}
```

---

#### Producto 3: Membresía Mensual

```json
{
  "sku": "MEMB-001",
  "name": "Membresía Premium Mensual",
  "description": "Acceso completo a todos los cursos y herramientas",
  "shortDescription": "Membresía mensual premium",
  "type": "membership",
  "status": "active",
  "platform": "both",

  "price": 49.99,
  "currency": "USD",
  "compareAtPrice": 79.99,

  "bv": 30,
  "cv": 40,
  "points": 50,

  "trackInventory": false,
  "inventoryQuantity": 9999,
  "allowBackorder": true,

  "isRecurring": true,
  "recurringInterval": "monthly",
  "recurringIntervalCount": 1,

  "images": ["https://via.placeholder.com/400x300/f59e0b/ffffff?text=Membres%C3%ADa"],
  "thumbnail": "https://via.placeholder.com/200x150/f59e0b/ffffff?text=Premium",

  "categories": ["membresias"],
  "tags": ["premium", "mensual", "acceso-completo"],

  "requiresShipping": false,
  "requiresQualification": false,

  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-22T00:00:00.000Z",
  "createdBy": "admin001"
}
```

---

### PASO 5: Crear Órdenes de Ejemplo

Colección `orders` → **+ Agregar documento**

#### Orden 1: Compra de AFIL1

```json
{
  "orderNumber": "ORD-20260120-001",
  "userId": "[ID de AFIL1]",
  "customerId": "[ID de AFIL1]",
  "platform": "ifedem",

  "items": [
    {
      "productId": "[ID del Kit de Inicio]",
      "sku": "KIT-001",
      "name": "Kit de Inicio Emprendedor",
      "quantity": 1,
      "price": 299.99,
      "bv": 150,
      "cv": 250,
      "points": 300,
      "total": 299.99
    }
  ],

  "subtotal": 299.99,
  "tax": 47.99,
  "shipping": 0,
  "discount": 0,
  "total": 347.98,
  "currency": "USD",

  "totalBV": 150,
  "totalCV": 250,
  "totalPoints": 300,

  "paymentMethod": "bank_transfer",
  "paymentStatus": "paid",

  "shippingAddress": {
    "firstName": "Juan",
    "lastName": "Pérez",
    "street": "Av. Revolución 123",
    "city": "Guadalajara",
    "state": "Jalisco",
    "postalCode": "44100",
    "country": "México",
    "phone": "+52 123 456 7893"
  },

  "billingAddress": {
    "firstName": "Juan",
    "lastName": "Pérez",
    "street": "Av. Revolución 123",
    "city": "Guadalajara",
    "state": "Jalisco",
    "postalCode": "44100",
    "country": "México",
    "phone": "+52 123 456 7893"
  },

  "status": "paid",
  "statusHistory": [
    {
      "status": "pending",
      "timestamp": "2026-01-20T10:00:00.000Z",
      "note": "Orden creada"
    },
    {
      "status": "paid",
      "timestamp": "2026-01-20T11:00:00.000Z",
      "note": "Pago confirmado"
    }
  ],

  "createdAt": "2026-01-20T10:00:00.000Z",
  "updatedAt": "2026-01-20T11:00:00.000Z"
}
```

**NOTA**: Al crear esta orden, el sistema debería generar comisiones automáticamente. Si no, las creamos manualmente en el siguiente paso.

---

### PASO 6: Crear Comisiones Manualmente (si no se generaron auto)

Colección `commissions` → **+ Agregar documento**

#### Comisión 1: Directa para Sponsor A

```json
{
  "userId": "[ID de Sponsor A]",

  "orderId": "[ID de la Orden 1]",
  "orderNumber": "ORD-20260120-001",
  "orderTotal": 347.98,
  "orderBV": 150,
  "orderCV": 250,

  "generatedBy": "[ID de AFIL1]",
  "generatedByName": "Juan Pérez",

  "type": "DIRECT_SALE",
  "amount": 30.00,
  "percentage": 0.12,
  "calculatedFrom": 250,

  "level": 1,

  "status": "PENDING",
  "platform": "ifedem",

  "description": "Comisión directa por venta de Juan Pérez",

  "userRankAtTime": "manager",
  "generatorRankAtTime": "affiliate",

  "createdAt": "2026-01-20T11:00:00.000Z",
  "calculatedAt": "2026-01-20T11:00:00.000Z",
  "periodStart": "2026-01-01T00:00:00.000Z",
  "periodEnd": "2026-01-31T23:59:59.000Z"
}
```

---

#### Comisión 2: Nivel 2 para Admin

```json
{
  "userId": "admin001",

  "orderId": "[ID de la Orden 1]",
  "orderNumber": "ORD-20260120-001",
  "orderTotal": 347.98,
  "orderBV": 150,
  "orderCV": 250,

  "generatedBy": "[ID de AFIL1]",
  "generatedByName": "Juan Pérez",

  "type": "UNILEVEL",
  "amount": 12.50,
  "percentage": 0.05,
  "calculatedFrom": 250,

  "level": 2,

  "status": "PENDING",
  "platform": "ifedem",

  "description": "Comisión nivel 2 por venta de Juan Pérez",

  "userRankAtTime": "admin",
  "generatorRankAtTime": "affiliate",

  "createdAt": "2026-01-20T11:00:00.000Z",
  "calculatedAt": "2026-01-20T11:00:00.000Z",
  "periodStart": "2026-01-01T00:00:00.000Z",
  "periodEnd": "2026-01-31T23:59:59.000Z"
}
```

---

### PASO 7: Crear Wallets

Colección `wallets` → **+ Agregar documento**

#### Wallet de Sponsor A

**ID del documento**: `[ID de Sponsor A]_ifedem`

```json
{
  "userId": "[ID de Sponsor A]",
  "platform": "ifedem",

  "availableBalance": 0,
  "pendingBalance": 30.00,
  "totalEarnings": 30.00,
  "totalWithdrawals": 0,

  "currency": "USD",
  "lastUpdated": "2026-01-20T11:00:00.000Z"
}
```

---

#### Wallet de Admin

**ID del documento**: `admin001_ifedem`

```json
{
  "userId": "admin001",
  "platform": "ifedem",

  "availableBalance": 0,
  "pendingBalance": 12.50,
  "totalEarnings": 12.50,
  "totalWithdrawals": 0,

  "currency": "USD",
  "lastUpdated": "2026-01-20T11:00:00.000Z"
}
```

---

### PASO 8: Crear Usuarios en Firebase Authentication

1. Ve a Firebase Console → Authentication
2. Click en **Agregar usuario**
3. Crea usuarios para:
   - `admin@test.com` / `password123`
   - `sponsora@test.com` / `password123`
   - `afiliado1@test.com` / `password123`
   - etc.

---

### PASO 9: Probar el Sistema 🎉

#### Como Admin:

1. Login: `admin@test.com` / `password123`
2. Ve al dashboard → Deberías ver:
   - Comisión de $12.50 pendiente
   - 2 referidos directos (Sponsor A y B)
   - Estadísticas de red

3. Ve a `/commissions`:
   - Deberías ver la comisión de nivel 2

4. Ve a `/admin`:
   - Ver todos los usuarios
   - Ver todas las órdenes
   - Gestionar productos

#### Como Sponsor A:

1. Login: `sponsora@test.com` / `password123`
2. Dashboard:
   - Comisión de $30.00 pendiente
   - 2 referidos (AFIL1 y AFIL2)
   - Ventas de equipo de $347.98

3. `/commissions`:
   - Ver comisión directa de $30

#### Como AFIL1:

1. Login: `afiliado1@test.com` / `password123`
2. Dashboard:
   - Ver su propia compra
   - Ver su link de referido
   - 0 referidos

---

## 🚀 Crear Más Datos

Para simular más actividad:

### Más Órdenes

Crea órdenes para AFIL2, AFIL3, etc. usando los mismos campos pero cambiando:
- `orderNumber`
- `userId`
- Fechas
- Productos

### Más Productos

Crea productos variados:
- Cursos ($49-$199)
- Kits ($299-$999)
- Membresías ($29-$99/mes)
- Productos físicos ($19-$499)

---

## ✅ Checklist de Verificación

Después de crear los datos, verifica:

- [ ] Puedes hacer login con todos los usuarios
- [ ] Dashboard muestra estadísticas correctas
- [ ] `/commissions` muestra comisiones
- [ ] `/products` muestra productos
- [ ] Puedes hacer una compra y genera comisiones
- [ ] `/admin` funciona (solo para admin)
- [ ] Link de referido se copia correctamente
- [ ] Wallets muestran balances

---

## 💡 Tips

1. **Usa Fechas Recientes**: Pon fechas de Enero 2026 para que las comisiones "de este mes" funcionen
2. **Manten Estructura**: Siempre usa el formato de IDs compuestos para wallets (`userId_platform`)
3. **CV vs Precio**: Las comisiones se calculan sobre CV, no sobre precio total
4. **Fast Start**: Solo funciona si el afiliado tiene menos de 30 días de registrado

---

## 🐛 Troubleshooting

**No veo comisiones:**
- Verifica que las órdenes tengan campo `platform`
- Verifica que los usuarios tengan `sponsorId`
- Revisa la consola del navegador (F12)

**Wallets no actualizan:**
- Verifica reglas de Firestore
- Verifica que el ID sea `userId_platform` (con underscore)

**No puedo hacer login:**
- Verifica que el usuario exista en Authentication
- Verifica que el email coincida con Firestore

---

¡Con estos datos tendrás un sistema MLM completo funcionando! 🎉
