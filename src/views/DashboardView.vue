<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <PlatformLogo size="small" />
              <div>
                <h1 class="text-xl sm:text-2xl font-bold text-white">
                  ¡Bienvenido, {{ userStore.fullName || 'Usuario' }}!
                </h1>
                <p class="text-sm text-gray-400">Panel de Control</p>
              </div>
            </div>
            <button
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-lg flex items-center gap-2"
              @click="handleLogout"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              <span class="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="userStore.loading" class="flex items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p class="text-white text-lg">Cargando...</p>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div v-else-if="userStore.user" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="space-y-6">

          <!-- Account Info Card -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div class="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              Información de tu Cuenta
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider">Email</label>
                <p class="text-white text-lg mt-1 break-all">{{ userStore.user.email }}</p>
              </div>

              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider">Plataforma</label>
                <p class="text-white text-lg mt-1">
                  <span class="inline-block px-3 py-1 bg-primary-500 text-white rounded-lg font-semibold text-sm">
                    {{ userStore.user.platform?.toUpperCase() }}
                  </span>
                </p>
              </div>

              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider">Rol</label>
                <p class="text-white text-lg mt-1">
                  <span class="inline-block px-3 py-1 bg-primary-500 text-white rounded-lg font-semibold text-sm">
                    {{ userStore.user.role }}
                  </span>
                </p>
              </div>

              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider">Código de Referido</label>
                <p class="text-primary-400 text-xl mt-1 font-mono font-bold">{{ userStore.user.referralCode }}</p>
              </div>

              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <label class="text-gray-400 text-sm font-semibold uppercase tracking-wider">Estado</label>
                <p class="text-white text-lg mt-1">
                  <span class="inline-flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded-lg font-semibold text-sm">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    {{ userStore.user.status }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Affiliate Stats -->
          <div v-if="userStore.affiliateProfile" class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              Perfil de Afiliado
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Rank Card -->
              <div class="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div class="text-5xl mb-2">👑</div>
                <div class="text-3xl font-bold text-yellow-400 mb-1">{{ userStore.affiliateProfile.currentRank }}</div>
                <div class="text-gray-400 text-sm uppercase tracking-wider">Rango Actual</div>
              </div>

              <!-- Referrals Card -->
              <div class="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div class="text-5xl mb-2">👥</div>
                <div class="text-3xl font-bold text-blue-400 mb-1">{{ userStore.affiliateProfile.totalReferrals }}</div>
                <div class="text-gray-400 text-sm uppercase tracking-wider">Total Referidos</div>
              </div>

              <!-- Balance Card -->
              <div class="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div class="text-5xl mb-2">💵</div>
                <div class="text-3xl font-bold text-green-400 mb-1">${{ userStore.affiliateProfile.availableBalance.toFixed(2) }}</div>
                <div class="text-gray-400 text-sm uppercase tracking-wider">Balance Disponible</div>
              </div>

              <!-- Earnings Card -->
              <div class="bg-gradient-to-br from-primary-500/20 to-primary-600/20 backdrop-blur-sm border border-primary-500/30 rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <div class="text-5xl mb-2">💰</div>
                <div class="text-3xl font-bold text-primary-400 mb-1">${{ userStore.affiliateProfile.totalEarnings.toFixed(2) }}</div>
                <div class="text-gray-400 text-sm uppercase tracking-wider">Total Ganado</div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              Acciones Rápidas
            </h2>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <button
                class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 opacity-50 cursor-not-allowed"
                disabled
              >
                <div class="text-4xl mb-3">📊</div>
                <div class="text-white font-semibold">Ver Red</div>
              </button>

              <button
                class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 opacity-50 cursor-not-allowed"
                disabled
              >
                <div class="text-4xl mb-3">💰</div>
                <div class="text-white font-semibold">Comisiones</div>
              </button>

              <button
                class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-primary-500 transition-all hover:scale-105"
                @click="router.push('/products')"
              >
                <div class="text-4xl mb-3">🛒</div>
                <div class="text-white font-semibold">Productos</div>
              </button>

              <button
                class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105 opacity-50 cursor-not-allowed"
                disabled
              >
                <div class="text-4xl mb-3">👥</div>
                <div class="text-white font-semibold">Referidos</div>
              </button>
            </div>

            <div class="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
              <p class="text-yellow-400 text-sm font-semibold">
                🚀 Panel completo próximamente...
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuth } from '@/shared/composables/useAuth'
import PlatformLogo from '@/components/shared/PlatformLogo.vue'

const router = useRouter()
const userStore = useUserStore()
const { logout } = useAuth()

onMounted(() => {
  if (!userStore.user) {
    router.push('/auth')
  }
})

async function handleLogout() {
  try {
    await logout()
    router.push('/auth')
  } catch (err) {
    console.error('Logout error:', err)
  }
}
</script>
