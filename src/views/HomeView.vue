<template>
  <div class="w-full bg-white">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white py-20 lg:py-28 px-6 overflow-hidden">
      <!-- Decorative background pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-left">
            <div class="inline-block mb-6 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full">
              <span class="text-primary-400 font-semibold text-sm">PLATAFORMA MLM PROFESIONAL</span>
            </div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              {{ heroTitle }}
            </h1>
            <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              {{ heroSubtitle }}
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                class="bg-primary-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300"
                @click="router.push('/auth')"
              >
                Comenzar Ahora →
              </button>
              <button
                class="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                @click="scrollToSection('features')"
              >
                Conocer Más
              </button>
            </div>

            <!-- Trust indicators -->
            <div class="mt-12 flex flex-wrap gap-8 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>100% Seguro</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Soporte 24/7</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>Sistema Verificado</span>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center lg:justify-end">
            <div class="relative">
              <div class="absolute inset-0 bg-primary-500 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div class="relative bg-gradient-to-br from-primary-600 to-primary-800 p-8 rounded-2xl border border-primary-500/30 backdrop-blur-sm">
                <PlatformLogo size="large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 px-6 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            {{ featuresTitle }}
          </h2>
          <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {{ featuresSubtitle }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="group bg-white p-8 rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all duration-300"
          >
            <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{{ feature.icon }}</div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1">
            <div class="inline-block mb-4 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">
              BENEFICIOS EXCLUSIVOS
            </div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
              {{ benefitsTitle }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="(benefit, index) in benefits"
                :key="index"
                class="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <span class="text-lg text-gray-700">{{ benefit }}</span>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2 flex items-center justify-center">
            <div class="relative w-full max-w-md">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl blur-2xl opacity-20"></div>
              <div class="relative bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-2xl border border-gray-700">
                <PlatformLogo size="large" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-24 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Números que Hablan por Nosotros</h2>
          <p class="text-gray-400 text-lg">Resultados comprobados de nuestra comunidad</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <div class="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">{{ stat.value }}</div>
            <div class="text-sm md:text-base text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6 bg-white">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-block mb-4 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-semibold">
          COMIENZA HOY
        </div>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{{ ctaTitle }}</h2>
        <p class="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">{{ ctaSubtitle }}</p>
        <button
          class="bg-primary-500 text-white px-12 py-5 rounded-lg text-lg font-semibold hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 inline-flex items-center gap-2"
          @click="router.push('/auth')"
        >
          Únete Ahora
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-6 border-t border-gray-700">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="md:col-span-2">
            <PlatformLogo size="small" class="mb-6" />
            <p class="text-gray-400 leading-relaxed mb-6">{{ footerDescription }}</p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-white/5 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/5 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/5 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul class="space-y-3">
              <li>
                <a
                  class="text-gray-400 hover:text-primary-400 cursor-pointer transition-colors flex items-center gap-2"
                  @click="router.push('/auth')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a
                  class="text-gray-400 hover:text-primary-400 cursor-pointer transition-colors flex items-center gap-2"
                  @click="router.push('/auth')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Registrarse
                </a>
              </li>
              <li>
                <a
                  class="text-gray-400 hover:text-primary-400 cursor-pointer transition-colors flex items-center gap-2"
                  @click="scrollToSection('features')"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                  Características
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold mb-6">Contacto</h4>
            <ul class="space-y-4 text-gray-400">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>{{ contactEmail }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>{{ contactPhone }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>{{ contactAddress }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">&copy; 2026 {{ platformName }}. Todos los derechos reservados.</p>
          <div class="flex gap-6 text-sm text-gray-400">
            <a href="#" class="hover:text-primary-400 transition-colors">Términos</a>
            <a href="#" class="hover:text-primary-400 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-primary-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PlatformLogo from '@/components/shared/PlatformLogo.vue'

const router = useRouter()

const platformMode = import.meta.env.VITE_PLATFORM_MODE as 'iacelera' | 'ifedem'

const platformName = computed(() => {
  return platformMode === 'iacelera' ? 'iAcelera' : 'IFEDEM'
})

// Hero Section
const heroTitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Impulsa tu Negocio al Siguiente Nivel'
    : 'Educación de Calidad para Transformar tu Futuro'
})

const heroSubtitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Únete a la red de emprendedores más exitosa de México. Construye tu negocio con nuestro sistema probado de multinivel y alcanza tus metas financieras.'
    : 'Accede a cursos certificados, aprende de expertos de la industria y desarrolla las habilidades que necesitas para triunfar en el mundo profesional.'
})

// Features Section
const featuresTitle = computed(() => {
  return platformMode === 'iacelera' ? '¿Por qué iAcelera?' : '¿Por qué IFEDEM?'
})

const featuresSubtitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Descubre todas las ventajas de formar parte de nuestra red de emprendedores'
    : 'Conoce todo lo que tenemos para ofrecerte en tu camino educativo'
})

