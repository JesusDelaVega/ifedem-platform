import { ref, computed } from 'vue'
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Commission, CommissionStatus } from '@/shared/types/commission'
import { CommissionCalculator } from '@/shared/services/commissionCalculator'

export function useCommissions() {
  const commissions = ref<Commission[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed totals
  const totalPending = computed(() => {
    return commissions.value
      .filter(c => c.status === 'PENDING')
      .reduce((sum, c) => sum + c.amount, 0)
  })

  const totalApproved = computed(() => {
    return commissions.value
      .filter(c => c.status === 'APPROVED')
      .reduce((sum, c) => sum + c.amount, 0)
  })

  const totalPaid = computed(() => {
    return commissions.value
      .filter(c => c.status === 'PAID')
      .reduce((sum, c) => sum + c.amount, 0)
  })

  const totalEarned = computed(() => {
    return commissions.value.reduce((sum, c) => sum + c.amount, 0)
  })

  // Comisiones por tipo
  const byType = computed(() => {
    const types: Record<string, number> = {}
    commissions.value.forEach(c => {
      const type = String(c.type)
      types[type] = (types[type] || 0) + c.amount
    })
    return types
  })

  /**
   * Obtener comisiones de un usuario
   */
  async function fetchUserCommissions(userId: string, platform?: 'iacelera' | 'ifedem') {
    loading.value = true
    error.value = null

    try {
      const commissionsRef = collection(db, 'commissions')
      let q = query(
        commissionsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )

      if (platform) {
        q = query(
          commissionsRef,
          where('userId', '==', userId),
          where('platform', '==', platform),
          orderBy('createdAt', 'desc')
        )
      }

      const snapshot = await getDocs(q)
      commissions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        calculatedAt: doc.data().calculatedAt?.toDate() || new Date(),
        approvedAt: doc.data().approvedAt?.toDate(),
        paidAt: doc.data().paidAt?.toDate(),
        periodStart: doc.data().periodStart?.toDate() || new Date(),
        periodEnd: doc.data().periodEnd?.toDate() || new Date()
      })) as Commission[]

      return commissions.value
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching commissions:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener comisiones recientes
   */
  async function fetchRecentCommissions(userId: string, limitCount = 10) {
    loading.value = true
    error.value = null

    try {
      const commissionsRef = collection(db, 'commissions')
      const q = query(
        commissionsRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )

      const snapshot = await getDocs(q)
      commissions.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        calculatedAt: doc.data().calculatedAt?.toDate() || new Date(),
        approvedAt: doc.data().approvedAt?.toDate(),
        paidAt: doc.data().paidAt?.toDate(),
        periodStart: doc.data().periodStart?.toDate() || new Date(),
        periodEnd: doc.data().periodEnd?.toDate() || new Date()
      })) as Commission[]

      return commissions.value
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching recent commissions:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Procesar comisiones de una orden
   */
  async function processOrderCommissions(orderId: string) {
    loading.value = true
    error.value = null

    try {
      console.log('🔄 Processing commissions for order:', orderId)
      const generatedCommissions = await CommissionCalculator.processOrderCommissions(orderId)
      console.log('✅ Commissions processed:', generatedCommissions.length)
      return generatedCommissions
    } catch (err: any) {
      error.value = err.message
      console.error('Error processing order commissions:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener wallet del usuario
   */
  async function fetchUserWallet(userId: string, platform: 'iacelera' | 'ifedem') {
    const walletId = `${userId}_${platform}`
    const walletDoc = await getDoc(doc(db, 'wallets', walletId))

    if (walletDoc.exists()) {
      return {
        ...walletDoc.data(),
        lastUpdated: walletDoc.data().lastUpdated?.toDate() || new Date()
      }
    }

    return null
  }

  return {
    commissions,
    loading,
    error,

    // Computed
    totalPending,
    totalApproved,
    totalPaid,
    totalEarned,
    byType,

    // Methods
    fetchUserCommissions,
    fetchRecentCommissions,
    processOrderCommissions,
    fetchUserWallet
  }
}
