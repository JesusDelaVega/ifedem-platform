import { ref, computed } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import type { User as AppUser, UserRole } from '@/shared/types/user'

export function useAuth() {
  const currentUser = ref<User | null>(auth.currentUser)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!currentUser.value)

  // Register new user or join existing user to new platform
  async function register(
    email: string,
    password: string,
    userData: {
      firstName: string
      lastName: string
      phone?: string
      platform: 'iacelera' | 'ifedem'
      referralCode?: string
    }
  ) {
    loading.value = true
    error.value = null

    try {
      let user: User
      let isNewUser = true

      // Try to create new Firebase Auth user
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        user = userCredential.user

        await updateProfile(user, {
          displayName: `${userData.firstName} ${userData.lastName}`
        })
      } catch (authError: any) {
        // If email already exists, try to login
        if (authError.code === 'auth/email-already-in-use') {
          const loginCredential = await signInWithEmailAndPassword(auth, email, password)
          user = loginCredential.user
          isNewUser = false
        } else {
          throw authError
        }
      }

      // Check if user already exists in Firestore
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        // User already exists, add new platform
        const existingData = userDoc.data() as AppUser

        // Check if already registered in this platform
        if (existingData.platforms?.includes(userData.platform)) {
          throw new Error(
            `Ya estás registrado en ${
              userData.platform === 'iacelera' ? 'iAcelera' : 'IFEDEM'
            }`
          )
        }

        // Add new platform
        await updateDoc(userDocRef, {
          platforms: arrayUnion(userData.platform),
          updatedAt: serverTimestamp()
        })

        // Create affiliate profile for new platform
        await createAffiliateProfile(user.uid, userData.platform)

        currentUser.value = user
        return { user, isNewPlatform: true }
      } else {
        // Completely new user
        const referralCode = await generateReferralCode(userData.firstName, userData.lastName)
        let referrerId: string | undefined

        if (userData.referralCode) {
          referrerId = await findUserByReferralCode(userData.referralCode)
        }

        const appUser: AppUser = {
          id: user.uid,
          email: user.email!,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          role: 'affiliate' as UserRole,
          status: 'active',
          platforms: [userData.platform], // Array with initial platform
          primaryPlatform: userData.platform,
          referralCode,
          referrerId,
          sponsorId: referrerId,
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        await setDoc(userDocRef, appUser)
        await createAffiliateProfile(user.uid, userData.platform)

        currentUser.value = user
        return { user, isNewPlatform: false }
      }
    } catch (err: any) {
      error.value = getErrorMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login
  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      console.log('🔐 Attempting login with:', email)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('✅ Login successful, user:', userCredential.user.uid)
      currentUser.value = userCredential.user

      // Update last login (non-blocking - don't fail login if this fails)
      console.log('📝 Updating last login...')
      setDoc(
        doc(db, 'users', userCredential.user.uid),
        { lastLogin: new Date() },
        { merge: true }
      ).then(() => {
        console.log('✅ Last login updated')
      }).catch((err) => {
        console.warn('⚠️ Could not update last login (permissions issue):', err.message)
      })

      return userCredential.user
    } catch (err: any) {
      console.error('❌ Login error:', err)
      error.value = getErrorMessage(err)
      throw err
    } finally {
      loading.value = false
      console.log('🏁 Login process finished, loading:', loading.value)
    }
  }

  // Logout
  async function logout() {
    loading.value = true
    error.value = null

    try {
      await signOut(auth)
      currentUser.value = null
    } catch (err: any) {
      error.value = getErrorMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Reset password
  async function resetPassword(email: string) {
    loading.value = true
    error.value = null

    try {
      await sendPasswordResetEmail(auth, email)
    } catch (err: any) {
      error.value = getErrorMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Get current user data from Firestore
  async function getCurrentUserData(): Promise<AppUser | null> {
    if (!currentUser.value) return null

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.value.uid))
      if (userDoc.exists()) {
        return userDoc.data() as AppUser
      }
      return null
    } catch (err) {
      console.error('Error fetching user data:', err)
      return null
    }
  }

  return {
    currentUser,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    resetPassword,
    getCurrentUserData
  }
}

// Helper functions

async function generateReferralCode(firstName: string, lastName: string): Promise<string> {
  const base = `${firstName.slice(0, 3)}${lastName.slice(0, 3)}`.toUpperCase()
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0')
  return `${base}${random}`
}

async function findUserByReferralCode(code: string): Promise<string | undefined> {
  try {
    const { collection, query, where, getDocs } = await import('firebase/firestore')
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('referralCode', '==', code))
    const snapshot = await getDocs(q)

    if (!snapshot.empty) {
      return snapshot.docs[0].id
    }
  } catch (err) {
    console.error('Error finding user by referral code:', err)
  }
  return undefined
}

async function createAffiliateProfile(userId: string, platform: 'iacelera' | 'ifedem') {
  // Use composite ID: userId_platform
  const profileId = `${userId}_${platform}`

  const affiliateProfile = {
    userId,
    platform,  // Explicitly set platform
    networkLevel: 1,
    totalReferrals: 0,
    activeReferrals: 0,
    personalSales: 0,
    teamSales: 0,
    personalVolume: 0,
    teamVolume: 0,
    currentRank: platform === 'iacelera' ? 'bronze' : 'affiliate',
    lifetimeRank: platform === 'iacelera' ? 'bronze' : 'affiliate',
    rankHistory: [
      {
        rank: platform === 'iacelera' ? 'bronze' : 'affiliate',
        achievedAt: new Date(),
        isMeritorious: false
      }
    ],
    retentionRate: 0,
    churnRate: 0,
    totalEarnings: 0,
    pendingCommissions: 0,
    paidCommissions: 0,
    availableBalance: 0,
    updatedAt: new Date()
  }

  // Use composite ID for profile
  await setDoc(doc(db, 'affiliateProfiles', profileId), affiliateProfile)

  // Create wallet with composite ID
  const walletId = `${userId}_${platform}`
  await setDoc(doc(db, 'wallets', walletId), {
    userId,
    platform,  // Add platform to wallet
    availableBalance: 0,
    pendingBalance: 0,
    totalEarnings: 0,
    totalWithdrawals: 0,
    currency: 'USD',
    lastUpdated: new Date()
  })
}

function getErrorMessage(error: any): string {
  const errorCode = error.code

  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Este email ya está registrado'
    case 'auth/invalid-email':
      return 'Email inválido'
    case 'auth/operation-not-allowed':
      return 'Operación no permitida'
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres'
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada'
    case 'auth/user-not-found':
      return 'Usuario no encontrado'
    case 'auth/wrong-password':
      return 'Contraseña incorrecta'
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde'
    default:
      return error.message || 'Error desconocido'
  }
}
