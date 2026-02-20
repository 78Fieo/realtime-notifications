import { useState, useEffect } from 'react'

const VALIDATION_STAGES = [
  { message: 'Uploading image...', progress: 18 },
  { message: 'Checking image quality...', progress: 35 },
  { message: 'Reading receipt text...', progress: 55 },
  { message: 'Matching merchant details...', progress: 74 },
  { message: 'Validating amount and date...', progress: 89 },
  { message: 'Finalizing substantiation...', progress: 98 },
]

export default function AIValidation({ transaction, onSuccess, onError, simulateError }) {
  const [stageIndex, setStageIndex] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const currentStage = VALIDATION_STAGES[stageIndex]
  const totalEstimateSeconds = 8

  useEffect(() => {
    const ticker = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000)
    return () => clearInterval(ticker)
  }, [])

  useEffect(() => {
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
    }, 1200)

    return () => clearTimeout(timer)
  }, [stageIndex, onSuccess, onError, simulateError])

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
          Working on substantiation...
        </p>
        <p className="text-center text-xs text-gray-500 mt-2">
          {`Elapsed ${elapsedSeconds}s • usually 5-10s`}
        </p>
      </div>

      {/* Transaction Context */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          {transaction.merchant} • {transaction.amount}
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400">
          Stage {stageIndex + 1}/{VALIDATION_STAGES.length} • ETA {Math.max(totalEstimateSeconds - elapsedSeconds, 0)}s
        </p>
      </div>
    </div>
  )
}







