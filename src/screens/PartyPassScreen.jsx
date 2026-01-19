import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { activatePartyPass } from '../utils/paymentStatus'

const PARTY_PASS_PRICE = 5.00 // $5 USD
const PARTY_PASS_DURATION = 365 // 1 year

export default function PartyPassScreen() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePurchase = async () => {
    setLoading(true)
    setError(null)

    try {
      // TODO: Integrate with actual payment provider (Stripe, PayPal, etc.)
      // For now, this is a mock payment flow
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock payment success
      const paymentSuccess = true // In production, verify with payment provider
      
      if (paymentSuccess) {
        // Activate Party Pass
        activatePartyPass(PARTY_PASS_DURATION)
        
        // Show success and redirect
        alert('🎉 Party Pass activated! You now have unlimited AI deck generation!')
        navigate('/')
      } else {
        setError('Payment failed. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'Payment processing failed. Please try again.')
      console.error('Payment Error:', err)
    } finally {
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
            </ul>
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

