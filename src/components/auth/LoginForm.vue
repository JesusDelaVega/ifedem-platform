<template>
  <div class="w-full max-w-md mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Iniciar Sesión</h2>
      <p class="text-gray-400">Accede a tu cuenta de {{ platformName }}</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Email -->
      <div>
        <label for="email" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="tu@email.com"
          required
          :disabled="loading"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
          Contraseña
        </label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="••••••••"
          required
          :disabled="loading"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <!-- Forgot Password -->
      <div class="text-right">
        <button
          type="button"
          class="text-primary-400 hover:text-primary-300 text-sm font-semibold transition-colors"
          @click="$emit('show-reset')"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
        {{ error }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
      </button>
    </form>

    <!-- Register Link -->
    <div class="mt-8 text-center">
      <p class="text-gray-400">
        ¿No tienes cuenta?
        <button
          type="button"
          class="text-primary-400 hover:text-primary-300 font-semibold transition-colors ml-1"
          @click="$emit('show-register')"
        >
          Regístrate aquí
        </button>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/shared/composables/useAuth'

const emit = defineEmits<{
  'show-register': []
  'show-reset': []
}>()

const router = useRouter()
const { login, loading, error } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const platformName = computed(() => {
  const mode = import.meta.env.VITE_PLATFORM_MODE
  return mode === 'iacelera' ? 'iAcelera' : 'IFEDEM'
})

async function handleLogin() {
  try {
    console.log('🚀 Starting login process...')
    await login(form.value.email, form.value.password)
    console.log('✅ Login completed, redirecting to dashboard...')
    await router.push('/dashboard')
    console.log('✅ Navigation to dashboard completed')
  } catch (err) {
    console.error('❌ Login error:', err)
  }
}
</script>
