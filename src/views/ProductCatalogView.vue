<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex flex-col items-center text-center gap-4">
            <PlatformLogo size="small" />
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">Catálogo de Productos</h1>
              <p class="text-gray-400 text-lg">Descubre nuestros productos y servicios</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Filters -->
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Category Filter -->
            <div>
              <label for="category" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
                Categoría
              </label>
              <select
                id="category"
                v-model="selectedCategory"
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
              >
                <option value="" class="bg-gray-800">Todas las categorías</option>
                <option value="memberships" class="bg-gray-800">Membresías</option>
                <option value="courses" class="bg-gray-800">Cursos</option>
                <option value="starter-kits" class="bg-gray-800">Kits Iniciales</option>
                <option value="digital" class="bg-gray-800">Productos Digitales</option>
              </select>
            </div>

            <!-- Sort Filter -->
            <div>
              <label for="sort" class="block text-white font-semibold mb-2 text-sm uppercase tracking-wider">
                Ordenar por
              </label>
              <select
                id="sort"
                v-model="sortBy"
                class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
              >
                <option value="newest" class="bg-gray-800">Más recientes</option>
                <option value="price-asc" class="bg-gray-800">Precio: Menor a Mayor</option>
                <option value="price-desc" class="bg-gray-800">Precio: Mayor a Menor</option>
                <option value="bv-desc" class="bg-gray-800">BV: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Product List -->
        <ProductList
          :products="filteredProducts"
          :loading="productStore.loading"
          :error="productStore.error"
          @added-to-cart="handleAddedToCart"
        />
      </div>
    </div>

    <!-- Cart FAB Button -->
    <button
      class="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
      :class="{ 'animate-pulse': cartItemCount > 0 }"
      @click="toggleCart"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
      <span
        v-if="cartItemCount > 0"
        class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
      >
        {{ cartItemCount }}
      </span>
    </button>

    <!-- Cart Sidebar -->
    <CartSidebar v-if="cartOpen" @close="closeCart" />

    <!-- Success Notification -->
    <Transition name="fade">
      <div
        v-if="showNotification"
        class="fixed top-6 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span class="font-semibold">Producto agregado al carrito</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { useCart } from '@/shared/composables/useCart'
import ProductList from '@/components/products/ProductList.vue'
import CartSidebar from '@/components/cart/CartSidebar.vue'
import PlatformLogo from '@/components/shared/PlatformLogo.vue'
import type { Product } from '@/shared/types/product'

const productStore = useProductStore()
const { itemCount: cartItemCount, cartOpen, toggleCart, closeCart } = useCart()

const selectedCategory = ref('')
const sortBy = ref('newest')
const showNotification = ref(false)

const filteredProducts = computed(() => {
  let products = [...productStore.activePlatformProducts]

  // Filter by category
  if (selectedCategory.value) {
    products = products.filter((p) =>
      p.categories.includes(selectedCategory.value)
    )
  }

  // Sort
  switch (sortBy.value) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      products.sort((a, b) => b.price - a.price)
      break
    case 'bv-desc':
      products.sort((a, b) => b.bv - a.bv)
      break
    case 'newest':
    default:
      products.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  return products
})

function handleAddedToCart(product: Product) {
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

onMounted(async () => {
  await productStore.fetchProducts({
    status: 'active'
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
