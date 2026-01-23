import { ref } from 'vue'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  type Timestamp
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Order, OrderItem, Address, OrderStatus } from '@/shared/types/product'
import type { CartItem } from './useCart'
import { CommissionCalculator } from '@/shared/services/commissionCalculator'

export function useOrders() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function createOrder(
    userId: string,
    cartItems: CartItem[],
    shippingAddress: Address,
    billingAddress: Address,
    paymentMethod: string
  ): Promise<Order | null> {
    try {
      loading.value = true
      error.value = null

      // Generate order number
      const orderNumber = generateOrderNumber()

      // Calculate totals
      const items: OrderItem[] = cartItems.map((item) => ({
        productId: item.product.id,
        sku: item.product.sku,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        bv: item.product.bv,
        cv: item.product.cv || 0,
        points: item.product.points || 0,
        total: item.product.price * item.quantity
      }))

      const subtotal = items.reduce((sum, item) => sum + item.total, 0)
      const totalBV = items.reduce((sum, item) => sum + item.bv * item.quantity, 0)
      const totalCV = items.reduce((sum, item) => sum + item.cv * item.quantity, 0)
      const totalPoints = items.reduce((sum, item) => sum + item.points * item.quantity, 0)

      // Calculate tax and shipping (simplified)
      const tax = subtotal * 0.16 // 16% IVA Mexico
      const shipping = 0 // Free shipping for now

      const total = subtotal + tax + shipping

      // Create order object
      const orderData: Omit<Order, 'id'> = {
        orderNumber,
        userId,
        customerId: userId,
        items,
        subtotal,
        tax,
        shipping,
        discount: 0,
        total,
        currency: 'USD',
        totalBV,
        totalCV,
        totalPoints,
        paymentMethod,
        paymentStatus: 'pending',
        shippingAddress,
        billingAddress,
        status: 'pending',
        statusHistory: [
          {
            status: 'pending',
            timestamp: new Date(),
            note: 'Orden creada'
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Save to Firestore
      const orderRef = doc(collection(db, 'orders'))
      const orderId = orderRef.id

      // Add platform to order data
      const userDoc = await getDoc(doc(db, 'users', userId))
      const platform = userDoc.exists() ? (userDoc.data().primaryPlatform || 'ifedem') : 'ifedem'

      await setDoc(orderRef, {
        ...orderData,
        platform, // Add platform field
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })

      // Process commissions asynchronously (non-blocking)
      console.log('💰 Processing commissions for order:', orderId)
      CommissionCalculator.processOrderCommissions(orderId)
        .then((commissions) => {
          console.log(`✅ ${commissions.length} commissions generated for order ${orderNumber}`)
        })
        .catch((err) => {
          console.error('❌ Error processing commissions:', err)
          // Don't fail the order creation if commissions fail
        })

      // Return created order
      return {
        ...orderData,
        id: orderId,
        platform
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Error creating order:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchUserOrders(userId: string): Promise<Order[]> {
    try {
      loading.value = true
      error.value = null

      const ordersRef = collection(db, 'orders')
      const q = query(ordersRef, where('userId', '==', userId), orderBy('createdAt', 'desc'))

      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
          updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
          statusHistory: data.statusHistory?.map((h: any) => ({
            ...h,
            timestamp: h.timestamp?.toDate?.() || h.timestamp
          }))
        } as Order
      })
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching orders:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchOrderById(orderId: string): Promise<Order | null> {
    try {
      loading.value = true
      error.value = null

      const orderDoc = await getDoc(doc(db, 'orders', orderId))

      if (orderDoc.exists()) {
        const data = orderDoc.data()
        return {
          ...data,
          id: orderDoc.id,
          createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
          updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
          statusHistory: data.statusHistory?.map((h: any) => ({
            ...h,
            timestamp: h.timestamp?.toDate?.() || h.timestamp
          }))
        } as Order
      }

      return null
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching order:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateOrderStatus(
    orderId: string,
    status: OrderStatus,
    note?: string
  ): Promise<boolean> {
    try {
      loading.value = true
      error.value = null

      const orderRef = doc(db, 'orders', orderId)
      const orderDoc = await getDoc(orderRef)

      if (!orderDoc.exists()) {
        throw new Error('Orden no encontrada')
      }

      const currentOrder = orderDoc.data() as Order
      const statusHistory = [
        ...(currentOrder.statusHistory || []),
        {
          status,
          timestamp: new Date(),
          note
        }
      ]

      await setDoc(
        orderRef,
        {
          status,
          statusHistory,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      )

      return true
    } catch (err: any) {
      error.value = err.message
      console.error('Error updating order status:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  function generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-8)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')
    return `ORD-${timestamp}-${random}`
  }

  return {
    loading,
    error,
    createOrder,
    fetchUserOrders,
    fetchOrderById,
    updateOrderStatus
  }
}
