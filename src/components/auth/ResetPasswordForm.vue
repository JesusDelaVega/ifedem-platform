<template>
  <div class="w-full max-w-md mx-auto">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Recuperar Contraseña</h2>
      <p class="text-gray-400">Te enviaremos un link para resetear tu contraseña</p>
    </div>

    <form v-if="!success" @submit.prevent="handleReset" class="space-y-6">
      <!-- Email -->
      <div>
        <label for="email" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="tu@email.com"
          required
          :disabled="loading"
          class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        />
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
        {{ loading ? 'Enviando...' : 'Enviar Link de Recuperación' }}
      </button>
    </form>

    <!-- Success Message -->
    <div v-else class="text-center py-8">
      <div class="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-white mb-3">¡Email enviado!</h3>
      <p class="text-gray-400 leading-relaxed">
        Revisa tu bandeja de entrada y sigue las instrucciones para resetear tu contraseña.
      </p>
    </div>

    <!-- Back to Login -->
    <div class="mt-8 text-center">
      <button
        type="button"
        class="text-primary-400 hover:text-primary-300 font-semibold transition-colors inline-flex items-center gap-2"
        @click="$emit('show-login')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Volver al inicio de sesión
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/shared/composables/useAuth'

defineEmits<{
  'show-login': []
}>()

const { resetPassword, loading, error } = useAuth()
const email = ref('')
const success = ref(false)

async function handleReset() {
  try {
    await resetPassword(email.value)
    success.value = true
  } catch (err) {
    console.error('Reset password error:', err)
  }
}
</script>
