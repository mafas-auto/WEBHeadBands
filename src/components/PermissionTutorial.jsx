import { useState } from 'react'

export default function PermissionTutorial({ onContinue, onSkip }) {
  const [step, setStep] = useState(1)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  // For non-iOS devices, this component shouldn't be shown
  // But if it is, just show a simple message
  if (!isIOS) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-6">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">📱</div>
          <h2 className="text-3xl font-bold mb-4 text-black">Ready to Play!</h2>
          <p className="text-lg text-gray-700 mb-6">
            Your device doesn't require special permissions for tilt controls.
          </p>
          <button
            onClick={onContinue}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Let's Play!
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full my-auto">
        <div className="mb-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {step === 1 && (
            <>
              <div className="text-6xl mb-4 text-center">📱</div>
              <h2 className="text-2xl font-bold mb-4 text-black text-center">Enable Motion Access</h2>
              <p className="text-base text-gray-700 mb-6 text-center">
                To play with tilt controls, you'll need to allow motion access when prompted.
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-gray-700 font-semibold mb-2">What to expect:</p>
                <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                  <li>After the countdown, a popup will appear</li>
                  <li>Tap <strong>"Allow"</strong> to enable tilt controls</li>
                  <li>Or tap <strong>"Don't Allow"</strong> to use buttons only</li>
                </ul>
              </div>
            </>
          )}
          
          {step === 2 && (
            <>
              <div className="text-6xl mb-4 text-center">🎮</div>
              <h2 className="text-2xl font-bold mb-4 text-black text-center">How to Play</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⬇️</div>
                  <div>
                    <p className="font-semibold text-gray-800">Tilt Forward (Down)</p>
                    <p className="text-sm text-gray-600">= CORRECT ✓</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⬆️</div>
                  <div>
                    <p className="font-semibold text-gray-800">Tilt Backward (Up)</p>
                    <p className="text-sm text-gray-600">= PASS ✗</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">👆</div>
                  <div>
                    <p className="font-semibold text-gray-800">Or use buttons</p>
                    <p className="text-sm text-gray-600">Always available at the bottom</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          {step === 1 && (
            <>
              <button
                onClick={onSkip}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition active:bg-gray-400"
              >
                Skip
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition active:bg-blue-800"
              >
                Next
              </button>
            </>
          )}
          
          {step === 2 && (
            <button
              onClick={onContinue}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition active:bg-green-800"
            >
              Got It! Let's Play
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

