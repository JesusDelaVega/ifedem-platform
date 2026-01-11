<template>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
    <div class="flex gap-4">
      <!-- Item Image -->
      <div class="w-20 h-20 flex-shrink-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden">
        <img
          :src="item.product.thumbnail || item.product.images[0] || '/placeholder-product.jpg'"
          :alt="item.product.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Item Details -->
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-semibold mb-1 truncate">{{ item.product.name }}</h4>
        <p class="text-primary-400 font-bold text-lg mb-1">${{ item.product.price.toFixed(2) }}</p>
        <p v-if="item.product.bv" class="text-yellow-400 text-sm">{{ item.product.bv }} BV</p>

        <!-- Quantity Controls -->
        <div class="flex items-center gap-2 mt-3">
          <button
            class="w-8 h-8 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            @click="decreaseQuantity"
            :disabled="item.quantity <= 1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
            </svg>
          </button>

          <input
            type="number"
            :value="item.quantity"
            @input="handleQuantityInput"
            min="1"
            class="w-14 h-8 bg-white/10 border border-white/20 rounded-lg text-center text-white focus:outline-none focus:border-primary-500 transition-colors"
          />

          <button
            class="w-8 h-8 flex items-center justify-center bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
            @click="increaseQuantity"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Item Actions -->
      <div class="flex flex-col items-end justify-between">
        <p class="text-white font-bold text-xl">${{ itemTotal.toFixed(2) }}</p>
        <button
          class="w-8 h-8 flex items-center justify-center bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
          @click="$emit('remove', item.product.id)"
          title="Eliminar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CartItem } from '@/shared/composables/useCart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update-quantity': [productId: string, quantity: number]
  'remove': [productId: string]
}>()

const itemTotal = computed(() => props.item.product.price * props.item.quantity)

function increaseQuantity() {
  emit('update-quantity', props.item.product.id, props.item.quantity + 1)
}

function decreaseQuantity() {
  if (props.item.quantity > 1) {
    emit('update-quantity', props.item.product.id, props.item.quantity - 1)
  }
}

function handleQuantityInput(event: Event) {
  const input = event.target as HTMLInputElement
  const quantity = parseInt(input.value) || 1
  emit('update-quantity', props.item.product.id, Math.max(1, quantity))
}
</script>
