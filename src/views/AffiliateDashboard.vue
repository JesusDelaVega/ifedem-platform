<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard de Afiliado</h1>
            <p class="text-gray-600">{{ userStore.fullName }}</p>
          </div>
          <div class="flex items-center gap-3">
            <router-link to="/commissions"
              class="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              💰 Comisiones
            </router-link>
            <button @click="handleLogout"
              class="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Salir
            </button>
          </div>
        </div>

        <!-- Rank Badge -->
        <div class="flex items-center gap-2 mt-4">
          <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold"
            :class="getRankBadgeColor(stats?.currentRank)">
            {{ getRankName(stats?.currentRank) }}
          </span>
          <span v-if="stats?.nextRank" class="text-sm text-gray-600">
            {{ stats.rankProgress }}% hacia {{ getRankName(stats.nextRank) }}
          </span>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p class="mt-4 text-gray-600">Cargando estadísticas...</p>
      </div>

      <div v-else-if="stats">
        <!-- Link de Referido -->
        <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white mb-8">
          <h3 class="text-xl font-bold mb-3">🔗 Tu Link de Referido</h3>
          <div class="flex items-center gap-3">
            <input
              :value="referralLink"
              readonly
              class="flex-1 bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white font-mono text-sm"
            />
            <button
              @click="copyReferralLink"
              class="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              {{ copied ? '✓ Copiado' : 'Copiar' }}
            </button>
          </div>
          <p class="text-sm opacity-90 mt-2">Código: <span class="font-bold">{{ userStore.user?.referralCode }}</span></p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Ventas Personales -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-600 text-sm font-medium">Ventas Personales</span>
              <div class="bg-blue-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">${{ stats.personalSales.toFixed(2) }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ stats.personalOrders }} órdenes</p>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <p class="text-xs text-gray-600">BV: {{ stats.personalBV }} | CV: {{ stats.personalCV }}</p>
            </div>
          </div>

          <!-- Ventas de Equipo -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-600 text-sm font-medium">Ventas de Equipo</span>
              <div class="bg-green-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">${{ stats.teamSales.toFixed(2) }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ stats.teamOrders }} órdenes</p>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <p class="text-xs text-gray-600">BV: {{ stats.teamBV }} | CV: {{ stats.teamCV }}</p>
            </div>
          </div>

          <!-- Comisiones -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-600 text-sm font-medium">Ganancias Totales</span>
              <div class="bg-purple-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">${{ stats.totalEarnings.toFixed(2) }}</p>
            <p class="text-xs text-gray-500 mt-1">Este mes: ${{ stats.thisMonthEarnings.toFixed(2) }}</p>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <p class="text-xs text-gray-600">Disponible: ${{ stats.availableBalance.toFixed(2) }}</p>
            </div>
          </div>

          <!-- Red -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-600 text-sm font-medium">Mi Red</span>
              <div class="bg-orange-100 p-2 rounded-lg">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ stats.directReferrals }}</p>
            <p class="text-xs text-gray-500 mt-1">Referidos directos</p>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <p class="text-xs text-gray-600">Total: {{ stats.totalDownline }} | Activos: {{ stats.activeDownline }}</p>
            </div>
          </div>
        </div>

        <!-- Progreso de Rango -->
        <div v-if="stats.nextRank" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 class="text-lg font-bold text-gray-900 mb-4">
            📈 Progreso hacia {{ getRankName(stats.nextRank) }}
          </h3>
          <div class="relative pt-1">
            <div class="flex mb-2 items-center justify-between">
              <div>
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                  {{ stats.rankProgress }}%
                </span>
              </div>
              <div class="text-right">
                <span class="text-xs font-semibold inline-block text-purple-600">
                  {{ stats.teamBV }} / {{ getNextRankRequirement(stats.nextRank) }} BV
                </span>
              </div>
            </div>
            <div class="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-purple-200">
              <div
                :style="`width: ${stats.rankProgress}%`"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
              ></div>
            </div>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            Te faltan <strong>{{ getNextRankRequirement(stats.nextRank) - stats.teamBV }}</strong> BV para alcanzar {{ getRankName(stats.nextRank) }}
          </p>
        </div>

        <!-- Acciones Rápidas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <router-link to="/products"
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-blue-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Ver Productos</h4>
                <p class="text-sm text-gray-600">Catálogo completo</p>
              </div>
            </div>
          </router-link>

          <router-link to="/commissions"
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-4">
              <div class="bg-purple-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Mis Comisiones</h4>
                <p class="text-sm text-gray-600">Historial completo</p>
              </div>
            </div>
          </router-link>

          <button @click="shareReferralLink"
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
            <div class="flex items-center gap-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Compartir Link</h4>
                <p class="text-sm text-gray-600">Invita a nuevos afiliados</p>
              </div>
            </div>
          </button>
        </div>

        <!-- Referidos Recientes -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <h3 class="text-lg font-bold text-gray-900 mb-4">👥 Referidos Recientes</h3>
          <div v-if="stats.recentReferrals.length === 0" class="text-center py-8 text-gray-500">
            No tienes referidos aún. ¡Comparte tu link para empezar!
          </div>
          <div v-else class="space-y-3">
            <div v-for="referral in stats.recentReferrals" :key="referral.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-semibold text-gray-900">{{ referral.firstName }} {{ referral.lastName }}</p>
                <p class="text-sm text-gray-600">{{ referral.email }}</p>
              </div>
              <div class="text-right">
                <span :class="getRankBadgeColor(referral.currentRank || 'affiliate')"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  {{ getRankName(referral.currentRank) }}
                </span>
                <p class="text-xs text-gray-500 mt-1">{{ formatDate(referral.createdAt) }}</p>
              </div>
            </div>
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
import { useAffiliateStats } from '@/shared/composables/useAffiliateStats'
import { useAuth } from '@/shared/composables/useAuth'

