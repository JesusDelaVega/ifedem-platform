import { ref } from 'vue'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { User } from '@/shared/types/user'

export interface AffiliateStats {
  // Ventas personales
  personalSales: number
  personalOrders: number
  personalBV: number
  personalCV: number

  // Ventas de equipo
  teamSales: number
  teamOrders: number
  teamBV: number
  teamCV: number

  // Red
  directReferrals: number
  totalDownline: number
  activeDownline: number

  // Comisiones
  totalEarnings: number
  thisMonthEarnings: number
  pendingCommissions: number
  availableBalance: number

  // Rank info
  currentRank: string
  nextRank: string | null
  rankProgress: number // % hacia siguiente rango

  // Recent activity
  recentOrders: any[]
  recentReferrals: User[]
}

export function useAffiliateStats() {
  const stats = ref<AffiliateStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Obtener todas las estadísticas del afiliado
   */
  async function fetchAffiliateStats(userId: string, platform: 'iacelera' | 'ifedem'): Promise<AffiliateStats> {
    loading.value = true
    error.value = null

    try {
      // 1. Obtener perfil de afiliado
      const profileId = `${userId}_${platform}`
      const profileDoc = await getDoc(doc(db, 'affiliateProfiles', profileId))

      let profileData: any = {}
      if (profileDoc.exists()) {
        profileData = profileDoc.data()
      }

      // 2. Obtener órdenes personales (del usuario)
      const personalOrdersQuery = query(
        collection(db, 'orders'),
        where('userId', '==', userId)
      )
      const personalOrdersSnapshot = await getDocs(personalOrdersQuery)
      const personalOrders = personalOrdersSnapshot.docs.map(d => d.data())

      const personalSales = personalOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      const personalBV = personalOrders.reduce((sum, o) => sum + (o.totalBV || 0), 0)
      const personalCV = personalOrders.reduce((sum, o) => sum + (o.totalCV || 0), 0)

      // 3. Obtener referidos directos
      const directReferralsQuery = query(
        collection(db, 'users'),
        where('sponsorId', '==', userId)
      )
      const directReferralsSnapshot = await getDocs(directReferralsQuery)
      const directReferrals = directReferralsSnapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      })) as User[]

      // 4. Obtener downline completo (recursivo - simplificado)
      const totalDownline = await getDownlineCount(userId)
      const activeDownline = directReferrals.filter(r => r.status === 'active').length

      // 5. Obtener órdenes del equipo
      const teamOrders = await getTeamOrders(directReferrals.map(r => r.id))
      const teamSales = teamOrders.reduce((sum, o) => sum + (o.total || 0), 0)
      const teamBV = teamOrders.reduce((sum, o) => sum + (o.totalBV || 0), 0)
      const teamCV = teamOrders.reduce((sum, o) => sum + (o.totalCV || 0), 0)

      // 6. Obtener comisiones
      const commissionsQuery = query(
        collection(db, 'commissions'),
        where('userId', '==', userId)
      )
      const commissionsSnapshot = await getDocs(commissionsQuery)
      const commissions = commissionsSnapshot.docs.map(d => d.data())

      const totalEarnings = commissions.reduce((sum, c) => sum + (c.amount || 0), 0)
      const pendingCommissions = commissions
        .filter(c => c.status === 'PENDING')
        .reduce((sum, c) => sum + (c.amount || 0), 0)

      // Comisiones de este mes
      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const thisMonthEarnings = commissions
        .filter(c => {
          const createdAt = c.createdAt?.toDate ? c.createdAt.toDate() : new Date(c.createdAt)
          return createdAt >= firstDayOfMonth
        })
        .reduce((sum, c) => sum + (c.amount || 0), 0)

      // 7. Obtener wallet
      const walletId = `${userId}_${platform}`
      const walletDoc = await getDoc(doc(db, 'wallets', walletId))
      const availableBalance = walletDoc.exists() ? (walletDoc.data().availableBalance || 0) : 0

      // 8. Calcular progreso de rango
      const currentRank = profileData.currentRank || (platform === 'iacelera' ? 'bronze' : 'affiliate')
      const { nextRank, rankProgress } = calculateRankProgress(
        currentRank,
        personalBV,
        teamBV,
        directReferrals.length,
        platform
      )

      // 9. Órdenes recientes
      const recentOrders = personalOrders
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
          const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
        .slice(0, 5)

      // 10. Referidos recientes
      const recentReferrals = directReferrals
        .sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })
        .slice(0, 5)

      const statsData: AffiliateStats = {
        personalSales,
        personalOrders: personalOrders.length,
        personalBV,
        personalCV,

        teamSales,
        teamOrders: teamOrders.length,
        teamBV,
        teamCV,

        directReferrals: directReferrals.length,
        totalDownline,
        activeDownline,

        totalEarnings,
        thisMonthEarnings,
        pendingCommissions,
        availableBalance,

        currentRank,
        nextRank,
        rankProgress,

        recentOrders,
        recentReferrals
      }

      stats.value = statsData
      return statsData

    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching affiliate stats:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener contador de downline (simplificado)
   */
  async function getDownlineCount(userId: string): Promise<number> {
    const directQuery = query(
      collection(db, 'users'),
      where('sponsorId', '==', userId)
    )
    const directSnapshot = await getDocs(directQuery)

    // Por ahora solo cuenta directos
    // TODO: Implementar recursivo para contar todos los niveles
    return directSnapshot.size
  }

  /**
   * Obtener órdenes del equipo
   */
  async function getTeamOrders(userIds: string[]) {
    if (userIds.length === 0) return []

    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', 'in', userIds.slice(0, 10)) // Firestore limit: 10 items in 'in' query
    )
    const ordersSnapshot = await getDocs(ordersQuery)
    return ordersSnapshot.docs.map(d => d.data())
  }

  /**
   * Calcular progreso hacia siguiente rango
   */
  function calculateRankProgress(
    currentRank: string,
    personalBV: number,
    teamBV: number,
    directCount: number,
    platform: 'iacelera' | 'ifedem'
  ): { nextRank: string | null; rankProgress: number } {

    if (platform === 'iacelera') {
      const ranks = {
        bronze: { next: 'silver', requiredBV: 500 },
        silver: { next: 'gold', requiredBV: 1500 },
        gold: { next: 'platinum', requiredBV: 5000 },
        platinum: { next: 'diamond', requiredBV: 15000 },
        diamond: { next: 'executive', requiredBV: 50000 },
        executive: { next: 'presidential', requiredBV: 150000 },
        presidential: { next: 'ambassador', requiredBV: 500000 },
        ambassador: { next: null, requiredBV: 999999999 }
      }

      const current = ranks[currentRank as keyof typeof ranks]
      if (!current || !current.next) {
        return { nextRank: null, rankProgress: 100 }
      }

      const progress = Math.min(100, (teamBV / current.requiredBV) * 100)
      return { nextRank: current.next, rankProgress: Math.round(progress) }

    } else {
      // IFEDEM
      const ranks = {
        affiliate: { next: 'manager', requiredBV: 1000 },
        manager: { next: 'director', requiredBV: 5000 },
        director: { next: 'executive', requiredBV: 25000 },
        executive: { next: null, requiredBV: 999999999 }
      }

      const current = ranks[currentRank as keyof typeof ranks]
      if (!current || !current.next) {
        return { nextRank: null, rankProgress: 100 }
      }

      const progress = Math.min(100, (teamBV / current.requiredBV) * 100)
      return { nextRank: current.next, rankProgress: Math.round(progress) }
    }
  }

  return {
    stats,
    loading,
    error,
    fetchAffiliateStats
  }
}
