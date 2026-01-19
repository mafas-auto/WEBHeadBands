import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { activatePartyPass } from '../utils/paymentStatus'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

export default function PaymentSuccessScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id')

      if (!sessionId) {
        setError('No session ID found')
        setVerifying(false)
        return
      }

      try {
        // Verify payment with backend
        const response = await fetch(`${API_BASE_URL}/api/verify-payment?session_id=${sessionId}`)

        if (!response.ok) {
          throw new Error('Payment verification failed')
        }

        const data = await response.json()

        if (data.paid) {
          // Save email if provided
          if (data.email) {
            localStorage.setItem('party_pass_email', data.email)
          }
          
          // Activate Party Pass locally (webhook will handle database)
          activatePartyPass(365, data.expiresAt)
          setVerified(true)
          
          // Redirect to home after 3 seconds
          setTimeout(() => {
            navigate('/')
          }, 3000)
        } else {
          setError('Payment not completed')
        }
      } catch (err) {
        console.error('Verification error:', err)
        setError(err.message || 'Failed to verify payment')
      } finally {
        setVerifying(false)
      }
    }

    verifyPayment()
  }, [searchParams, navigate])

  if (verifying) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">💳</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Verifying Payment...</h1>
          <p className="text-gray-400">Please wait while we confirm your purchase</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Payment Verification Failed</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  if (verified) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-400 mb-6">
            Your Party Pass has been activated. You now have unlimited AI deck generation!
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Redirecting to home...
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return null
}

