<template>
  <div class="w-full max-w-lg mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Crear Cuenta</h2>
      <p class="text-gray-400">Únete a {{ platformName }}</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Name Row -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="firstName" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
            Nombre
          </label>
          <input
            id="firstName"
            v-model="form.firstName"
            type="text"
            placeholder="Juan"
            required
            :disabled="loading"
            class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        <div>
          <label for="lastName" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
            Apellido
          </label>
          <input
            id="lastName"
            v-model="form.lastName"
            type="text"
            placeholder="Pérez"
            required
            :disabled="loading"
            class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
      </div>

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

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
          Teléfono <span class="text-gray-400 text-xs normal-case">(opcional)</span>
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="+52 123 456 7890"
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
          minlength="6"
          :disabled="loading"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p class="text-gray-400 text-xs mt-1">Mínimo 6 caracteres</p>
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="confirmPassword" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
          Confirmar Contraseña
        </label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          :disabled="loading"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      <!-- Referral Code -->
      <div>
        <label for="referralCode" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
          Código de Referido <span class="text-gray-400 text-xs normal-case">(opcional)</span>
        </label>
        <input
          id="referralCode"
          v-model="form.referralCode"
          type="text"
          placeholder="ABC1234"
          :disabled="loading"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p class="text-gray-400 text-xs mt-1">Si alguien te invitó, ingresa su código aquí</p>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
        {{ error }}
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading || !isValid"
        class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Creando cuenta...' : 'Crear Cuenta' }}
      </button>
    </form>

    <!-- Login Link -->
    <div class="mt-8 text-center">
      <p class="text-gray-400">
        ¿Ya tienes cuenta?
        <button
          type="button"
          class="text-primary-400 hover:text-primary-300 font-semibold transition-colors ml-1"
          @click="$emit('show-login')"
        >
          Inicia sesión aquí
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
  'show-login': []
}>()

const router = useRouter()
const { register, loading, error } = useAuth()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  referralCode: ''
})

const platformName = computed(() => {
  const mode = import.meta.env.VITE_PLATFORM_MODE
  return mode === 'iacelera' ? 'iAcelera' : 'IFEDEM'
})

const platform = computed(() => {
  return import.meta.env.VITE_PLATFORM_MODE as 'iacelera' | 'ifedem'
})

const isValid = computed(() => {
  return (
    form.value.firstName &&
    form.value.lastName &&
    form.value.email &&
    form.value.password &&
    form.value.password === form.value.confirmPassword
  )
})

async function handleRegister() {
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  try {
    const result = await register(form.value.email, form.value.password, {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      phone: form.value.phone || undefined,
      platform: platform.value,
      referralCode: form.value.referralCode || undefined
    })

    if ((result as any).isNewPlatform) {
      alert(`¡Bienvenido a ${platformName.value}! Has sido agregado exitosamente.`)
    }

    router.push('/dashboard')
  } catch (err) {
    console.error('Registration error:', err)
  }
}
</script>
