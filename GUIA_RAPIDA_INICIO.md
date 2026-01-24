# 🚀 Guía Rápida de Inicio - Sistema MLM

## ⚡ Inicio Rápido (5 minutos)

### PASO 1: Publicar Reglas de Firestore (1 vez) ⚠️

**ESTO ES CRÍTICO - SIN ESTO NADA FUNCIONA**

1. Abre: https://console.firebase.google.com
2. Selecciona proyecto: **ace-ife**
3. Menu lateral → **Firestore Database**
4. Pestaña **Reglas** (arriba)
5. Borra todo y pega el contenido del archivo `firestore.rules`
6. Click **Publicar** (botón azul)

✅ **Listo, solo necesitas hacer esto UNA VEZ**

---

### PASO 2: Generar Datos de Prueba (30 segundos)

1. **Abre el generador automático:**
   ```bash
   # Desde el proyecto ifedem-platform
   open generate-test-data.html

   # O en Windows:
   start generate-test-data.html

   # O simplemente haz doble click en el archivo
   ```

2. **Click en el botón grande:** "🎯 Generar Datos de Prueba"

3. **Espera 30 segundos** - Verás logs en tiempo real:
   ```
   ✅ Admin creado: admin@test.com
   ✅ Sponsor A creado: sponsora@test.com
   ✅ Sponsor B creado: sponsorb@test.com
   ✅ Afiliado 1 creado: afiliado1@test.com
   ✅ Afiliado 2 creado: afiliado2@test.com
   ✅ Producto: Curso Digital creado
   ✅ Producto: Kit de Inicio creado
   ✅ Producto: Membresía Premium creada
   ✨ ¡Datos generados exitosamente!
   ```

4. **Al final verás las credenciales:**
   - Todas usan la misma contraseña: `password123`

✅ **¡Listo! Ya tienes datos de prueba**

---

### PASO 3: Iniciar Servidor Local

```bash
cd ifedem-platform
npm run dev
```

Abre: http://localhost:5176

---

### PASO 4: Probar el Sistema Completo 🎯

#### 🔐 Prueba #1: Login como Admin

1. Ve a: http://localhost:5176/auth
2. Login:
   - Email: `admin@test.com`
   - Password: `password123`

3. **Verás el Dashboard con:**
   - Tu link de referido
   - Badge de rango: Admin
   - 2 referidos directos
   - Stats en 0 (aún no hay ventas)

4. **Explora:**
   - 💰 Click "Comisiones" → Ver historial (vacío aún)
   - 📦 Click "Ver Productos" → Catálogo

---

#### 🛍️ Prueba #2: Hacer una Compra (Genera Comisiones)

1. **Logout** (botón arriba a la derecha)

2. **Login como Afiliado 1:**
   - Email: `afiliado1@test.com`
   - Password: `password123`

3. **Comprar un producto:**
   - Click "Ver Productos" o ve a `/products`
   - Agrega **"Kit de Inicio Emprendedor"** ($299.99) al carrito
   - Click en el carrito flotante (abajo a la derecha)
   - Click "Proceder al Pago"

4. **Completa el checkout:**
   - Llena la dirección (cualquier dato de prueba)
   - Método de pago: Transferencia bancaria
   - Click "Realizar Pedido"

5. **¡BOOM! 💥**
   - Orden creada
   - Sistema calcula comisiones automáticamente
   - Wallets actualizados

---

#### 💰 Prueba #3: Ver las Comisiones Generadas

1. **Logout**

2. **Login como Sponsor A:**
   - Email: `sponsora@test.com`
   - Password: `password123`

3. **Ve al Dashboard - Deberías ver:**
   - 💵 **Ventas de Equipo:** $347.98 (orden de AFIL1)
   - 💰 **Ganancias Totales:** $30.00
   - 📊 **TeamBV:** 150
   - 👥 **2 Referidos**
   - 📈 **Progreso de Rango** hacia Director

4. **Ve a Comisiones** (`/commissions`):
   - Verás comisión de **$30.00**
   - Tipo: Venta Directa
   - Estado: Pendiente
   - Generado por: Juan Pérez

5. **Wallet:**
   - Pendiente: $30.00
   - Disponible: $0.00

---

#### 👑 Prueba #4: Ver Como Admin (Nivel 2)

1. **Logout**

2. **Login como Admin:**
   - Email: `admin@test.com`
   - Password: `password123`

3. **Dashboard:**
   - Ganancias: $12.50 (comisión nivel 2)
   - Ventas de equipo aumentadas
   - Red más grande

4. **Comisiones:**
   - Comisión de $12.50
   - Tipo: Unilevel
   - Nivel: 2
   - Generado por: Juan Pérez

---

## 📊 Estructura de Red Creada

```
                    ADMIN
        (admin@test.com, Manager)
                      |
          ┌───────────┴───────────┐
          │                       │
      SPONSOR A              SPONSOR B
  (sponsora@test.com)    (sponsorb@test.com)
      Manager                Affiliate
          |
      ┌───┴───┐
      │       │
   AFIL1    AFIL2
  (Juan)   (María)
Affiliate  Affiliate
```

