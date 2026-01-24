# 🧪 Scripts de Prueba - Sistema MLM

Scripts que puedes copiar y pegar en la consola del navegador (F12) para probar funcionalidades.

---

## 📋 Tabla de Contenidos

1. [Verificar Usuario Actual](#verificar-usuario-actual)
2. [Ver Comisiones del Usuario](#ver-comisiones-del-usuario)
3. [Calcular Comisiones Manualmente](#calcular-comisiones-manualmente)
4. [Ver Red de Referidos](#ver-red-de-referidos)
5. [Simular Compra](#simular-compra)
6. [Verificar Wallet](#verificar-wallet)
7. [Ver Todas las Órdenes](#ver-todas-las-órdenes)

---

## Verificar Usuario Actual

Muestra información del usuario logueado.

```javascript
// Ejecuta en consola del navegador (F12)
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'

const auth = getAuth()
const user = auth.currentUser

if (user) {
  console.log('🔐 Usuario Autenticado:')
  console.log('UID:', user.uid)
  console.log('Email:', user.email)
  console.log('Email Verificado:', user.emailVerified)

  // Obtener datos de Firestore
  const userDoc = await getDoc(doc(db, 'users', user.uid))
  if (userDoc.exists()) {
    const userData = userDoc.data()
    console.log('\n👤 Datos del Usuario:')
    console.log('Nombre:', `${userData.firstName} ${userData.lastName}`)
    console.log('Rol:', userData.role)
    console.log('Rango:', userData.rank)
    console.log('Sponsor ID:', userData.sponsorId || 'Sin sponsor')
    console.log('Plataformas:', userData.platforms)
    console.log('Estado:', userData.status)
  }
} else {
  console.log('❌ No hay usuario logueado')
}
```

**Salida Esperada:**
```
🔐 Usuario Autenticado:
UID: abc123def456
Email: sponsora@test.com
Email Verificado: true

👤 Datos del Usuario:
Nombre: Ana García Rodríguez
Rol: affiliate
Rango: Manager
Sponsor ID: admin-uid-123
Plataformas: ['ifedem']
Estado: active
```

---

## Ver Comisiones del Usuario

Lista todas las comisiones del usuario actual.

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/config/firebase'

const auth = getAuth()
const userId = auth.currentUser?.uid

if (!userId) {
  console.log('❌ No estás logueado')
} else {
  console.log('💰 Buscando comisiones...\n')

  const commissionsRef = collection(db, 'commissions')
  const q = query(commissionsRef, where('userId', '==', userId))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    console.log('No tienes comisiones aún')
  } else {
    console.log(`Encontradas ${snapshot.size} comisiones:\n`)

    let totalPending = 0
    let totalApproved = 0
    let totalPaid = 0

    snapshot.forEach((doc, index) => {
      const comm = doc.data()
      console.log(`\n📊 Comisión #${index + 1}:`)
      console.log('Monto:', `$${comm.amount.toFixed(2)}`)
      console.log('Tipo:', comm.type)
      console.log('Estado:', comm.status)
      console.log('Nivel:', comm.level || 1)
      console.log('Orden:', comm.orderId)
      console.log('Fecha:', new Date(comm.createdAt.seconds * 1000).toLocaleDateString())

      if (comm.status === 'PENDING') totalPending += comm.amount
      if (comm.status === 'APPROVED') totalApproved += comm.amount
      if (comm.status === 'PAID') totalPaid += comm.amount
    })

    console.log('\n\n💵 RESUMEN:')
    console.log('Pendiente:', `$${totalPending.toFixed(2)}`)
    console.log('Aprobado:', `$${totalApproved.toFixed(2)}`)
    console.log('Pagado:', `$${totalPaid.toFixed(2)}`)
    console.log('TOTAL:', `$${(totalPending + totalApproved + totalPaid).toFixed(2)}`)
  }
}
```

**Salida Esperada:**
```
💰 Buscando comisiones...

Encontradas 3 comisiones:

📊 Comisión #1:
Monto: $30.00
Tipo: DIRECT_SALE
Estado: PENDING
Nivel: 1
Orden: order-123
Fecha: 24/1/2026

📊 Comisión #2:
Monto: $9.60
Tipo: DIRECT_SALE
Estado: PENDING
Nivel: 1
Orden: order-124
Fecha: 24/1/2026

📊 Comisión #3:
Monto: $4.80
Tipo: DIRECT_SALE
Estado: APPROVED
Nivel: 1
Orden: order-125
Fecha: 24/1/2026

💵 RESUMEN:
Pendiente: $39.60
Aprobado: $4.80
Pagado: $0.00
TOTAL: $44.40
```

---

## Calcular Comisiones Manualmente

Simula el cálculo de comisiones para una venta.

```javascript
// Configuración de comisiones IFEDEM
const IFEDEM_CONFIG = {
  directSponsor: 0.12,  // 12%
  levelCommissions: {
    1: 0.08,  // 8%
    2: 0.05,  // 5%
    3: 0.03,  // 3%
    4: 0.02,  // 2%
    5: 0.02,  // 2%
    6: 0.01,  // 1%
    7: 0.01   // 1%
  }
}

// Datos de prueba
const productCV = 250  // Kit de Inicio
const productBV = 150

console.log('🧮 Calculadora de Comisiones IFEDEM\n')
console.log(`Producto: Kit de Inicio Emprendedor`)
console.log(`CV: ${productCV}`)
console.log(`BV: ${productBV}\n`)

// Comisión directa
const directComm = productCV * IFEDEM_CONFIG.directSponsor
console.log(`💰 Comisión Directa (Nivel 0):`)
console.log(`   ${productCV} CV × 12% = $${directComm.toFixed(2)}\n`)

// Comisiones de niveles
console.log(`📊 Comisiones Unilevel:\n`)
let totalUnilevel = 0

for (let level = 1; level <= 7; level++) {
  const percentage = IFEDEM_CONFIG.levelCommissions[level]
  const commission = productCV * percentage
  totalUnilevel += commission

  console.log(`   Nivel ${level}: ${productCV} CV × ${(percentage * 100).toFixed(0)}% = $${commission.toFixed(2)}`)
}

console.log(`\n💵 TOTALES:`)
console.log(`   Comisión Directa: $${directComm.toFixed(2)}`)
console.log(`   Total Unilevel: $${totalUnilevel.toFixed(2)}`)
console.log(`   GRAN TOTAL: $${(directComm + totalUnilevel).toFixed(2)}`)
console.log(`\n📊 Porcentaje total distribuido: ${((directComm + totalUnilevel) / productCV * 100).toFixed(1)}%`)
```

**Salida Esperada:**
```
🧮 Calculadora de Comisiones IFEDEM

Producto: Kit de Inicio Emprendedor
CV: 250
BV: 150

💰 Comisión Directa (Nivel 0):
   250 CV × 12% = $30.00

📊 Comisiones Unilevel:

   Nivel 1: 250 CV × 8% = $20.00
   Nivel 2: 250 CV × 5% = $12.50
   Nivel 3: 250 CV × 3% = $7.50
   Nivel 4: 250 CV × 2% = $5.00
   Nivel 5: 250 CV × 2% = $5.00
   Nivel 6: 250 CV × 1% = $2.50
   Nivel 7: 250 CV × 1% = $2.50

💵 TOTALES:
   Comisión Directa: $30.00
   Total Unilevel: $55.00
   GRAN TOTAL: $85.00

📊 Porcentaje total distribuido: 34.0%
```

---

## Ver Red de Referidos

Muestra todos los referidos directos del usuario.

```javascript
import { collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/config/firebase'

const auth = getAuth()
const userId = auth.currentUser?.uid

if (!userId) {
  console.log('❌ No estás logueado')
} else {
  console.log('👥 Buscando tu red...\n')

  // Buscar referidos directos
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('sponsorId', '==', userId))
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    console.log('No tienes referidos directos aún')
  } else {
    console.log(`📊 Tienes ${snapshot.size} referidos directos:\n`)

    let totalTeamBV = 0

    snapshot.forEach((doc, index) => {
      const user = doc.data()
      console.log(`\n${index + 1}. ${user.firstName} ${user.lastName}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Rango: ${user.rank}`)
      console.log(`   Estado: ${user.status}`)
      console.log(`   Registrado: ${new Date(user.createdAt.seconds * 1000).toLocaleDateString()}`)

      // Nota: TeamBV requeriría cálculo adicional
    })
  }
}
```

**Salida Esperada:**
```
👥 Buscando tu red...

📊 Tienes 2 referidos directos:

1. Juan Pérez
   Email: afiliado1@test.com
   Rango: Affiliate
   Estado: active
   Registrado: 20/1/2026

2. María López
   Email: afiliado2@test.com
   Rango: Affiliate
   Estado: active
   Registrado: 21/1/2026
```

---

## Simular Compra

Calcula qué pasaría si un usuario compra un producto.

```javascript
// Datos del producto
const product = {
  name: 'Kit de Inicio Emprendedor',
  price: 299.99,
  cv: 250,
  bv: 150,
  sku: 'KIT-001'
}

// Datos del comprador
const buyer = {
  name: 'Juan Pérez',
  email: 'afiliado1@test.com',
  sponsorId: 'sponsora-uid'
}

console.log('🛍️ SIMULACIÓN DE COMPRA\n')
console.log('Comprador:', buyer.name)
console.log('Producto:', product.name)
console.log('Precio:', `$${product.price}`)
console.log('CV:', product.cv)
console.log('BV:', product.bv)
console.log('\n' + '='.repeat(50) + '\n')

// Calcular comisiones
const directCommission = product.cv * 0.12  // 12% directo
const level2Commission = product.cv * 0.05   // 5% nivel 2

console.log('💰 COMISIONES QUE SE GENERARÁN:\n')

console.log('1️⃣ Sponsor Directo (Nivel 1):')
console.log(`   ${product.cv} CV × 12% = $${directCommission.toFixed(2)}`)
console.log(`   Estado: PENDING`)
console.log(`   Tipo: DIRECT_SALE\n`)

console.log('2️⃣ Nivel 2 (Sponsor del Sponsor):')
console.log(`   ${product.cv} CV × 5% = $${level2Commission.toFixed(2)}`)
console.log(`   Estado: PENDING`)
console.log(`   Tipo: UNILEVEL\n`)

console.log('📊 IMPACTO EN WALLETS:\n')
console.log(`Sponsor Directo:`)
console.log(`   Pendiente: +$${directCommission.toFixed(2)}`)
console.log(`   Total Ganado: +$${directCommission.toFixed(2)}\n`)

console.log(`Nivel 2:`)
console.log(`   Pendiente: +$${level2Commission.toFixed(2)}`)
console.log(`   Total Ganado: +$${level2Commission.toFixed(2)}\n`)

console.log('📈 IMPACTO EN STATS:\n')
console.log(`Sponsor Directo:`)
console.log(`   Team Sales: +$${product.price}`)
console.log(`   Team BV: +${product.bv}`)
console.log(`   Team CV: +${product.cv}`)
console.log(`   Personal Orders: sin cambio (es venta de su equipo)\n`)

console.log(`Comprador (${buyer.name}):`)
console.log(`   Personal Sales: +$${product.price}`)
console.log(`   Personal BV: +${product.bv}`)
console.log(`   Personal CV: +${product.cv}`)
console.log(`   Personal Orders: +1`)
```

**Salida Esperada:**
```
🛍️ SIMULACIÓN DE COMPRA

Comprador: Juan Pérez
Producto: Kit de Inicio Emprendedor
Precio: $299.99
CV: 250
BV: 150

==================================================

💰 COMISIONES QUE SE GENERARÁN:

1️⃣ Sponsor Directo (Nivel 1):
   250 CV × 12% = $30.00
   Estado: PENDING
   Tipo: DIRECT_SALE

2️⃣ Nivel 2 (Sponsor del Sponsor):
   250 CV × 5% = $12.50
   Estado: PENDING
   Tipo: UNILEVEL

📊 IMPACTO EN WALLETS:

Sponsor Directo:
   Pendiente: +$30.00
   Total Ganado: +$30.00

Nivel 2:
   Pendiente: +$12.50
   Total Ganado: +$12.50

📈 IMPACTO EN STATS:

Sponsor Directo:
   Team Sales: +$299.99
   Team BV: +150
   Team CV: +250
   Personal Orders: sin cambio (es venta de su equipo)

Comprador (Juan Pérez):
   Personal Sales: +$299.99
   Personal BV: +150
   Personal CV: +250
   Personal Orders: +1
```

---

## Verificar Wallet

Muestra el estado del wallet del usuario.

```javascript
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/config/firebase'

const auth = getAuth()
const userId = auth.currentUser?.uid

if (!userId) {
  console.log('❌ No estás logueado')
} else {
  console.log('💼 Verificando tu wallet...\n')

  const walletDoc = await getDoc(doc(db, 'wallets', userId))

  if (!walletDoc.exists()) {
    console.log('❌ No tienes wallet creado aún')
  } else {
    const wallet = walletDoc.data()

    console.log('💰 ESTADO DE TU WALLET:\n')
    console.log('Pendiente:', `$${wallet.pending?.toFixed(2) || '0.00'}`)
    console.log('  └─ Comisiones esperando aprobación del admin\n')

    console.log('Disponible:', `$${wallet.available?.toFixed(2) || '0.00'}`)
    console.log('  └─ Listo para retiro\n')

    console.log('Total Ganado:', `$${wallet.totalEarned?.toFixed(2) || '0.00'}`)
    console.log('  └─ Todo el tiempo\n')

    console.log('Total Retirado:', `$${wallet.totalWithdrawn?.toFixed(2) || '0.00'}`)
    console.log('  └─ Ya cobrado\n')

    const minWithdrawal = 50.00
    const canWithdraw = wallet.available >= minWithdrawal

    console.log('─'.repeat(40))
    console.log('\n💡 INFO:\n')
    console.log(`Mínimo para retiro: $${minWithdrawal.toFixed(2)}`)

    if (canWithdraw) {
      console.log('✅ Puedes solicitar retiro')
      console.log(`   Monto máximo: $${wallet.available.toFixed(2)}`)
    } else {
      const needed = minWithdrawal - wallet.available
      console.log('❌ No puedes retirar aún')
      console.log(`   Te faltan: $${needed.toFixed(2)}`)
    }
  }
}
```

**Salida Esperada:**
```
💼 Verificando tu wallet...

💰 ESTADO DE TU WALLET:

Pendiente: $450.00
  └─ Comisiones esperando aprobación del admin

Disponible: $1234.60
  └─ Listo para retiro

Total Ganado: $5234.60
  └─ Todo el tiempo

Total Retirado: $3550.00
  └─ Ya cobrado

────────────────────────────────────────

💡 INFO:

Mínimo para retiro: $50.00
✅ Puedes solicitar retiro
   Monto máximo: $1234.60
```

---

## Ver Todas las Órdenes

Lista todas las órdenes del usuario (solo admin puede ver todas).

```javascript
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/config/firebase'

const auth = getAuth()
const userId = auth.currentUser?.uid

if (!userId) {
  console.log('❌ No estás logueado')
} else {
  console.log('📦 Buscando tus órdenes...\n')

  const ordersRef = collection(db, 'orders')
  const q = query(
    ordersRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)

  if (snapshot.empty) {
    console.log('No tienes órdenes aún')
  } else {
    console.log(`Encontradas ${snapshot.size} órdenes:\n`)

    let totalSpent = 0

    snapshot.forEach((doc, index) => {
      const order = doc.data()
      const date = new Date(order.createdAt.seconds * 1000)

      console.log(`\n📦 Orden #${index + 1}:`)
      console.log('Número:', order.orderNumber)
      console.log('Total:', `$${order.total.toFixed(2)}`)
      console.log('Estado:', order.status)
      console.log('Método de pago:', order.paymentMethod)
      console.log('Fecha:', date.toLocaleString())
      console.log('Items:', order.items.length)

      order.items.forEach((item, i) => {
        console.log(`  ${i + 1}. ${item.name} (${item.quantity}x) - $${item.price}`)
      })

      totalSpent += order.total
    })

    console.log('\n\n💵 TOTAL GASTADO: $' + totalSpent.toFixed(2))
  }
}
```

**Salida Esperada:**
```
📦 Buscando tus órdenes...

Encontradas 2 órdenes:

📦 Orden #1:
Número: ORD-1737740200000
Total: $299.99
Estado: completed
Método de pago: bank_transfer
Fecha: 24/1/2026 14:20:00
Items: 1
  1. Kit de Inicio Emprendedor (1x) - $299.99

📦 Orden #2:
Número: ORD-1737740100000
Total: $99.99
Estado: pending
Método de pago: paypal
Fecha: 24/1/2026 12:15:30
Items: 1
  1. Curso Digital de Marketing (1x) - $99.99

💵 TOTAL GASTADO: $399.98
```

---

## 🎯 Scripts de Prueba Automatizados

### Test Completo del Sistema

```javascript
// 🧪 TEST COMPLETO - Ejecuta todos los checks
async function runFullSystemTest() {
  console.log('🧪 INICIANDO TEST COMPLETO DEL SISTEMA\n')
  console.log('='.repeat(60) + '\n')

  // 1. Verificar Firebase
  console.log('1️⃣ Verificando conexión a Firebase...')
  try {
    const auth = getAuth()
    if (auth.currentUser) {
      console.log('   ✅ Firebase Auth conectado')
      console.log('   Usuario:', auth.currentUser.email)
    } else {
      console.log('   ❌ No hay usuario logueado')
      return
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message)
    return
  }

  // 2. Verificar Firestore
  console.log('\n2️⃣ Verificando Firestore...')
  try {
    const testDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    if (testDoc.exists()) {
      console.log('   ✅ Firestore accesible')
    } else {
      console.log('   ❌ Usuario no encontrado en Firestore')
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message)
  }

  // 3. Verificar Comisiones
  console.log('\n3️⃣ Verificando sistema de comisiones...')
  try {
    const commissionsRef = collection(db, 'commissions')
    const q = query(commissionsRef, where('userId', '==', auth.currentUser.uid))
    const snapshot = await getDocs(q)
    console.log(`   ✅ ${snapshot.size} comisiones encontradas`)
  } catch (error) {
    console.log('   ❌ Error:', error.message)
  }

  // 4. Verificar Wallet
  console.log('\n4️⃣ Verificando wallet...')
  try {
    const walletDoc = await getDoc(doc(db, 'wallets', auth.currentUser.uid))
    if (walletDoc.exists()) {
      const wallet = walletDoc.data()
      console.log('   ✅ Wallet encontrado')
      console.log('   Pendiente:', `$${wallet.pending?.toFixed(2) || '0.00'}`)
      console.log('   Disponible:', `$${wallet.available?.toFixed(2) || '0.00'}`)
    } else {
      console.log('   ⚠️  Wallet no creado (normal para usuarios nuevos)')
    }
  } catch (error) {
    console.log('   ❌ Error:', error.message)
  }

  // 5. Verificar Productos
  console.log('\n5️⃣ Verificando catálogo de productos...')
  try {
    const productsRef = collection(db, 'products')
    const snapshot = await getDocs(productsRef)
    console.log(`   ✅ ${snapshot.size} productos en catálogo`)
  } catch (error) {
    console.log('   ❌ Error:', error.message)
  }

  // 6. Verificar Órdenes
  console.log('\n6️⃣ Verificando órdenes...')
  try {
    const ordersRef = collection(db, 'orders')
    const q = query(ordersRef, where('userId', '==', auth.currentUser.uid))
    const snapshot = await getDocs(q)
    console.log(`   ✅ ${snapshot.size} órdenes encontradas`)
  } catch (error) {
    console.log('   ❌ Error:', error.message)
  }

  console.log('\n' + '='.repeat(60))
  console.log('\n✅ TEST COMPLETO FINALIZADO\n')
}

// Ejecutar test
runFullSystemTest()
```

**Salida Esperada:**
```
🧪 INICIANDO TEST COMPLETO DEL SISTEMA

============================================================

1️⃣ Verificando conexión a Firebase...
   ✅ Firebase Auth conectado
   Usuario: sponsora@test.com

2️⃣ Verificando Firestore...
   ✅ Firestore accesible

3️⃣ Verificando sistema de comisiones...
   ✅ 12 comisiones encontradas

4️⃣ Verificando wallet...
   ✅ Wallet encontrado
   Pendiente: $450.00
   Disponible: $1234.60

5️⃣ Verificando catálogo de productos...
   ✅ 3 productos en catálogo

6️⃣ Verificando órdenes...
   ✅ 5 órdenes encontradas

============================================================

✅ TEST COMPLETO FINALIZADO
```

---

## 📝 Notas de Uso

1. **Abrir Consola del Navegador:**
   - Chrome/Edge: F12 o Ctrl+Shift+I
   - Firefox: F12 o Ctrl+Shift+K
   - Safari: Cmd+Option+I

2. **Copiar y Pegar Scripts:**
   - Copia el script completo
   - Pega en la consola
   - Presiona Enter

3. **Imports:**
   - Los imports funcionan si estás en la aplicación Vue
   - Si hay error de imports, asegúrate de estar en una página del sistema

4. **Permisos:**
   - Algunos scripts requieren permisos de admin
   - Otros solo funcionan con usuario logueado

5. **Troubleshooting:**
   - Si ves "undefined", el usuario no está logueado
   - Si ves error de permisos, verifica las reglas de Firestore
   - Recarga la página (F5) si los imports fallan

---

**¿Necesitas más ejemplos?** Crea tu propio script basado en estos ejemplos.
