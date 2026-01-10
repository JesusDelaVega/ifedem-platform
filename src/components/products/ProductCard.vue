<template>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:scale-105 hover:border-primary-500 transition-all duration-300 group">
    <!-- Product Image -->
    <div class="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      <img
        :src="product.thumbnail || product.images[0] || '/placeholder-product.jpg'"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <!-- Status Badge -->
      <div v-if="product.status !== 'active'" class="absolute top-3 right-3 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
        {{ statusLabel }}
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-6">
      <!-- Product Name -->
      <h3 class="text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
        {{ product.name }}
      </h3>

      <!-- Product Description -->
      <p v-if="product.shortDescription" class="text-gray-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {{ product.shortDescription }}
      </p>

      <!-- Product Meta -->
      <div class="flex gap-2 mb-4">
        <span class="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full border border-primary-500/30">
          {{ typeLabel }}
        </span>
        <span v-if="product.bv" class="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full border border-yellow-500/30">
          {{ product.bv }} BV
        </span>
      </div>

      <!-- Product Pricing -->
      <div class="flex items-baseline gap-2 mb-6">
        <span class="text-3xl font-bold text-primary-400">
          ${{ product.price.toFixed(2) }}
        </span>
        <span v-if="product.compareAtPrice" class="text-lg text-gray-500 line-through">
          ${{ product.compareAtPrice.toFixed(2) }}
        </span>
      </div>

      <!-- Product Actions -->
      <div class="flex flex-col gap-2">
        <button
          v-if="showAddToCart && product.status === 'active'"
          class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          @click="handleAddToCart"
          :disabled="!canPurchase"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Agregar al Carrito
        </button>

        <button
          v-if="showDetails"
          class="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
          @click="$emit('view-details', product)"
        >
          Ver Detalles
        </button>

        <button
          v-if="showEdit"
          class="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
          @click="$emit('edit', product)"
        >
          Editar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCart } from '@/shared/composables/useCart'
import { useUserStore } from '@/stores/user'
import type { Product } from '@/shared/types/product'

interface Props {
  product: Product
  showAddToCart?: boolean
  showDetails?: boolean
  showEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showAddToCart: true,
  showDetails: true,
  showEdit: false
})

const emit = defineEmits<{
  'view-details': [product: Product]
  'edit': [product: Product]
  'added-to-cart': [product: Product]
}>()

const { addToCart } = useCart()
const userStore = useUserStore()

const statusLabel = computed(() => {
  const labels: Record<string, string> = {
    draft: 'Borrador',
    inactive: 'Inactivo',
    out_of_stock: 'Agotado'
  }
  return labels[props.product.status] || props.product.status
})

const typeLabel = computed(() => {
  const labels: Record<string, string> = {
    physical: 'Físico',
    digital: 'Digital',
    membership: 'Membresía',
    course: 'Curso',
    bundle: 'Paquete',
    starter_kit: 'Kit Inicial'
  }
  return labels[props.product.type] || props.product.type
})

const canPurchase = computed(() => {
  if (!props.product.requiresQualification) return true

  const currentRank = userStore.affiliateProfile?.currentRank
  if (!currentRank || !props.product.minimumRank) return true

  // TODO: Implement rank comparison logic
  return true
})

function handleAddToCart() {
  addToCart(props.product)
  emit('added-to-cart', props.product)
}
</script>