**Cuando AFIL1 compra:**
- ✅ Sponsor A recibe: $30.00 (12% directo)
- ✅ Admin recibe: $12.50 (5% nivel 2)

---

## 🎯 Rutas Disponibles

### Para Todos:
- `/auth` - Login/Registro
- `/dashboard` - Dashboard principal
- `/products` - Catálogo de productos
- `/checkout` - Proceso de pago
- `/commissions` - Mis comisiones

### Solo Admin:
- `/admin` - Panel de administración
- `/admin/products` - Gestión de productos
- `/admin/orders` - Gestión de órdenes
- `/admin/users` - Gestión de usuarios

---

## 💡 Funcionalidades Clave

### ✅ Sistema de Comisiones Automático
- **Directa:** 12% del CV al patrocinador
- **Niveles:** 7 niveles de comisiones (8%, 5%, 3%, 2%, 2%, 1%, 1%)
- **Fast Start:** 5% extra en primeros 30 días (solo iAcelera)
- **Auto-cálculo:** Cada venta genera comisiones automáticamente

### ✅ Dashboard de Afiliado
- Stats en tiempo real
- Progreso de rango visual
- Link de referido con copiar/compartir
- Referidos recientes
- Acciones rápidas

### ✅ Sistema de Wallets
- Balance pendiente (por aprobar)
- Balance disponible (listo para retiro)
- Total ganado histórico
- Mínimo $50 para retiro

### ✅ Gestión de Productos
- Cursos digitales
- Kits de inicio
- Membresías recurrentes
- Productos físicos
- BV/CV/Puntos configurables

---

## 🔑 Credenciales de Prueba

| Usuario | Email | Password | Rol | Rango |
|---------|-------|----------|-----|-------|
| Admin | admin@test.com | password123 | admin | Admin |
| Sponsor A | sponsora@test.com | password123 | affiliate | Manager |
| Sponsor B | sponsorb@test.com | password123 | affiliate | Affiliate |
| Afiliado 1 | afiliado1@test.com | password123 | affiliate | Affiliate |
| Afiliado 2 | afiliado2@test.com | password123 | affiliate | Affiliate |

---

## 📦 Productos Creados

| Producto | SKU | Precio | BV | CV | Tipo |
|----------|-----|--------|----|----|------|
| Curso Digital | CURSO-001 | $99.99 | 50 | 80 | course |
| Kit de Inicio | KIT-001 | $299.99 | 150 | 250 | starter_kit |
| Membresía Premium | MEMB-001 | $49.99 | 30 | 40 | membership |

---

## 🎨 Rangos Disponibles

### IFEDEM:
1. **Affiliate** (Inicial)
2. **Manager** (1,000 BV de equipo)
3. **Director** (5,000 BV de equipo)
4. **Executive** (25,000 BV de equipo)

### iAcelera:
1. **Bronze** (Inicial)
2. **Silver** (500 BV)
3. **Gold** (1,500 BV)
4. **Platinum** (5,000 BV)
5. **Diamond** (15,000 BV)
6. **Executive** (50,000 BV)
7. **Presidential** (150,000 BV)
8. **Ambassador** (500,000 BV)

---

## 🐛 Solución de Problemas

### ❌ "No puedo hacer login"
- ✅ Verifica que generaste los datos con el HTML
- ✅ Usa: `password123` para todos
- ✅ Verifica que Firebase Authentication tenga los usuarios

### ❌ "No se generan comisiones"
- ✅ Verifica que publicaste las reglas de Firestore
- ✅ Verifica que el usuario tenga `sponsorId`
- ✅ Revisa consola del navegador (F12) para errores

### ❌ "Dashboard muestra stats en 0"
- ✅ Normal si no has hecho compras
- ✅ Haz una compra como AFIL1 o AFIL2
- ✅ Recarga la página después de comprar

### ❌ "Error de permisos"
- ✅ **CRÍTICO:** Debes publicar las reglas de Firestore
- ✅ Ve a Firebase Console → Firestore → Reglas
- ✅ Pega contenido de `firestore.rules`
- ✅ Click Publicar

---

## 🚀 Próximos Pasos

Después de probar el sistema básico:

1. **Crear más ventas** - Login con diferentes usuarios y compra productos
2. **Ver genealogía** - Próximamente: árbol visual de red
3. **Aprobar comisiones** - Panel de admin para cambiar estado
4. **Solicitar retiros** - Sistema de payouts
5. **Reportes** - Gráficas y analíticas

---

## 📚 Documentación Completa

- `COMMISSION_SYSTEM_GUIDE.md` - Sistema de comisiones
- `EJEMPLO_DATOS_PRUEBA.md` - Guía manual de datos
- `ADMIN_PANEL_GUIDE.md` - Panel de administración
- `PRODUCT_SYSTEM_GUIDE.md` - Sistema de productos

---

## ✨ ¡Empieza Ahora!

1. ✅ Publica reglas de Firestore
2. ✅ Abre `generate-test-data.html`
3. ✅ Click "Generar Datos"
4. ✅ `npm run dev`
5. ✅ Login: `admin@test.com` / `password123`

**¡A probar el sistema MLM completo!** 🎉
