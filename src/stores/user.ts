import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import type { User, AffiliateProfile } from '@/shared/types/user'

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null)
  const affiliateProfile = ref<AffiliateProfile | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  const currentPlatform = ref<'iacelera' | 'ifedem'>(
    import.meta.env.VITE_PLATFORM_MODE as 'iacelera' | 'ifedem'
  )

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isAffiliate = computed(() => user.value?.role === 'affiliate')
  const isSupport = computed(() => user.value?.role === 'support')
  const fullName = computed(() =>
    user.value ? `${user.value.firstName} ${user.value.lastName}` : ''
  )
  const platform = computed(() => currentPlatform.value)
  const isRegisteredInCurrentPlatform = computed(() => {
    return user.value?.platforms?.includes(currentPlatform.value) || false
  })

  // Actions
  async function fetchUserData(userId: string) {
    try {
      loading.value = true
      error.value = null

      // Fetch user document
      const userDoc = await getDoc(doc(db, 'users', userId))

      if (userDoc.exists()) {
        const userData = userDoc.data() as User

        // Convert Firestore Timestamps to Dates
        if (userData.createdAt) {
          userData.createdAt = (userData.createdAt as any).toDate()
        }
        if (userData.updatedAt) {
          userData.updatedAt = (userData.updatedAt as any).toDate()
        }
        if (userData.lastLogin) {
          userData.lastLogin = (userData.lastLogin as any).toDate()
        }
        if (userData.renewalDate) {
          userData.renewalDate = (userData.renewalDate as any).toDate()
        }

        user.value = userData

        // Fetch affiliate profile if user is affiliate
        if (userData.role === 'affiliate') {
          await fetchAffiliateProfile(userId)
        }
      } else {
        error.value = 'Usuario no encontrado'
      }
    } catch (err: any) {
      error.value = err.message
      console.error('Error fetching user data:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchAffiliateProfile(userId: string) {
    try {
      // Use composite ID: userId_platform
      const profileId = `${userId}_${currentPlatform.value}`
      const profileDoc = await getDoc(doc(db, 'affiliateProfiles', profileId))

      if (profileDoc.exists()) {
        const profileData = profileDoc.data() as AffiliateProfile

        // Convert Timestamps
        if (profileData.updatedAt) {
          profileData.updatedAt = (profileData.updatedAt as any).toDate()
        }

        if (profileData.rankHistory) {
          profileData.rankHistory = profileData.rankHistory.map((history: any) => ({
            ...history,
            achievedAt: history.achievedAt?.toDate?.() || history.achievedAt,
            maintainedUntil: history.maintainedUntil?.toDate?.() || history.maintainedUntil
          }))
        }

        affiliateProfile.value = profileData
      } else {
        // User not registered in this platform
        affiliateProfile.value = null
      }
    } catch (err) {
      console.error('Error fetching affiliate profile:', err)
    }
  }

  function clearUser() {
    user.value = null
    affiliateProfile.value = null
    loading.value = false
    error.value = null
  }

  // Initialize auth listener
  function initAuthListener() {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Try to fetch full user data from Firestore
        await fetchUserData(firebaseUser.uid)

        // If fetchUserData failed (user is still null), create basic user from Firebase Auth
        if (!user.value) {
          console.warn('Could not fetch user data from Firestore, using Firebase Auth data only')
          const nameParts = (firebaseUser.displayName || '').split(' ')
          user.value = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            firstName: nameParts[0] || 'User',
            lastName: nameParts.slice(1).join(' ') || '',
            role: 'affiliate' as UserRole,
            status: 'active',
            platforms: [currentPlatform.value],
            primaryPlatform: currentPlatform.value,
            isVerified: firebaseUser.emailVerified,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        }
      } else {
        clearUser()
      }
    })
  }

  return {
    // State
    user,
    affiliateProfile,
    loading,
    error,
    currentPlatform,

    // Getters
    isAuthenticated,
    isAdmin,
    isAffiliate,
    isSupport,
    fullName,
    platform,
    isRegisteredInCurrentPlatform,

    // Actions
    fetchUserData,
    fetchAffiliateProfile,
    clearUser,
    initAuthListener
  }
})