const router = useRouter()
const userStore = useUserStore()
const { logout } = useAuth()
const { stats, loading, fetchAffiliateStats } = useAffiliateStats()

const copied = ref(false)

const referralLink = computed(() => {
  const baseUrl = window.location.origin
  const code = userStore.user?.referralCode || ''
  return `${baseUrl}/auth?ref=${code}`
})

function getRankName(rank: string | undefined | null): string {
  if (!rank) return 'Afiliado'

  const names: Record<string, string> = {
    // iAcelera
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro',
    platinum: 'Platino',
    diamond: 'Diamante',
    executive: 'Ejecutivo',
    presidential: 'Presidencial',
    ambassador: 'Embajador',
    // IFEDEM
    affiliate: 'Afiliado',
    manager: 'Manager',
    director: 'Director',
    executive: 'Ejecutivo'
  }
  return names[rank] || rank
}

function getRankBadgeColor(rank: string | undefined | null): string {
  if (!rank) return 'bg-gray-200 text-gray-800'

  const colors: Record<string, string> = {
    bronze: 'bg-orange-200 text-orange-800',
    silver: 'bg-gray-300 text-gray-800',
    gold: 'bg-yellow-200 text-yellow-800',
    platinum: 'bg-blue-200 text-blue-800',
    diamond: 'bg-purple-200 text-purple-800',
    executive: 'bg-red-200 text-red-800',
    presidential: 'bg-indigo-200 text-indigo-800',
    ambassador: 'bg-pink-200 text-pink-800',
    affiliate: 'bg-gray-200 text-gray-800',
    manager: 'bg-green-200 text-green-800',
    director: 'bg-blue-200 text-blue-800'
  }
  return colors[rank] || 'bg-gray-200 text-gray-800'
}

function getNextRankRequirement(nextRank: string): number {
  const platform = userStore.platform

  if (platform === 'iacelera') {
    const reqs: Record<string, number> = {
      silver: 500,
      gold: 1500,
      platinum: 5000,
      diamond: 15000,
      executive: 50000,
      presidential: 150000,
      ambassador: 500000
    }
    return reqs[nextRank] || 0
  } else {
    const reqs: Record<string, number> = {
      manager: 1000,
      director: 5000,
      executive: 25000
    }
    return reqs[nextRank] || 0
  }
}

function formatDate(date: any) {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
}

async function copyReferralLink() {
  await navigator.clipboard.writeText(referralLink.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

async function shareReferralLink() {
  if (navigator.share) {
    await navigator.share({
      title: 'Únete a mi red',
      text: `Únete a ${userStore.platform === 'iacelera' ? 'iAcelera' : 'IFEDEM'} con mi código de referido`,
      url: referralLink.value
    })
  } else {
    await copyReferralLink()
    alert('Link copiado al portapapeles')
  }
}

async function handleLogout() {
  await logout()
  router.push('/auth')
}

onMounted(async () => {
  if (userStore.user) {
    await fetchAffiliateStats(userStore.user.id, userStore.platform as 'iacelera' | 'ifedem')
  }
})
</script>
