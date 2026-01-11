<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 p-4 md:p-8">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
    </div>

    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-h-[600px] relative z-10">
      <!-- Left Side - Info -->
      <div class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 p-8 lg:p-12 flex flex-col text-white overflow-hidden border-r border-white/10">
        <!-- Decorative background -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl"></div>
          <div class="absolute bottom-0 right-0 w-64 h-64 bg-primary-600 rounded-full filter blur-3xl"></div>
        </div>

        <button
          class="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg cursor-pointer text-sm self-start mb-8 hover:bg-white/20 transition-all flex items-center gap-2"
          @click="$router.push('/')"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver al Inicio
        </button>

        <div class="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
          <div class="relative mb-8">
            <div class="absolute inset-0 bg-primary-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div class="relative">
              <PlatformLogo size="large" />
            </div>
          </div>

          <h1 class="text-4xl lg:text-5xl font-extrabold mb-3">{{ platformName }}</h1>
          <p class="text-lg lg:text-xl mb-12 text-gray-300">{{ tagline }}</p>

          <div class="flex flex-col gap-5 w-full max-w-sm">
            <div class="flex items-start gap-4 text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div class="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-base lg:text-lg">{{ feature1 }}</span>
            </div>
            <div class="flex items-start gap-4 text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div class="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-base lg:text-lg">{{ feature2 }}</span>
            </div>
            <div class="flex items-start gap-4 text-left p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div class="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <span class="text-base lg:text-lg">{{ feature3 }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Forms -->
      <div class="p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
        <LoginForm
          v-if="mode === 'login'"
          @show-register="mode = 'register'"
          @show-reset="mode = 'reset'"
        />

        <RegisterForm v-else-if="mode === 'register'" @show-login="mode = 'login'" />

        <ResetPasswordForm v-else-if="mode === 'reset'" @show-login="mode = 'login'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm.vue'
import PlatformLogo from '@/components/shared/PlatformLogo.vue'

const mode = ref<'login' | 'register' | 'reset'>('login')

const platformName = computed(() => {
  const platformMode = import.meta.env.VITE_PLATFORM_MODE
  return platformMode === 'iacelera' ? 'iAcelera' : 'IFEDEM'
})

const tagline = computed(() => {
  const platformMode = import.meta.env.VITE_PLATFORM_MODE
  return platformMode === 'iacelera'
    ? 'Impulsa tu éxito emprendedor'
    : 'Educación de excelencia para todos'
})

const feature1 = computed(() => {
  const platformMode = import.meta.env.VITE_PLATFORM_MODE
  return platformMode === 'iacelera'
    ? 'Sistema de recompensas multinivel'
    : 'Cursos certificados de calidad'
})

const feature2 = computed(() => {
  const platformMode = import.meta.env.VITE_PLATFORM_MODE
  return platformMode === 'iacelera'
    ? 'Comisiones ilimitadas'
    : 'Aprende a tu propio ritmo'
})

const feature3 = computed(() => {
  const platformMode = import.meta.env.VITE_PLATFORM_MODE
  return platformMode === 'iacelera'
    ? 'Red de emprendedores activa'
    : 'Acceso a expertos de la industria'
})
</script>
