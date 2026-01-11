<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end" @click="$emit('close')">
    <div
      class="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 h-full flex flex-col shadow-2xl animate-slide-in"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-white/10">
        <h2 class="text-2xl font-bold text-white flex items-center gap-3">
          <svg class="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Carrito
        </h2>
        <button
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          @click="$emit('close')"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="isEmpty" class="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div class="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Tu carrito está vacío</h3>
        <p class="text-gray-400 mb-8">Agrega productos para comenzar tu compra</p>
        <button
          class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all"
          @click="$emit('close')"
        >
          Continuar Comprando
        </button>
      </div>

      <!-- Cart Content -->
      <div v-else class="flex-1 flex flex-col overflow-hidden">
        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto p-4 space-y-3">
          <CartItem
            v-for="item in cartItems"
            :key="item.product.id"
            :item="item"
            @update-quantity="updateQuantity"
            @remove="removeFromCart"
          />
        </div>

        <!-- Cart Summary -->
        <div class="border-t border-white/10 bg-black/20 backdrop-blur-sm p-6 space-y-4">
          <!-- Subtotal -->
          <div class="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span class="text-white font-semibold">${{ subtotal.toFixed(2) }}</span>
          </div>

          <!-- BV -->
          <div class="flex justify-between text-sm">
            <span class="text-gray-400">Total BV</span>
            <span class="text-yellow-400 font-semibold">{{ totalBV }} BV</span>
          </div>

          <!-- CV -->
          <div v-if="totalCV > 0" class="flex justify-between text-sm">
            <span class="text-gray-400">Total CV</span>
            <span class="text-blue-400 font-semibold">{{ totalCV }} CV</span>
          </div>

          <!-- Points -->
          <div v-if="totalPoints > 0" class="flex justify-between text-sm">
            <span class="text-gray-400">Puntos</span>
            <span class="text-purple-400 font-semibold">{{ totalPoints }} pts</span>
          </div>

          <!-- Total -->
          <div class="flex justify-between pt-4 border-t border-white/10">
            <span class="text-xl font-bold text-white">Total</span>
            <span class="text-xl font-bold text-primary-400">${{ subtotal.toFixed(2) }}</span>
          </div>

          <!-- Checkout Button -->
          <button
            class="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
            @click="handleCheckout"
          >
            Proceder al Pago
          </button>

          <!-- Continue Shopping -->
          <button
            class="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
            @click="$emit('close')"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCart } from '@/shared/composables/useCart'
import CartItem from './CartItem.vue'

const emit = defineEmits<{
  'close': []
}>()

const router = useRouter()
const {
  cartItems,
  isEmpty,
  subtotal,
  totalBV,
  totalCV,
  totalPoints,
  updateQuantity,
  removeFromCart
} = useCart()

function handleCheckout() {
  emit('close')
  router.push('/checkout')
}
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
