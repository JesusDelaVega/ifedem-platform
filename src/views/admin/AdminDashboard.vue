<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
        <p class="text-gray-400">Bienvenido, {{ userStore.user?.email }}</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Active Products -->
        <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-3xl">
              📦
            </div>
            <div class="flex-1">
              <div class="text-gray-400 text-sm uppercase tracking-wider mb-1">Productos Activos</div>
              <div class="text-3xl font-bold text-blue-400">{{ stats.activeProducts }}</div>
            </div>
          </div>
        </div>

        <!-- Total Orders -->
        <div class="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center text-3xl">
              🛒
            </div>
            <div class="flex-1">
              <div class="text-gray-400 text-sm uppercase tracking-wider mb-1">Órdenes Totales</div>
              <div class="text-3xl font-bold text-yellow-400">{{ stats.totalOrders }}</div>
            </div>
          </div>
        </div>

        <!-- Active Users -->
        <div class="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center text-3xl">
              👥
            </div>
            <div class="flex-1">
              <div class="text-gray-400 text-sm uppercase tracking-wider mb-1">Usuarios Activos</div>
              <div class="text-3xl font-bold text-purple-400">{{ stats.activeUsers }}</div>
            </div>
          </div>
        </div>

        <!-- Total Revenue -->
        <div class="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 hover:scale-105 transition-transform">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-3xl">
              💰
            </div>
            <div class="flex-1">
              <div class="text-gray-400 text-sm uppercase tracking-wider mb-1">Ventas Totales</div>
              <div class="text-3xl font-bold text-green-400">${{ stats.totalRevenue.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          Acciones Rápidas
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary-500 transition-all hover:scale-105 flex flex-col items-center gap-3"
            @click="router.push('/admin/products/new')"
          >
            <div class="text-4xl">➕</div>
            <div class="text-white font-semibold">Crear Producto</div>
          </button>

          <button
            class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary-500 transition-all hover:scale-105 flex flex-col items-center gap-3"
            @click="router.push('/admin/orders')"
          >
            <div class="text-4xl">📋</div>
            <div class="text-white font-semibold">Ver Órdenes</div>
          </button>

          <button
            class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary-500 transition-all hover:scale-105 flex flex-col items-center gap-3"
            @click="router.push('/admin/users')"
          >
            <div class="text-4xl">👤</div>
            <div class="text-white font-semibold">Gestionar Usuarios</div>
          </button>

          <button
            class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary-500 transition-all hover:scale-105 flex flex-col items-center gap-3"
            @click="router.push('/admin/reports')"
          >
            <div class="text-4xl">📊</div>
            <div class="text-white font-semibold">Ver Reportes</div>
          </button>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            Órdenes Recientes
          </h2>
          <router-link to="/admin/orders" class="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-2">
            Ver todas
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p class="text-white text-lg">Cargando...</p>
        </div>

        <div v-else-if="recentOrders.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📋</div>
          <p class="text-gray-400 text-lg">No hay órdenes recientes</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/10">
                <th class="text-left py-3 px-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">Orden</th>
                <th class="text-left py-3 px-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">Cliente</th>
                <th class="text-left py-3 px-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">Fecha</th>
                <th class="text-left py-3 px-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">Total</th>
                <th class="text-left py-3 px-4 text-gray-400 text-sm font-semibold uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in recentOrders" :key="order.id" class="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td class="py-3 px-4">
                  <router-link :to="`/admin/orders/${order.id}`" class="text-primary-400 hover:text-primary-300 font-semibold">
                    {{ order.orderNumber }}
                  </router-link>
                </td>
                <td class="py-3 px-4 text-white">{{ order.customerId }}</td>
                <td class="py-3 px-4 text-gray-400">{{ formatDate(order.createdAt) }}</td>
                <td class="py-3 px-4 text-green-400 font-semibold">${{ order.total.toFixed(2) }}</td>
                <td class="py-3 px-4">
                  <span :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    getStatusClass(order.status)
                  ]">
                    {{ translateStatus(order.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Platform Info -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          Información de la Plataforma
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider block mb-2">Plataforma</label>
            <span class="text-white text-lg">{{ platformName }}</span>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider block mb-2">Modo</label>
            <span class="text-white text-lg">{{ platformMode }}</span>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider block mb-2">Firebase Project</label>
            <span class="text-white text-lg">{{ firebaseProjectId }}</span>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider block mb-2">Usuario Admin</label>
            <span class="text-white text-lg truncate block">{{ userStore.user?.email }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Order } from '@/shared/types/product'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const recentOrders = ref<Order[]>([])

const stats = ref({
  activeProducts: 0,
  totalOrders: 0,
  activeUsers: 0,
  totalRevenue: 0
})

const platformMode = computed(() => import.meta.env.VITE_PLATFORM_MODE)
const firebaseProjectId = computed(() => import.meta.env.VITE_FIREBASE_PROJECT_ID)

const platformName = computed(() => {
  const mode = import.meta.env.VITE_PLATFORM_MODE
  return mode === 'iacelera' ? 'iAcelera' : 'IFEDEM'
})

async function loadStats() {
  try {
    loading.value = true

    // Count active products
    const productsSnap = await getDocs(
      query(collection(db, 'products'), where('status', '==', 'active'))
    )
    stats.value.activeProducts = productsSnap.size

    // Count total orders
    const ordersSnap = await getDocs(collection(db, 'orders'))
    stats.value.totalOrders = ordersSnap.size

    // Calculate total revenue
    let revenue = 0
    ordersSnap.forEach((doc) => {
      const order = doc.data() as Order
      if (order.status !== 'cancelled' && order.status !== 'refunded') {
        revenue += order.total
      }
    })
    stats.value.totalRevenue = revenue

    // Count active users
    const usersSnap = await getDocs(
      query(collection(db, 'users'), where('status', '==', 'active'))
    )
    stats.value.activeUsers = usersSnap.size
  } catch (err) {
    console.error('Error loading stats:', err)
  } finally {
    loading.value = false
  }
}

async function loadRecentOrders() {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5))

    const snapshot = await getDocs(q)
    recentOrders.value = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date()
      } as Order
    })
  } catch (err) {
    console.error('Error loading recent orders:', err)
  }
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

function translateStatus(status: string): string {
  const translations: Record<string, string> = {
    pending: 'Pendiente',
    processing: 'Procesando',
    paid: 'Pagado',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
    refunded: 'Reembolsado',
    failed: 'Fallido'
  }
  return translations[status] || status
}

function getStatusClass(status: string): string {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    paid: 'bg-green-500/20 text-green-400 border border-green-500/30',
    shipped: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    delivered: 'bg-green-500/20 text-green-400 border border-green-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border border-red-500/30',
    refunded: 'bg-red-500/20 text-red-400 border border-red-500/30',
    failed: 'bg-red-500/20 text-red-400 border border-red-500/30'
  }
  return classes[status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
}

onMounted(() => {
  loadStats()
  loadRecentOrders()
})
</script>
