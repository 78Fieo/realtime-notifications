import { useState, useEffect } from 'react'
import BrandHeader from '../components/BrandHeader'

const SCAN_STAGES = [
  { message: 'Uploading receipt image...', progress: 16 },
  { message: 'Reading receipt text...', progress: 38 },
  { message: 'Checking merchant details...', progress: 60 },
  { message: 'Validating amount and date...', progress: 82 },
  { message: 'Finalizing receipt check...', progress: 96 },
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
      <BrandHeader />

      {/* Receipt Preview with Beam Scanner */}
      <div
        className="relative overflow-hidden rounded-xl mb-4"
        style={{
          aspectRatio: '4 / 3',
          border: '2px dashed #b1c0ee',
          background: 'linear-gradient(160deg, #f8faff 0%, #eef3ff 100%)',
        }}
      >
        {/* Skeleton receipt content */}
        <div className="receipt-skeleton">
          <div className="skeleton-bar" style={{ width: '68%' }} />
          <div className="skeleton-row">
            <div className="skeleton-bar" style={{ flex: 1 }} />
            <div className="skeleton-bar" style={{ width: '28%' }} />
          </div>
          <div className="skeleton-row">
            <div className="skeleton-bar" style={{ width: '52%' }} />
            <div className="skeleton-bar" style={{ width: '22%' }} />
          </div>
          <div className="skeleton-row">
            <div className="skeleton-bar" style={{ width: '60%' }} />
            <div className="skeleton-bar" style={{ width: '25%' }} />
          </div>
          <div className="skeleton-row" style={{ marginTop: 4 }}>
            <div className="skeleton-bar" style={{ width: '40%', opacity: 0.6 }} />
            <div className="skeleton-bar" style={{ width: '30%', opacity: 0.6 }} />
          </div>
        </div>

        {/* Glowing Beam */}
        <div className="scan-beam" aria-hidden="true" />

        {/* "Analyzing Receipt..." pill */}
        <div className="analyzing-pill">Analyzing Receipt...</div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-5" style={{ height: 6 }}>
        <div
          className="progress-fill"
          style={{ width: `${currentStage.progress}%`, transition: 'width 0.5s cubic-bezier(0.45, 0, 0.55, 1)' }}
        />
      </div>

      {/* Stage message */}
      <p
        key={stageIndex}
        className="text-center font-bold motion-fade-up"
        style={{ fontSize: 18, color: 'var(--wex-text-primary)', marginBottom: 6 }}
      >
        {currentStage.message}
      </p>
      <p className="text-center text-sm" style={{ color: 'var(--wex-text-muted)', marginBottom: 4 }}>
        Checking your receipt details...
      </p>
      <p className="text-center text-xs font-medium" style={{ color: 'var(--wex-brand-blue-accent)', marginBottom: 20 }}>
        Elapsed {elapsedSeconds}s &bull; usually 5–10s
      </p>

      {/* Transaction context */}
      <p className="text-center font-semibold" style={{ fontSize: 15, color: 'var(--wex-text-primary)', marginBottom: 2 }}>
        {transaction.merchant} &bull; {transaction.amount}
      </p>
      <p className="text-center text-xs" style={{ color: 'var(--wex-text-muted)' }}>
        Stage {stageIndex + 1}/{SCAN_STAGES.length} &bull; ETA {Math.max(totalEstimateSeconds - elapsedSeconds, 0)}s
      </p>
    </div>
  )
}




