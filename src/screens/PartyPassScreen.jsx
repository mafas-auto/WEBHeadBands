import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { activatePartyPass } from '../utils/paymentStatus'

const PARTY_PASS_PRICE = 4.99 // $4.99 USD
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export default function PartyPassScreen() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userEmail, setUserEmail] = useState('')

  const handlePurchase = async () => {
    setLoading(true)
    setError(null)

    try {
      // Create Stripe Checkout Session
      const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userEmail: userEmail || undefined
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to create checkout session')
      }

      const { url } = await response.json()

      if (url) {
        // Save email to localStorage for later use
        if (userEmail) {
          localStorage.setItem('party_pass_email', userEmail)
        }
        
        // Redirect to Stripe Checkout
        window.location.href = url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err) {
      setError(err.message || 'Payment processing failed. Please try again.')
      console.error('Payment Error:', err)
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 overflow-y-auto">
      <header className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-400 hover:text-blue-300 mb-4 text-sm sm:text-base"
        >
          ← Back to Home
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Party Pass</h1>
        <p className="text-sm sm:text-base text-gray-400">
          Unlock unlimited AI deck generation
        </p>
      </header>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full">
        <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl p-6 sm:p-8 mb-6 border border-purple-700">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Unlimited AI Decks</h2>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4">
              ${PARTY_PASS_PRICE.toFixed(2)} one-time payment
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              Valid for {PARTY_PASS_DURATION} days
            </p>
          </div>

          <div className="bg-black bg-opacity-30 rounded-lg p-4 sm:p-6 mb-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">What you get:</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>Unlimited AI deck generations (no session limits)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>Create as many custom decks as you want</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>All decks saved in your account</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>Access to all premium features</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span>Valid for 1 year (365 days)</span>
              </li>
            </ul>
          </div>

          {/* Optional: Email input for faster checkout */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4">
            <label className="block text-sm sm:text-base font-semibold mb-2">
              Email (optional - for faster checkout)
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-gray-700 text-white rounded-lg p-3 sm:p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              We'll use this to send your receipt and activate your Party Pass
            </p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 rounded-lg p-3 sm:p-4 mb-4">
              <p className="text-red-200 text-sm sm:text-base">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-800 active:to-emerald-800 disabled:bg-gray-700 disabled:text-gray-400 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-lg text-lg sm:text-xl md:text-2xl active:scale-95 transition-all touch-manipulation min-h-[56px] disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">💳</span>
                  Processing Payment...
                </span>
              ) : (
                `Purchase Party Pass - $${PARTY_PASS_PRICE.toFixed(2)}`
              )}
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg active:scale-95 transition-all touch-manipulation min-h-[44px]"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 text-center mt-4">
            🔒 Secure payment processing. Your payment information is encrypted.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          <h3 className="text-sm sm:text-base font-semibold mb-2">Free Tier</h3>
          <p className="text-xs sm:text-sm text-gray-400">
            Without Party Pass, you can generate 5 AI decks per session. 
            Free decks reset when you refresh the page.
          </p>
        </div>
      </div>
    </div>
  )
}

