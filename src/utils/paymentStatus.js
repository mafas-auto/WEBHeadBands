/**
 * Payment status management for Party Pass
 * Stores payment status in localStorage (client-side for now)
 * In production, this should be verified server-side
 */

const PAYMENT_STORAGE_KEY = 'party_pass_status'
const PAYMENT_EXPIRY_KEY = 'party_pass_expiry'

/**
 * Check if user has active Party Pass
 */
export function hasPartyPass() {
  try {
    const status = localStorage.getItem(PAYMENT_STORAGE_KEY)
    const expiry = localStorage.getItem(PAYMENT_EXPIRY_KEY)
    
    if (!status || status !== 'active') {
      return false
    }
    
    // Check if expired
    if (expiry) {
      const expiryDate = new Date(expiry)
      if (expiryDate < new Date()) {
        // Expired, clear it
        clearPartyPass()
        return false
      }
    }
    
    return true
  } catch {
    return false
  }
}

/**
 * Activate Party Pass (after successful payment)
 * @param {number} daysValid - Number of days the pass is valid (default: 365 for 1 year)
 */
export function activatePartyPass(daysValid = 365) {
  try {
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + daysValid)
    
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

