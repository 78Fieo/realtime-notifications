import { useState, useEffect } from 'react'

const SCAN_STAGES = [
  { message: 'Uploading receipt image...', progress: 16 },
  { message: 'Reading receipt text...', progress: 38 },
  { message: 'Checking merchant details...', progress: 60 },
  { message: 'Validating amount and date...', progress: 82 },
  { message: 'Finalizing substantiation...', progress: 96 },
]

export default function Thinking({ transaction, onComplete }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const currentStage = SCAN_STAGES[stageIndex]
  const totalEstimateSeconds = 7

  useEffect(() => {
    const ticker = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(ticker)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stageIndex < SCAN_STAGES.length - 1) {
        setStageIndex(prev => prev + 1)
      } else {
        // Animation complete, trigger callback
        onComplete()
      }
    }, 1400) // ~7 seconds total

    return () => clearTimeout(timer)
  }, [stageIndex, onComplete])

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
        <p className="text-center text-xs text-gray-500 mt-2">
          {`Working on substantiation • ${elapsedSeconds}s elapsed (usually 5-10s)`}
        </p>
      </div>

      {/* Context Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {transaction.merchant} • {transaction.amount}
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Stage {stageIndex + 1}/{SCAN_STAGES.length} • ETA {Math.max(totalEstimateSeconds - elapsedSeconds, 0)}s
        </p>
      </div>
    </div>
  )
}







