<template>
  <div class="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-24 lg:py-32 px-8 min-h-[80vh] flex items-center justify-center text-center relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="flex flex-col items-center">
          <PlatformLogo size="large" class="mb-8" />
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {{ heroTitle }}
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl opacity-95 leading-relaxed">
            {{ heroSubtitle }}
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <button
              class="bg-white text-primary-500 px-8 py-4 rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
              @click="router.push('/auth')"
            >
              Comenzar Ahora
            </button>
            <button
              class="bg-white/20 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
              @click="scrollToSection('features')"
            >
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-center text-4xl md:text-5xl font-bold mb-4 text-white">
          {{ featuresTitle }}
        </h2>
        <p class="text-center text-lg md:text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          {{ featuresSubtitle }}
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center hover:-translate-y-2 hover:border-primary-500 hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl md:text-2xl font-semibold mb-4 text-white">
              {{ feature.title }}
            </h3>
            <p class="text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-24 px-8 bg-gradient-to-br from-gray-800 to-primary-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-4xl md:text-5xl font-bold mb-8 text-white">
              {{ benefitsTitle }}
            </h2>
            <div class="flex flex-col gap-4">
              <div
                v-for="(benefit, index) in benefits"
                :key="index"
                class="flex items-center gap-4 text-lg text-white p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-primary-500 transition-colors"
              >
                <span class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  ✓
                </span>
                <span>{{ benefit }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="w-full max-w-md aspect-square bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20">
              <PlatformLogo size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-24 px-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="text-center p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-5xl md:text-6xl font-bold mb-2">{{ stat.value }}</div>
            <div class="text-lg md:text-xl opacity-90">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-center">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 text-white">{{ ctaTitle }}</h2>
        <p class="text-xl text-gray-400 mb-8">{{ ctaSubtitle }}</p>
        <button
          class="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-12 py-5 rounded-xl text-xl font-semibold hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          @click="router.push('/auth')"
        >
          Únete Ahora
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black/40 backdrop-blur-sm border-t border-white/10 text-white py-16 px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <PlatformLogo size="small" class="mb-4" />
            <p class="text-gray-300 leading-relaxed">{{ footerDescription }}</p>
          </div>

          <div>
            <h4 class="text-xl font-semibold mb-4">Enlaces</h4>
            <ul class="space-y-3">
              <li>
                <a
                  class="text-gray-300 hover:text-primary-400 cursor-pointer transition-colors"
                  @click="router.push('/auth')"
                >
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a
                  class="text-gray-300 hover:text-primary-400 cursor-pointer transition-colors"
                  @click="router.push('/auth')"
                >
                  Registrarse
                </a>
              </li>
              <li>
                <a
                  class="text-gray-300 hover:text-primary-400 cursor-pointer transition-colors"
                  @click="scrollToSection('features')"
                >
                  Características
                </a>
              </li>
              <li>
                <a
                  class="text-gray-300 hover:text-primary-400 cursor-pointer transition-colors"
                  @click="router.push('/about')"
                >
                  Acerca de
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-xl font-semibold mb-4">Contacto</h4>
            <ul class="space-y-3 text-gray-300">
              <li>{{ contactEmail }}</li>
              <li>{{ contactPhone }}</li>
              <li>{{ contactAddress }}</li>
            </ul>
          </div>
        </div>

        <div class="text-center pt-8 border-t border-white/10 text-gray-400">
          <p>&copy; 2026 {{ platformName }}. Todos los derechos reservados.</p>
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
