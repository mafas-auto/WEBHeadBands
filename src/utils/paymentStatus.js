/**
 * Payment status management for Party Pass
 * Uses localStorage as cache, but verifies with backend
 * Backend is the source of truth (Supabase database)
 */

const PAYMENT_STORAGE_KEY = 'party_pass_status'
const PAYMENT_EXPIRY_KEY = 'party_pass_expiry'
const PAYMENT_EMAIL_KEY = 'party_pass_email'
const ADMIN_BYPASS_KEY = 'admin_bypass_enabled'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

// Admin email for backdoor access (change this to your email)
// Set this to your actual email address for testing
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'filipmateja@example.com'

/**
 * Check if admin bypass is enabled
 * This allows the admin to test without payment
 */
function isAdminBypassEnabled(email = null) {
  try {
    // Check if bypass is explicitly enabled in localStorage
    const bypassEnabled = localStorage.getItem(ADMIN_BYPASS_KEY) === 'true'
    
    // Check if email matches admin email
    const storedEmail = localStorage.getItem(PAYMENT_EMAIL_KEY)
    const isAdminEmail = email === ADMIN_EMAIL || storedEmail === ADMIN_EMAIL
    
    // Enable bypass if admin email matches OR bypass flag is set
    if (isAdminEmail || bypassEnabled) {
      // Auto-enable bypass for admin
      if (isAdminEmail && !bypassEnabled) {
        localStorage.setItem(ADMIN_BYPASS_KEY, 'true')
      }
      return true
    }
    
    return false
  } catch {
    return false
  }
}

/**
 * Check if user has active Party Pass
 * Checks localStorage cache first, then verifies with backend if email available
 */
export async function hasPartyPass(email = null) {
  try {
    // Admin bypass check (for testing)
    if (isAdminBypassEnabled(email)) {
      console.log('🔓 Admin bypass enabled - unlimited access')
      return true
    }
    
    // Check localStorage cache first (fast)
    const status = localStorage.getItem(PAYMENT_STORAGE_KEY)
    const expiry = localStorage.getItem(PAYMENT_EXPIRY_KEY)
    
    if (status === 'active' && expiry) {
      const expiryDate = new Date(expiry)
      if (expiryDate > new Date()) {
        // Cache says active and not expired
        // If email provided, verify with backend (async, non-blocking)
        if (email && API_BASE_URL) {
          verifyWithBackend(email).catch(() => {
            // If verification fails, trust cache
          })
        }
        return true
      } else {
        // Expired in cache
        clearPartyPass()
        return false
      }
    }

    // If email provided and cache says no, check backend
    if (email && API_BASE_URL) {
      return await verifyWithBackend(email)
    }

    return false
  } catch {
    return false
  }
}

/**
 * Verify payment status with backend
 */
async function verifyWithBackend(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/check-premium-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (!response.ok) {
      return false
    }

    const data = await response.json()

    if (data.isPremium) {
      // Update cache
      activatePartyPass(365, data.expiresAt)
      localStorage.setItem(PAYMENT_EMAIL_KEY, email)
      return true
    } else {
      // Clear cache if backend says not premium
      clearPartyPass()
      return false
    }
  } catch {
    return false
  }
}

/**
 * Activate Party Pass (after successful payment)
 * @param {number} daysValid - Number of days the pass is valid (default: 365 for 1 year)
 * @param {string} expiresAt - Optional ISO date string for expiry (from backend)
 */
export function activatePartyPass(daysValid = 365, expiresAt = null) {
  try {
    const expiryDate = expiresAt ? new Date(expiresAt) : (() => {
      const date = new Date()
      date.setDate(date.getDate() + daysValid)
      return date
    })()
    
    localStorage.setItem(PAYMENT_STORAGE_KEY, 'active')
    localStorage.setItem(PAYMENT_EXPIRY_KEY, expiryDate.toISOString())
    return true
  } catch {
    return false
  }
}

/**
 * Clear Party Pass (for testing or logout)
 */
export function clearPartyPass() {
  try {
    localStorage.removeItem(PAYMENT_STORAGE_KEY)
    localStorage.removeItem(PAYMENT_EXPIRY_KEY)
  } catch {
    // Ignore errors
  }
}

/**
 * Enable/disable admin bypass (for testing)
 * @param {boolean} enabled - Whether to enable bypass
 */
export function setAdminBypass(enabled) {
  try {
    if (enabled) {
      localStorage.setItem(ADMIN_BYPASS_KEY, 'true')
      console.log('🔓 Admin bypass enabled')
    } else {
      localStorage.removeItem(ADMIN_BYPASS_KEY)
      console.log('🔒 Admin bypass disabled')
    }
  } catch {
    // Ignore errors
  }
}

/**
 * Check if admin bypass is currently enabled
 */
export function getAdminBypassStatus() {
  try {
    return localStorage.getItem(ADMIN_BYPASS_KEY) === 'true'
  } catch {
    return false
  }
}

/**
 * Get Party Pass expiry date
 */
export function getPartyPassExpiry() {
  try {
    const expiry = localStorage.getItem(PAYMENT_EXPIRY_KEY)
    return expiry ? new Date(expiry) : null
  } catch {
    return null
  }
}

/**
 * Get days remaining on Party Pass
 */
export function getDaysRemaining() {
  try {
    const expiry = getPartyPassExpiry()
    if (!expiry) return 0
    
    const now = new Date()
    const diff = expiry - now
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    
    return Math.max(0, days)
  } catch {
    return 0
  }
}

