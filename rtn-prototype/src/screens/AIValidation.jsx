import { useState, useEffect } from 'react'

const VALIDATION_STAGES = [
  { message: 'Uploading image...', progress: 20, icon: '⬆️' },
  { message: 'Checking image quality...', progress: 40, icon: '🔍' },
  { message: 'Reading receipt text...', progress: 60, icon: '📝' },
  { message: 'Verifying merchant name...', progress: 75, icon: '🏪' },
  { message: 'Matching amount...', progress: 90, icon: '💵' },
  { message: 'Finalizing...', progress: 98, icon: '✨' },
]

export default function AIValidation({ transaction, onSuccess, onError, simulateError }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentStage = VALIDATION_STAGES[stageIndex]

  useEffect(() => {
    if (isPaused) return

    const timer = setTimeout(() => {
      if (stageIndex < VALIDATION_STAGES.length - 1) {
        setStageIndex(prev => prev + 1)
      } else {
        // Validation complete
        if (simulateError) {
          onError()
        } else {
          onSuccess()
        }
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [stageIndex, isPaused, onSuccess, onError, simulateError])

  return (
    <div className="phone-content">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Scanning Visual */}
      <div className="wire-card">
        {/* Image Thumbnail with Scan Effect */}
        <div className="aspect-[4/3] bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-4 relative overflow-hidden">
          <span className="text-gray-500 text-sm">[ Receipt Image ]</span>
          
          {/* Scan Line Animation */}
          <div className="scan-line"></div>
          
          {/* Current Stage Icon */}
          <div className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center text-xl">
            {currentStage.icon}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar mb-3">
          <div 
            className="progress-fill transition-all duration-300 ease-out"
            style={{ width: `${currentStage.progress}%` }}
          ></div>
        </div>

        {/* Dynamic Microcopy - More Specific */}
        <p className="text-center text-gray-700 font-medium">
          {currentStage.message}
        </p>
        <p className="text-center text-xs text-gray-400 mt-1">
          This usually takes a few seconds
        </p>
      </div>

      {/* Transaction Context */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {transaction.merchant} • {transaction.amount}
        </p>
      </div>

      {/* UX Improvement Note */}
      <div className="mt-6 p-3 border-2 border-dashed border-green-300 bg-green-50">
        <p className="text-xs text-green-700 text-center">
          <strong>✨ OPTIMAL UX</strong> — Real-time AI feedback
          <br />
          <span className="text-green-600">
            Each step shows WHAT the system is checking.
            <br />
            User understands the value being provided.
            <br />
            <em>Per PRD: Active microcopy cycling.</em>
          </span>
        </p>
      </div>

      {/* Debug Controls */}
      <div className="mt-4 p-3 border border-gray-300 bg-white">
        <p className="text-xs text-gray-500 mb-2">Debug:</p>
        <button 
          className="text-xs px-2 py-1 border border-gray-400 mr-2"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
        <button 
          className="text-xs px-2 py-1 border border-gray-400"
          onClick={() => { setStageIndex(0); setIsPaused(false); }}
        >
          ↺ Restart
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Stage {stageIndex + 1}/{VALIDATION_STAGES.length}
        </p>
      </div>
    </div>
  )
}








