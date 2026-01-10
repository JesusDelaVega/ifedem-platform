<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-600 rounded-full filter blur-3xl"></div>
    </div>

    <div class="relative z-10">
      <!-- Header -->
      <header class="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center gap-4">
            <button
              class="text-primary-400 hover:text-primary-300 flex items-center gap-2 transition-colors"
              @click="router.back()"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span class="font-semibold">Volver</span>
            </button>
            <h1 class="text-2xl sm:text-3xl font-bold text-white">Checkout</h1>
          </div>
        </div>
      </header>

      <!-- Empty Cart State -->
      <div v-if="isEmpty" class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
          <div class="text-6xl mb-4">🛒</div>
          <h2 class="text-2xl font-bold text-white mb-4">Tu carrito está vacío</h2>
          <p class="text-gray-400 mb-8">Agrega productos para continuar con tu compra</p>
          <button
            class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            @click="router.push('/products')"
          >
            Ver Productos
          </button>
        </div>
      </div>

      <!-- Checkout Content -->
      <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column - Forms -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Shipping Address -->
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div class="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                Dirección de Envío
              </h2>

              <div class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="firstName" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Nombre</label>
                    <input
                      id="firstName"
                      v-model="shippingAddress.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label for="lastName" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Apellido</label>
                    <input
                      id="lastName"
                      v-model="shippingAddress.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label for="address1" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Dirección</label>
                  <input
                    id="address1"
                    v-model="shippingAddress.address1"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label for="address2" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Dirección 2 (Opcional)</label>
                  <input
                    id="address2"
                    v-model="shippingAddress.address2"
                    type="text"
                    class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="city" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Ciudad</label>
                    <input
                      id="city"
                      v-model="shippingAddress.city"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label for="state" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Estado</label>
                    <input
                      id="state"
                      v-model="shippingAddress.state"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="postalCode" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Código Postal</label>
                    <input
                      id="postalCode"
                      v-model="shippingAddress.postalCode"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label for="country" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">País</label>
                    <input
                      id="country"
                      v-model="shippingAddress.country"
                      type="text"
                      required
                      class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label for="phone" class="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">Teléfono</label>
                  <input
                    id="phone"
                    v-model="shippingAddress.phone"
                    type="tel"
                    class="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                </div>
                Método de Pago
              </h2>

              <div class="space-y-3">
                <label class="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl cursor-pointer hover:bg-white/15 transition-all" :class="{ 'border-primary-500 bg-primary-500/20': paymentMethod === 'transfer' }">
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    v-model="paymentMethod"
                    class="w-5 h-5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="text-white font-semibold flex-1">Transferencia Bancaria</span>
                </label>

                <label class="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl cursor-pointer hover:bg-white/15 transition-all" :class="{ 'border-primary-500 bg-primary-500/20': paymentMethod === 'cash' }">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    v-model="paymentMethod"
                    class="w-5 h-5 text-primary-500 focus:ring-primary-500"
                  />
                  <span class="text-white font-semibold flex-1">Efectivo</span>
                </label>

                <label class="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl opacity-50 cursor-not-allowed">
                  <input
                    type="radio"
                    name="payment"
                    value="stripe"
                    disabled
                    class="w-5 h-5"
                  />
                  <span class="text-gray-400 font-semibold flex-1">Tarjeta de Crédito/Débito (Próximamente)</span>
                </label>
              </div>

              <div v-if="paymentMethod === 'transfer'" class="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                <p class="text-yellow-400 font-semibold mb-2">Información de transferencia:</p>
                <div class="space-y-1 text-gray-300 text-sm">
                  <p><span class="font-semibold">Banco:</span> BBVA</p>
                  <p><span class="font-semibold">Cuenta:</span> 1234567890</p>
                  <p><span class="font-semibold">CLABE:</span> 012345678901234567</p>
                  <p><span class="font-semibold">Referencia:</span> Tu código de afiliado</p>
                  <p class="text-xs text-yellow-400 mt-3">Una vez realizada la transferencia, envía tu comprobante al administrador.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8 sticky top-8">
              <h2 class="text-2xl font-bold text-white mb-6">Resumen del Pedido</h2>

              <!-- Order Items -->
              <div class="space-y-3 mb-6 max-h-96 overflow-y-auto">
                <div v-for="item in cartItems" :key="item.product.id" class="flex gap-3 p-3 bg-white/5 rounded-xl">
                  <div class="w-16 h-16 flex-shrink-0 bg-white/10 rounded-lg overflow-hidden">
                    <img
                      :src="item.product.thumbnail || item.product.images[0] || '/placeholder-product.jpg'"
                      :alt="item.product.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-white font-semibold text-sm mb-1 truncate">{{ item.product.name }}</h4>
                    <p class="text-gray-400 text-xs">Cantidad: {{ item.quantity }}</p>
                  </div>
                  <div class="text-primary-400 font-bold text-sm">
                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>

              <!-- Totals -->
              <div class="space-y-3 pt-4 border-t border-white/10">
                <div class="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span class="text-white font-semibold">${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>IVA (16%)</span>
                  <span class="text-white font-semibold">${{ tax.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-gray-400">
                  <span>Envío</span>
                  <span class="text-green-400 font-semibold">Gratis</span>
                </div>
                <div class="flex justify-between text-gray-400 text-sm">
                  <span>Total BV</span>
                  <span class="text-yellow-400 font-semibold">{{ totalBV }} BV</span>
                </div>
                <div class="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
                  <span class="text-white">Total</span>
                  <span class="text-primary-400">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Place Order Button -->
              <button
                class="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handlePlaceOrder"
                :disabled="!canPlaceOrder || ordersService.loading.value"
              >
                {{ ordersService.loading.value ? 'Procesando...' : 'Realizar Pedido' }}
              </button>

              <div v-if="ordersService.error.value" class="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                {{ ordersService.error.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/shared/composables/useCart'
import { useOrders } from '@/shared/composables/useOrders'
import { useUserStore } from '@/stores/user'
import type { Address } from '@/shared/types/product'

const router = useRouter()
const { cartItems, isEmpty, subtotal, totalBV, clearCart } = useCart()
const ordersService = useOrders()
const userStore = useUserStore()

const shippingAddress = ref<Address>({
  firstName: userStore.user?.firstName || '',
  lastName: userStore.user?.lastName || '',
  company: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'México',
  phone: userStore.user?.phone || ''
})

const billingAddress = ref<Address>({ ...shippingAddress.value })
const paymentMethod = ref('transfer')

const tax = computed(() => subtotal.value * 0.16)
const shipping = computed(() => 0)
const total = computed(() => subtotal.value + tax.value + shipping.value)

const canPlaceOrder = computed(() => {
  return (
    !isEmpty.value &&
    shippingAddress.value.firstName &&
    shippingAddress.value.lastName &&
    shippingAddress.value.address1 &&
    shippingAddress.value.city &&
    shippingAddress.value.state &&
    shippingAddress.value.postalCode &&
    shippingAddress.value.country &&
    paymentMethod.value
  )
})

async function handlePlaceOrder() {
  if (!userStore.user) {
    alert('Debes iniciar sesión para realizar un pedido')
    return
  }

  if (!canPlaceOrder.value) {
    alert('Por favor completa todos los campos requeridos')
    return
  }

  const order = await ordersService.createOrder(
    userStore.user.id,
    cartItems.value,
    shippingAddress.value,
    billingAddress.value,
    paymentMethod.value
  )

  if (order) {
    clearCart()
    alert(`¡Pedido realizado exitosamente!\n\nNúmero de orden: ${order.orderNumber}\n\nTotal: $${order.total.toFixed(2)}\n\nRecibirás un correo con los detalles de tu pedido.`)
    router.push('/dashboard')
  }
}
</script>