const features = computed(() => {
  if (platformMode === 'iacelera') {
    return [
      {
        icon: '💰',
        title: 'Comisiones Ilimitadas',
        description: 'Gana comisiones por tus ventas directas y las de tu equipo sin límites ni techos'
      },
      {
        icon: '📈',
        title: 'Sistema Multinivel',
        description: 'Construye tu red con nuestro plan de compensación binario y trinario'
      },
      {
        icon: '🎯',
        title: 'Plan de Carrera',
        description: 'Avanza desde Bronze hasta Crown Diamond con incentivos en cada nivel'
      },
      {
        icon: '🎓',
        title: 'Capacitación Continua',
        description: 'Acceso a entrenamientos, webinars y material educativo exclusivo'
      },
      {
        icon: '👥',
        title: 'Red de Apoyo',
        description: 'Comunidad activa de emprendedores listos para ayudarte a crecer'
      },
      {
        icon: '📱',
        title: 'Herramientas Digitales',
        description: 'Plataforma completa con dashboard, reportes y gestión de red'
      }
    ]
  } else {
    return [
      {
        icon: '📚',
        title: 'Cursos Certificados',
        description: 'Programas educativos con certificación reconocida en la industria'
      },
      {
        icon: '👨‍🏫',
        title: 'Expertos de la Industria',
        description: 'Aprende de profesionales con años de experiencia en sus campos'
      },
      {
        icon: '⏰',
        title: 'A tu Ritmo',
        description: 'Estudia cuando quieras, donde quieras, sin horarios fijos'
      },
      {
        icon: '💻',
        title: 'Plataforma Moderna',
        description: 'Sistema de aprendizaje intuitivo con contenido multimedia'
      },
      {
        icon: '🎓',
        title: 'Desarrollo Profesional',
        description: 'Mejora tus habilidades y aumenta tus oportunidades laborales'
      },
      {
        icon: '🌟',
        title: 'Calidad Garantizada',
        description: 'Contenido actualizado y de la más alta calidad educativa'
      }
    ]
  }
})

// Benefits Section
const benefitsTitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Todo lo que Necesitas para Triunfar'
    : 'Todo lo que Necesitas para Aprender'
})

const benefits = computed(() => {
  if (platformMode === 'iacelera') {
    return [
      'Comienza con inversión mínima y crece a tu ritmo',
      'Sistema probado con miles de afiliados exitosos',
      'Bonos y promociones exclusivas por rendimiento',
      'Productos de alta calidad con demanda comprobada',
      'Soporte técnico y administrativo 24/7',
      'Retiros semanales sin complicaciones'
    ]
  } else {
    return [
      'Catálogo amplio de cursos en diversas áreas',
      'Certificados reconocidos por la industria',
      'Material descargable y recursos adicionales',
      'Actualizaciones constantes del contenido',
      'Soporte académico cuando lo necesites',
      'Comunidad de estudiantes activa'
    ]
  }
})

// Stats Section
const stats = computed(() => {
  if (platformMode === 'iacelera') {
    return [
      { value: '10,000+', label: 'Afiliados Activos' },
      { value: '$5M+', label: 'Comisiones Pagadas' },
      { value: '8', label: 'Niveles de Rango' },
      { value: '24/7', label: 'Soporte Disponible' }
    ]
  } else {
    return [
      { value: '500+', label: 'Cursos Disponibles' },
      { value: '50,000+', label: 'Estudiantes Activos' },
      { value: '100+', label: 'Instructores Expertos' },
      { value: '4.8/5', label: 'Calificación Promedio' }
    ]
  }
})

// CTA Section
const ctaTitle = computed(() => {
  return platformMode === 'iacelera'
    ? '¿Listo para Comenzar tu Negocio?'
    : '¿Listo para Comenzar a Aprender?'
})

const ctaSubtitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Regístrate hoy y comienza a construir tu futuro financiero'
    : 'Regístrate hoy y comienza tu camino hacia el éxito profesional'
})

// Footer
const footerDescription = computed(() => {
  return platformMode === 'iacelera'
    ? 'Plataforma líder en marketing multinivel en México.'
    : 'Plataforma de educación en línea de alta calidad.'
})

const contactEmail = computed(() => {
  return platformMode === 'iacelera' ? 'contacto@iacelera.com' : 'contacto@ifedem.com'
})

const contactPhone = computed(() => '+52 123 456 7890')
const contactAddress = computed(() => 'Ciudad de México, México')

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
