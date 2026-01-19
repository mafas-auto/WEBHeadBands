/**
 * Session-based prompt limiter for AI deck generation
 * Uses sessionStorage to track prompts per browser session
 */

const SESSION_STORAGE_KEY = 'ai_deck_prompts_count'
const MAX_PROMPTS_PER_SESSION = 5

/**
 * Get current prompt count for this session
 */
export function getPromptCount() {
  try {
    const count = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return count ? parseInt(count, 10) : 0
  } catch {
    return 0
  }
}

/**
 * Increment prompt count for this session
 */
export function incrementPromptCount() {
  try {
    const current = getPromptCount()
    sessionStorage.setItem(SESSION_STORAGE_KEY, (current + 1).toString())
    return current + 1
  } catch {
    return 0
  }
}

/**
 * Check if user has reached the session limit
 */
export function hasReachedLimit() {
  return getPromptCount() >= MAX_PROMPTS_PER_SESSION
}

/**
 * Get remaining prompts for this session
 */
export function getRemainingPrompts() {
  const used = getPromptCount()
  return Math.max(0, MAX_PROMPTS_PER_SESSION - used)
}

/**
 * Reset prompt count (for testing or admin purposes)
 */
export function resetPromptCount() {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  } catch {
    // Ignore errors
  }
}

export { MAX_PROMPTS_PER_SESSION }

