# Cómo Arreglar el Problema de Permisos de Firebase

## El Problema
El login falla con el error "Missing or insufficient permissions" porque las reglas de seguridad de Firestore están muy restrictivas.

## Solución Rápida (Ya Aplicada en el Código)
✅ Hice que el update de `lastLogin` no bloquee el login si falla por permisos.

## Solución Permanente (Necesitas Aplicar las Reglas de Firestore)

### Paso 1: Ve a Firebase Console
1. Abre https://console.firebase.google.com
2. Selecciona el proyecto **ace-ife**
3. En el menú lateral, selecciona **Firestore Database**
4. Ve a la pestaña **Reglas** (Rules)

### Paso 2: Verifica las Reglas Actuales
Probablemente verás algo como:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;  // ⬅️ ESTO BLOQUEA TODO
    }
  }
}
```

### Paso 3: Reemplaza con las Nuevas Reglas
1. Abre el archivo `firestore.rules` que creé en la raíz de tus proyectos
2. Copia TODO el contenido
3. Pégalo en el editor de Firebase Console (reemplaza las reglas existentes)
4. Haz clic en **Publicar** (Publish)

### Paso 4: Verifica Authentication
También verifica que Email/Password esté habilitado:
1. Ve a **Authentication** en el menú lateral
2. Ve a la pestaña **Sign-in method**
3. Verifica que **Email/Password** esté **Habilitado**
4. Si no está habilitado, haz clic en él y habilítalo

## ¿Qué Hacen las Nuevas Reglas?

Las reglas que creé permiten:

✅ **Usuarios autenticados pueden:**
- Leer y actualizar su propio documento en `users`
- Crear su cuenta durante el registro
- Leer y actualizar su propio perfil de afiliado
- Leer sus propias órdenes, comisiones y bonos
- Ver todos los productos

✅ **Administradores pueden:**
- Hacer TODO (CRUD completo en todas las colecciones)

❌ **Bloquea:**
- Usuarios no autenticados (excepto leer productos)
- Usuarios intentando modificar datos de otros usuarios
- Usuarios intentando cambiar su propio rol o permisos

## Prueba Después de Aplicar las Reglas

1. Guarda y publica las reglas en Firebase Console
2. Recarga tu aplicación local (http://localhost:5176)
3. Intenta hacer login de nuevo
4. Deberías poder entrar sin problemas

## Si Aún No Funciona

Revisa la consola del navegador (F12) y busca errores específicos. Los logs que agregué te dirán exactamente dónde está fallando el proceso de login.
