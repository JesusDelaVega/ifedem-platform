<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <!-- Hero Section -->
      <section class="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <PlatformLogo size="large" class="mb-8" />
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {{ aboutTitle }}
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            {{ aboutSubtitle }}
          </p>
        </div>
      </section>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <!-- Mission & Vision -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-white mb-4">Nuestra Misión</h2>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ mission }}
            </p>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-white mb-4">Nuestra Visión</h2>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ vision }}
            </p>
          </div>
        </div>

        <!-- Values -->
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 mb-16">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">Nuestros Valores</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(value, index) in values" :key="index" class="text-center">
              <div class="text-5xl mb-4">{{ value.icon }}</div>
              <h3 class="text-xl font-bold text-white mb-2">{{ value.title }}</h3>
              <p class="text-gray-400">{{ value.description }}</p>
            </div>
          </div>
        </div>

        <!-- History/Story -->
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-12 mb-16">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-white mb-6 text-center">Nuestra Historia</h2>
            <div class="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p v-for="(paragraph, index) in history" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div v-for="(stat, index) in stats" :key="index" class="bg-gradient-to-br from-primary-500/20 to-primary-600/20 backdrop-blur-sm border border-primary-500/30 rounded-2xl p-6 text-center">
            <div class="text-4xl font-bold text-primary-400 mb-2">{{ stat.value }}</div>
            <div class="text-gray-400 text-sm uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-12 text-center">
          <h2 class="text-3xl font-bold text-white mb-4">¿Listo para comenzar?</h2>
          <p class="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            {{ ctaText }}
          </p>
          <button
            class="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            @click="router.push('/auth')"
          >
            Únete Ahora
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import PlatformLogo from '@/components/shared/PlatformLogo.vue'

const router = useRouter()
const platformMode = import.meta.env.VITE_PLATFORM_MODE as 'iacelera' | 'ifedem'

const aboutTitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Acerca de iAcelera'
    : 'Acerca de IFEDEM'
})

const aboutSubtitle = computed(() => {
  return platformMode === 'iacelera'
    ? 'Transformando vidas a través del emprendimiento y el marketing multinivel'
    : 'Democratizando la educación de calidad para todos'
})

const mission = computed(() => {
  return platformMode === 'iacelera'
    ? 'Empoderar a emprendedores en México proporcionándoles las herramientas, conocimientos y red de apoyo necesarios para construir negocios exitosos a través del marketing multinivel. Creemos en el potencial de cada persona para alcanzar la libertad financiera.'
    : 'Proporcionar educación de alta calidad y accesible para todos, eliminando barreras y democratizando el acceso al conocimiento. Creemos que la educación es el camino hacia un futuro mejor y más equitativo.'
})

const vision = computed(() => {
  return platformMode === 'iacelera'
    ? 'Ser la plataforma líder de marketing multinivel en México, reconocida por impulsar el crecimiento de miles de emprendedores y crear una comunidad próspera de personas que transforman sus vidas y las de sus familias.'
    : 'Convertirnos en la plataforma educativa más importante de América Latina, siendo reconocidos por la excelencia de nuestros cursos, la calidad de nuestros instructores y el impacto positivo en la vida de nuestros estudiantes.'
})

const values = computed(() => {
  if (platformMode === 'iacelera') {
    return [
      { icon: '🤝', title: 'Integridad', description: 'Actuamos con honestidad y transparencia' },
      { icon: '📈', title: 'Crecimiento', description: 'Impulsamos el desarrollo continuo' },
      { icon: '👥', title: 'Comunidad', description: 'Construimos juntos el éxito' },
      { icon: '💪', title: 'Perseverancia', description: 'No nos rendimos ante los desafíos' }
    ]
  } else {
    return [
      { icon: '🎓', title: 'Excelencia', description: 'Buscamos la calidad en todo' },
      { icon: '🌟', title: 'Innovación', description: 'Adoptamos nuevas metodologías' },
      { icon: '❤️', title: 'Inclusión', description: 'Educación para todos' },
      { icon: '🚀', title: 'Impacto', description: 'Transformamos vidas' }
    ]
  }
})

const history = computed(() => {
  if (platformMode === 'iacelera') {
    return [
      'iAcelera nació de la visión de crear una plataforma que democratizara las oportunidades de negocio en México. Fundada por emprendedores exitosos en el mundo del marketing multinivel, nuestra misión desde el primer día ha sido proporcionar a cada persona las herramientas para alcanzar sus metas financieras.',
      'A lo largo de los años, hemos construido una comunidad de miles de afiliados activos, desarrollado un sistema de compensación justo y generoso, y creado programas de capacitación que han transformado vidas. Nuestro compromiso es continuar innovando y creciendo junto a nuestra comunidad.',
      'Hoy, iAcelera es más que una plataforma de MLM: somos una familia de emprendedores que se apoyan mutuamente, comparten conocimientos y celebran juntos cada victoria. El éxito de nuestros afiliados es nuestro mayor logro.'
    ]
  } else {
    return [
      'IFEDEM fue fundada con la convicción de que la educación de calidad debe ser accesible para todos, sin importar su ubicación geográfica o situación económica. Comenzamos con un pequeño catálogo de cursos y una gran visión de transformar la educación en línea.',
      'Con el paso del tiempo, hemos crecido hasta convertirnos en una plataforma educativa reconocida, con cientos de cursos y miles de estudiantes satisfechos. Nuestros instructores son expertos en sus campos, comprometidos con la excelencia educativa y el éxito de cada estudiante.',
      'Hoy, IFEDEM continúa expandiéndose, incorporando nuevas tecnologías educativas, metodologías innovadoras y contenidos actualizados. Nuestro compromiso es seguir siendo líderes en educación en línea de calidad.'
    ]
  }
})

const stats = computed(() => {
  if (platformMode === 'iacelera') {
    return [
      { value: '10,000+', label: 'Afiliados Activos' },
      { value: '$5M+', label: 'Comisiones Pagadas' },
      { value: '8', label: 'Niveles de Rango' },
      { value: '100%', label: 'Satisfacción' }
    ]
  } else {
    return [
      { value: '500+', label: 'Cursos' },
      { value: '50,000+', label: 'Estudiantes' },
      { value: '100+', label: 'Instructores' },
      { value: '4.8/5', label: 'Calificación' }
    ]
  }
})

const ctaText = computed(() => {
  return platformMode === 'iacelera'
    ? 'Únete a nuestra comunidad de emprendedores exitosos y comienza a construir el negocio de tus sueños hoy mismo.'
    : 'Únete a miles de estudiantes que ya están transformando sus vidas a través de la educación. Comienza tu camino hacia el éxito hoy.'
})
</script>
