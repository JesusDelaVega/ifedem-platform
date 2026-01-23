<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Mis Comisiones</h1>
        <p class="text-gray-600">Historial completo de tus comisiones y ganancias</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Ganado -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Total Ganado</span>
            <div class="bg-green-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">${{ totalEarned.toFixed(2) }}</p>
          <p class="text-xs text-gray-500 mt-1">Histórico</p>
        </div>

        <!-- Pendiente -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Pendiente</span>
            <div class="bg-yellow-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">${{ totalPending.toFixed(2) }}</p>
          <p class="text-xs text-gray-500 mt-1">En proceso</p>
        </div>

        <!-- Aprobado -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Aprobado</span>
            <div class="bg-blue-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">${{ totalApproved.toFixed(2) }}</p>
          <p class="text-xs text-gray-500 mt-1">Listo para pago</p>
        </div>

        <!-- Pagado -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 text-sm font-medium">Pagado</span>
            <div class="bg-purple-100 p-2 rounded-lg">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p class="text-3xl font-bold text-gray-900">${{ totalPaid.toFixed(2) }}</p>
          <p class="text-xs text-gray-500 mt-1">Recibido</p>
        </div>
      </div>

      <!-- Wallet Info -->
      <div v-if="wallet" class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white mb-8">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm opacity-90 mb-1">Balance Disponible</p>
            <p class="text-4xl font-bold">${{ wallet.availableBalance.toFixed(2) }}</p>
            <p class="text-sm opacity-75 mt-2">
              Pendiente: ${{ wallet.pendingBalance.toFixed(2) }}
            </p>
          </div>
          <button
            @click="requestPayout"
            :disabled="wallet.availableBalance < 50"
            class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Solicitar Retiro
          </button>
        </div>
        <p v-if="wallet.availableBalance < 50" class="text-xs opacity-75 mt-4">
          * Mínimo $50.00 para solicitar retiro
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
            <select
              v-model="filterStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="">Todos</option>
              <option value="PENDING">Pendiente</option>
              <option value="APPROVED">Aprobado</option>
              <option value="PAID">Pagado</option>
              <option value="CANCELLED">Cancelado</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              v-model="filterType"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="">Todos</option>
              <option value="DIRECT_SALE">Venta Directa</option>
              <option value="UNILEVEL">Unilevel</option>
              <option value="FAST_START">Fast Start</option>
              <option value="BONUS">Bono</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por orden..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <!-- Commissions Table -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orden</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generado por</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  Cargando comisiones...
                </td>
              </tr>
              <tr v-else-if="filteredCommissions.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  No se encontraron comisiones
                </td>
              </tr>
              <tr v-for="commission in filteredCommissions" :key="commission.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(commission.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getTypeColor(commission.type)">
                    {{ getTypeName(commission.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {{ commission.orderNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ commission.generatedByName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {{ commission.level || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                  ${{ commission.amount.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusColor(commission.status)">
                    {{ getStatusName(commission.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCommissions } from '@/shared/composables/useCommissions'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { commissions, loading, totalPending, totalApproved, totalPaid, totalEarned, fetchUserCommissions, fetchUserWallet } = useCommissions()

const wallet = ref<any>(null)
const filterStatus = ref('')
const filterType = ref('')
const searchQuery = ref('')

// Filtered commissions
const filteredCommissions = computed(() => {
  let filtered = commissions.value

  if (filterStatus.value) {
    filtered = filtered.filter(c => c.status === filterStatus.value)
  }

  if (filterType.value) {
    filtered = filtered.filter(c => c.type === filterType.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(c =>
      c.orderNumber.toLowerCase().includes(query) ||
      c.generatedByName.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Helpers
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getTypeName(type: string) {
  const types: Record<string, string> = {
    'DIRECT_SALE': 'Venta Directa',
    'UNILEVEL': 'Unilevel',
    'FAST_START': 'Fast Start',
    'BONUS': 'Bono',
    'BINARY_MATCH': 'Binario',
    'LEADERSHIP': 'Liderazgo'
  }
  return types[type] || type
}

function getTypeColor(type: string) {
  const colors: Record<string, string> = {
    'DIRECT_SALE': 'bg-blue-100 text-blue-800',
    'UNILEVEL': 'bg-purple-100 text-purple-800',
    'FAST_START': 'bg-orange-100 text-orange-800',
    'BONUS': 'bg-pink-100 text-pink-800',
    'BINARY_MATCH': 'bg-indigo-100 text-indigo-800',
    'LEADERSHIP': 'bg-green-100 text-green-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

function getStatusName(status: string) {
  const statuses: Record<string, string> = {
    'PENDING': 'Pendiente',
    'APPROVED': 'Aprobado',
    'PAID': 'Pagado',
    'CANCELLED': 'Cancelado'
  }
  return statuses[status] || status
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    'PENDING': 'bg-yellow-100 text-yellow-800',
    'APPROVED': 'bg-blue-100 text-blue-800',
    'PAID': 'bg-green-100 text-green-800',
    'CANCELLED': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

function requestPayout() {
  alert('Funcionalidad de retiro próximamente. Mínimo $50.00')
}

// Load data
onMounted(async () => {
  if (userStore.user) {
    await fetchUserCommissions(userStore.user.id, userStore.platform as 'iacelera' | 'ifedem')

    // Load wallet
    wallet.value = await fetchUserWallet(userStore.user.id, userStore.platform as 'iacelera' | 'ifedem')
  }
})
</script>
