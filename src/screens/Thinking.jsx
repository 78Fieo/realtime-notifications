import { useState, useEffect } from 'react'

const SCAN_STAGES = [
  { message: 'Uploading...', progress: 15 },
  { message: 'Reading text...', progress: 40 },
  { message: 'Verifying merchant...', progress: 65 },
  { message: 'Checking amount...', progress: 85 },
  { message: 'Almost done...', progress: 95 },
]

export default function Thinking({ transaction, onComplete }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const currentStage = SCAN_STAGES[stageIndex]

  useEffect(() => {
    if (isPaused) return

    const timer = setTimeout(() => {
      if (stageIndex < SCAN_STAGES.length - 1) {
        setStageIndex(prev => prev + 1)
      } else {
        // Animation complete, trigger callback
        onComplete()
      }
    }, 800) // ~800ms per stage = ~4 seconds total

    return () => clearTimeout(timer)
  }, [stageIndex, isPaused, onComplete])

  return (
    <div className="phone-content">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Scanning Visual */}
      <div className="wire-card relative overflow-hidden">
        {/* Image Thumbnail Placeholder */}
        <div className="aspect-[4/3] bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-4 relative overflow-hidden">
          <span className="text-gray-500 text-sm">[ Receipt Image ]</span>
          
          {/* Scan Line Animation */}
          <div className="scan-line"></div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar mb-3">
          <div 
            className="progress-fill transition-all duration-500 ease-out"
            style={{ width: `${currentStage.progress}%` }}
          ></div>
        </div>

        {/* Dynamic Microcopy */}
        <p className="text-center text-gray-700 font-medium animate-pulse">
          {currentStage.message}
        </p>
      </div>

      {/* Context Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {transaction.merchant} • {transaction.amount}
        </p>
      </div>

      {/* UX Critical Note */}
      <div className="mt-8 p-3 border-2 border-dashed border-red-300 bg-red-50">
        <p className="text-xs text-red-700 text-center">
          <strong>⚠️ CRITICAL UX:</strong> This "thinking" state prevents abandonment.
          <br /><br />
          <span className="text-red-600">
            PRD requires: Active microcopy cycling, progress feedback, &lt;5 second target.
            <br />
            If this takes too long, users WILL close the browser.
          </span>
        </p>
      </div>

      {/* Debug Controls */}
      <div className="mt-4 p-3 border border-gray-300 bg-white">
        <p className="text-xs text-gray-500 mb-2">Debug controls:</p>
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
          Stage {stageIndex + 1}/{SCAN_STAGES.length}
        </p>
      </div>
    </div>
  )
}









