<template>
  <div class="product-list">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mb-4"></div>
      <p class="text-white text-lg">Cargando productos...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <div class="text-6xl mb-4">⚠️</div>
      <p class="text-red-400 text-lg font-semibold">Error: {{ error }}</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="displayProducts.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">📦</div>
      <h3 class="text-2xl font-bold text-white mb-2">No hay productos disponibles</h3>
      <p class="text-gray-400">Vuelve más tarde para ver nuevos productos</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in displayProducts"
        :key="product.id"
        :product="product"
        :show-add-to-cart="showAddToCart"
        :show-details="showDetails"
        :show-edit="showEdit"
        @view-details="handleViewDetails"
        @edit="handleEdit"
        @added-to-cart="handleAddedToCart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '@/shared/types/product'

interface Props {
  products: Product[]
  loading?: boolean
  error?: string | null
  showAddToCart?: boolean
  showDetails?: boolean
  showEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: null,
  showAddToCart: true,
  showDetails: true,
  showEdit: false
})

const emit = defineEmits<{
  'view-details': [product: Product]
  'edit': [product: Product]
  'added-to-cart': [product: Product]
}>()

const displayProducts = computed(() => props.products)

function handleViewDetails(product: Product) {
  emit('view-details', product)
}

function handleEdit(product: Product) {
  emit('edit', product)
}

function handleAddedToCart(product: Product) {
  emit('added-to-cart', product)
}
</script>
