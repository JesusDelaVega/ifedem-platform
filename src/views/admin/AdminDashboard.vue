<template>
  <div class="admin-dashboard">
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon products">📦</div>
        <div class="stat-info">
          <div class="stat-label">Productos Activos</div>
          <div class="stat-value">{{ stats.activeProducts }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orders">🛒</div>
        <div class="stat-info">
          <div class="stat-label">Órdenes Totales</div>
          <div class="stat-value">{{ stats.totalOrders }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon users">👥</div>
        <div class="stat-info">
          <div class="stat-label">Usuarios Activos</div>
          <div class="stat-value">{{ stats.activeUsers }}</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon revenue">💰</div>
        <div class="stat-info">
          <div class="stat-label">Ventas Totales</div>
          <div class="stat-value">${{ stats.totalRevenue.toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="section-card">
      <h2>Acciones Rápidas</h2>
      <div class="quick-actions">
        <button class="action-card" @click="router.push('/admin/products/new')">
          <span class="action-icon">➕</span>
          <span>Crear Producto</span>
        </button>

        <button class="action-card" @click="router.push('/admin/orders')">
          <span class="action-icon">📋</span>
          <span>Ver Órdenes</span>
        </button>

        <button class="action-card" @click="router.push('/admin/users')">
          <span class="action-icon">👤</span>
          <span>Gestionar Usuarios</span>
        </button>

        <button class="action-card" @click="router.push('/admin/reports')">
          <span class="action-icon">📊</span>
          <span>Ver Reportes</span>
        </button>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="section-card">
      <div class="section-header">
        <h2>Órdenes Recientes</h2>
        <router-link to="/admin/orders" class="view-all">Ver todas →</router-link>
      </div>

      <div v-if="loading" class="loading">Cargando...</div>

      <div v-else-if="recentOrders.length === 0" class="empty">
        No hay órdenes recientes
      </div>

      <div v-else class="orders-table">
        <table>
          <thead>
            <tr>
              <th>Orden</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id">
              <td>
                <router-link :to="`/admin/orders/${order.id}`" class="order-link">
                  {{ order.orderNumber }}
                </router-link>
              </td>
              <td>{{ order.customerId }}</td>
              <td>{{ formatDate(order.createdAt) }}</td>
              <td>${{ order.total.toFixed(2) }}</td>
              <td>
                <span :class="`status-badge ${order.status}`">
                  {{ translateStatus(order.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Platform Info -->
    <div class="section-card">
      <h2>Información de la Plataforma</h2>
      <div class="info-grid">
        <div class="info-item">
          <label>Plataforma:</label>
          <span>{{ platformName }}</span>
        </div>
        <div class="info-item">
          <label>Modo:</label>
          <span>{{ platformMode }}</span>
        </div>
        <div class="info-item">
          <label>Firebase Project:</label>
          <span>{{ firebaseProjectId }}</span>
        </div>
        <div class="info-item">
          <label>Usuario Admin:</label>
          <span>{{ userStore.user?.email }}</span>
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

const platformName = computed(() => {
  const mode = import.meta.env.VITE_PLATFORM_MODE
  return mode === 'iacelera' ? 'iAcelera' : 'IFEDEM'
})

const firebaseProjectId = computed(() => import.meta.env.VITE_FIREBASE_PROJECT_ID)

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

onMounted(() => {
  loadStats()
  loadRecentOrders()
})
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.stat-icon.products {
  background: #e6f4ff;
}

.stat-icon.orders {
  background: #fff7e6;
}

.stat-icon.users {
  background: #f0f5ff;
}

.stat-icon.revenue {
  background: #e6fffb;
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
}

/* Section Card */
.section-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-card h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  color: #2d3748;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  margin: 0;
}

.view-all {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.view-all:hover {
  text-decoration: underline;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-card {
  padding: 1.5rem;
  background: #f7fafc;
  border: 2px dashed #cbd5e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
}

.action-card:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  font-size: 2rem;
}

/* Orders Table */
.orders-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f7fafc;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
}

.order-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.order-link:hover {
  text-decoration: underline;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.processing {
  background: #dbeafe;
  color: #1e40af;
}

.status-badge.paid {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.shipped {
  background: #e0e7ff;
  color: #3730a3;
}

.status-badge.delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.refunded {
  background: #fecaca;
  color: #991b1b;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item label {
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
}

.info-item span {
  font-size: 1rem;
  color: #2d3748;
}

/* Loading & Empty States */
.loading,
.empty {
  text-align: center;
  padding: 3rem;
  color: #718096;
}

/* Responsive */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .section-card {
    padding: 1.5rem;
  }
}
</style>
