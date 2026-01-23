import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    },
    {
      path: '/login',
      redirect: '/auth',
    },
    {
      path: '/register',
      redirect: '/auth',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductCatalogView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/commissions',
      name: 'commissions',
      component: () => import('../views/CommissionsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // Admin Routes
    {
      path: '/admin',
      component: () => import('../layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
        },
        {
          path: 'products',
          name: 'admin-products',
          component: () => import('../views/admin/ProductsManagement.vue'),
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/OrdersManagement.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersManagement.vue'),
        },
        {
          path: 'commissions',
          name: 'admin-commissions',
          component: () => import('../views/admin/AdminDashboard.vue'), // Placeholder
        },
        {
          path: 'reports',
          name: 'admin-reports',
          component: () => import('../views/admin/AdminDashboard.vue'), // Placeholder
        },
      ],
    },
  ],
})

// Helper function to get current user, waiting for auth to initialize if needed
function getCurrentUser(auth: any): Promise<any> {
  return new Promise((resolve, reject) => {
    console.log('🔍 getCurrentUser: checking auth.currentUser...', auth.currentUser)
    if (auth.currentUser) {
      console.log('✅ getCurrentUser: currentUser already available:', auth.currentUser.uid)
      resolve(auth.currentUser)
    } else {
      console.log('⏳ getCurrentUser: waiting for auth state change...')
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          console.log('🔔 getCurrentUser: auth state changed, user:', user?.uid || 'null')
          unsubscribe()
          resolve(user)
        },
        reject
      )
    }
  })
}

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  console.log(`🛣️  Navigation: ${from.path} → ${to.path}`)
  const auth = getAuth()

  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('🔒 Route requires auth, checking user...')
    try {
      // Wait for auth to initialize
      const currentUser = await getCurrentUser(auth)

      if (!currentUser) {
        // Not logged in, redirect to auth
        console.log('❌ No user found, redirecting to /auth')
        next('/auth')
        return
      }
      console.log('✅ User authenticated:', currentUser.uid)

      // Check if route requires admin
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            if (userData.role === 'admin') {
              next()
            } else {
              // Not admin, redirect to dashboard
              alert('No tienes permisos para acceder al panel de administración')
              next('/dashboard')
            }
          } else {
            next('/auth')
          }
        } catch (err) {
          console.error('Error checking admin status:', err)
          next('/dashboard')
        }
      } else {
        next()
      }
    } catch (err) {
      console.error('Error in auth guard:', err)
      next('/auth')
    }
  } else {
    next()
  }
})

export default router
