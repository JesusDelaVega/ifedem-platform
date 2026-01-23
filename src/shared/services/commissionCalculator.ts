import { doc, getDoc, collection, query, where, getDocs, writeBatch, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { Commission, CommissionType, CommissionStatus, Rank } from '@/shared/types/commission'
import type { User } from '@/shared/types/user'
import type { Order } from '@/shared/types/product'

/**
 * Configuración de comisiones por plataforma
 */
const COMMISSION_CONFIG = {
  iacelera: {
    // Plan Binario de iAcelera
    directSponsor: 0.10, // 10% de CV
    binaryMatch: 0.08, // 8% del volumen menor
    fastStart: 0.05, // 5% adicional en primeros 30 días

    // Comisiones por nivel (unilevel sobre equipo)
    levelCommissions: {
      1: 0.05, // 5% nivel 1
      2: 0.03, // 3% nivel 2
      3: 0.02, // 2% nivel 3
      4: 0.01, // 1% nivel 4
      5: 0.01, // 1% nivel 5
    },

    // Bonos por rango
    rankBonuses: {
      bronze: 0,
      silver: 50,
      gold: 100,
      platinum: 250,
      diamond: 500,
      executive: 1000,
      presidential: 2500,
      ambassador: 5000
    }
  },

  ifedem: {
    // Plan Unilevel de IFEDEM
    directSponsor: 0.12, // 12% de CV

    // Comisiones por nivel
    levelCommissions: {
      1: 0.08, // 8% nivel 1
      2: 0.05, // 5% nivel 2
      3: 0.03, // 3% nivel 3
      4: 0.02, // 2% nivel 4
      5: 0.02, // 2% nivel 5
      6: 0.01, // 1% nivel 6
      7: 0.01, // 1% nivel 7
    },

    // Bonos por rango
    rankBonuses: {
      affiliate: 0,
      manager: 75,
      director: 200,
      executive: 500
    }
  }
}

/**
 * Servicio principal de cálculo de comisiones
 */
export class CommissionCalculator {

  /**
   * Procesa todas las comisiones de una orden
   */
  static async processOrderCommissions(orderId: string): Promise<Commission[]> {
    console.log('📊 Processing commissions for order:', orderId)

    // 1. Obtener la orden
    const orderDoc = await getDoc(doc(db, 'orders', orderId))
    if (!orderDoc.exists()) {
      throw new Error('Order not found')
    }

    const order = { id: orderDoc.id, ...orderDoc.data() } as Order
    const platform = order.platform || 'ifedem'

    // 2. Obtener el usuario que hizo la compra
    const buyerDoc = await getDoc(doc(db, 'users', order.userId))
    if (!buyerDoc.exists()) {
      throw new Error('Buyer not found')
    }

    const buyer = { id: buyerDoc.id, ...buyerDoc.data() } as User

    // 3. Array para almacenar todas las comisiones
    const commissions: Commission[] = []

    // 4. Calcular comisión directa del patrocinador
    if (buyer.sponsorId) {
      const directCommission = await this.calculateDirectSponsorCommission(
        order,
        buyer,
        platform
      )
      if (directCommission) {
        commissions.push(directCommission)
      }
    }

    // 5. Calcular comisiones por niveles (unilevel)
    const levelCommissions = await this.calculateLevelCommissions(
      order,
      buyer,
      platform
    )
    commissions.push(...levelCommissions)

    // 6. Para iAcelera: calcular comisión binaria
    if (platform === 'iacelera' && buyer.sponsorId) {
      const binaryCommissions = await this.calculateBinaryCommissions(
        order,
        buyer
      )
      commissions.push(...binaryCommissions)
    }

    // 7. Fast Start Bonus (primeros 30 días)
    if (buyer.sponsorId) {
      const fastStartCommission = await this.calculateFastStartBonus(
        order,
        buyer,
        platform
      )
      if (fastStartCommission) {
        commissions.push(fastStartCommission)
      }
    }

    // 8. Guardar todas las comisiones en Firestore
    await this.saveCommissions(commissions)

    // 9. Actualizar wallets de los usuarios
    await this.updateWallets(commissions)

    console.log(`✅ Generated ${commissions.length} commissions for order ${order.orderNumber}`)

    return commissions
  }

  /**
   * Calcula comisión directa del patrocinador
   */
  private static async calculateDirectSponsorCommission(
    order: Order,
    buyer: User,
    platform: 'iacelera' | 'ifedem'
  ): Promise<Commission | null> {
    if (!buyer.sponsorId) return null

    const config = COMMISSION_CONFIG[platform]
    const sponsorDoc = await getDoc(doc(db, 'users', buyer.sponsorId))

    if (!sponsorDoc.exists()) return null

    const sponsor = { id: sponsorDoc.id, ...sponsorDoc.data() } as User

    // Calcular monto basado en CV (Commissionable Value)
    const baseAmount = order.totalCV || order.subtotal
    const percentage = config.directSponsor
    const amount = baseAmount * percentage

    return {
      id: '', // Se asignará al guardar
      userId: sponsor.id,

      orderId: order.id,
      orderNumber: order.orderNumber,
      orderTotal: order.total,
      orderBV: order.totalBV,
      orderCV: order.totalCV || order.subtotal,

      generatedBy: buyer.id,
      generatedByName: `${buyer.firstName} ${buyer.lastName}`,

      type: 'DIRECT_SALE' as CommissionType,
      amount,
      percentage,
      calculatedFrom: baseAmount,

      level: 1,

      status: 'PENDING' as CommissionStatus,
      platform,

      description: `Comisión directa por venta de ${buyer.firstName} ${buyer.lastName}`,

      userRankAtTime: sponsor.currentRank,
      generatorRankAtTime: buyer.currentRank,

      createdAt: new Date(),
      calculatedAt: new Date(),
      periodStart: new Date(),
      periodEnd: new Date()
    } as Commission
  }

  /**
   * Calcula comisiones por niveles (upline)
   */
  private static async calculateLevelCommissions(
    order: Order,
    buyer: User,
    platform: 'iacelera' | 'ifedem'
  ): Promise<Commission[]> {
    const commissions: Commission[] = []
    const config = COMMISSION_CONFIG[platform]
    const baseAmount = order.totalCV || order.subtotal

    let currentUser = buyer
    let level = 1

    // Recorrer el upline hasta nivel 5 o 7 según la plataforma
    const maxLevels = Object.keys(config.levelCommissions).length

    while (level <= maxLevels && currentUser.sponsorId) {
      const sponsorDoc = await getDoc(doc(db, 'users', currentUser.sponsorId))

      if (!sponsorDoc.exists()) break

      const sponsor = { id: sponsorDoc.id, ...sponsorDoc.data() } as User

      // Obtener porcentaje para este nivel
      const percentage = config.levelCommissions[level as keyof typeof config.levelCommissions]

      if (percentage && percentage > 0) {
        const amount = baseAmount * percentage

        commissions.push({
          id: '',
          userId: sponsor.id,

          orderId: order.id,
          orderNumber: order.orderNumber,
          orderTotal: order.total,
          orderBV: order.totalBV,
          orderCV: order.totalCV || order.subtotal,

          generatedBy: buyer.id,
          generatedByName: `${buyer.firstName} ${buyer.lastName}`,

          type: 'UNILEVEL' as CommissionType,
          amount,
          percentage,
          calculatedFrom: baseAmount,

          level,

          status: 'PENDING' as CommissionStatus,
          platform,

          description: `Comisión nivel ${level} por venta de ${buyer.firstName} ${buyer.lastName}`,

          userRankAtTime: sponsor.currentRank,
          generatorRankAtTime: buyer.currentRank,

          createdAt: new Date(),
          calculatedAt: new Date(),
          periodStart: new Date(),
          periodEnd: new Date()
        } as Commission)
      }

      currentUser = sponsor
      level++
    }

    return commissions
  }

  /**
   * Calcula comisiones binarias (solo iAcelera)
   */
  private static async calculateBinaryCommissions(
    order: Order,
    buyer: User
  ): Promise<Commission[]> {
    // TODO: Implementar lógica binaria completa
    // Por ahora retornamos array vacío
    // Esto requiere tracking de piernas izquierda/derecha
    return []
  }

  /**
   * Calcula Fast Start Bonus (primeros 30 días)
   */
  private static async calculateFastStartBonus(
    order: Order,
    buyer: User,
    platform: 'iacelera' | 'ifedem'
  ): Promise<Commission | null> {
    if (!buyer.sponsorId || !buyer.createdAt) return null

    const config = COMMISSION_CONFIG[platform]

    // Verificar si el comprador está en sus primeros 30 días
    const daysSinceJoin = Math.floor(
      (new Date().getTime() - new Date(buyer.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysSinceJoin > 30) return null

    if (platform !== 'iacelera' || !config.fastStart) return null

    const sponsorDoc = await getDoc(doc(db, 'users', buyer.sponsorId))
    if (!sponsorDoc.exists()) return null

    const sponsor = { id: sponsorDoc.id, ...sponsorDoc.data() } as User
    const baseAmount = order.totalCV || order.subtotal
    const percentage = config.fastStart
    const amount = baseAmount * percentage

    return {
      id: '',
      userId: sponsor.id,

      orderId: order.id,
      orderNumber: order.orderNumber,
      orderTotal: order.total,
      orderBV: order.totalBV,
      orderCV: order.totalCV || order.subtotal,

      generatedBy: buyer.id,
      generatedByName: `${buyer.firstName} ${buyer.lastName}`,

      type: 'FAST_START' as CommissionType,
      amount,
      percentage,
      calculatedFrom: baseAmount,

      status: 'PENDING' as CommissionStatus,
      platform,

      description: `Fast Start Bonus - ${buyer.firstName} está en sus primeros 30 días`,
      notes: `Días desde registro: ${daysSinceJoin}`,

      userRankAtTime: sponsor.currentRank,
      generatorRankAtTime: buyer.currentRank,

      createdAt: new Date(),
      calculatedAt: new Date(),
      periodStart: new Date(),
      periodEnd: new Date()
    } as Commission
  }

  /**
   * Guarda las comisiones en Firestore
   */
  private static async saveCommissions(commissions: Commission[]): Promise<void> {
    if (commissions.length === 0) return

    const batch = writeBatch(db)

    for (const commission of commissions) {
      const commissionRef = doc(collection(db, 'commissions'))
      commission.id = commissionRef.id

      batch.set(commissionRef, {
        ...commission,
        createdAt: serverTimestamp(),
        calculatedAt: serverTimestamp(),
        periodStart: serverTimestamp(),
        periodEnd: serverTimestamp()
      })
    }

    await batch.commit()
  }

  /**
   * Actualiza los wallets de los usuarios con las comisiones
   */
  private static async updateWallets(commissions: Commission[]): Promise<void> {
    const batch = writeBatch(db)

    // Agrupar comisiones por usuario
    const commissionsByUser = new Map<string, number>()

    for (const commission of commissions) {
      const current = commissionsByUser.get(commission.userId) || 0
      commissionsByUser.set(commission.userId, current + commission.amount)
    }

    // Actualizar cada wallet
    for (const [userId, amount] of commissionsByUser.entries()) {
      // Obtener el usuario para saber la plataforma
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (!userDoc.exists()) continue

      const user = userDoc.data() as User
      const platform = user.primaryPlatform || 'ifedem'

      const walletId = `${userId}_${platform}`
      const walletRef = doc(db, 'wallets', walletId)

      const walletDoc = await getDoc(walletRef)

      if (walletDoc.exists()) {
        const currentBalance = walletDoc.data().pendingBalance || 0
        batch.update(walletRef, {
          pendingBalance: currentBalance + amount,
          totalEarnings: (walletDoc.data().totalEarnings || 0) + amount,
          lastUpdated: serverTimestamp()
        })
      } else {
        // Crear wallet si no existe
        batch.set(walletRef, {
          userId,
          platform,
          availableBalance: 0,
          pendingBalance: amount,
          totalEarnings: amount,
          totalWithdrawals: 0,
          currency: 'USD',
          lastUpdated: serverTimestamp()
        })
      }
    }

    await batch.commit()
  }
}
