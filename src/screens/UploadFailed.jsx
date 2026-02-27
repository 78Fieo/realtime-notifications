import { useEffect, useState } from 'react'
import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

export default function UploadFailed({ transaction, onRetry, attemptCount }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 40)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Error Icon */}
      <div className="status-icon status-icon-error mx-auto">
        <StatusGlyph type="error" />
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Upload Didn't Go Through
      </h1>

      {/* Error Card */}
      <div className={`wire-card text-left motion-reveal ${isVisible ? 'is-visible' : ''}`} style={{ borderColor: '#dc3545', background: '#fff5f5' }}>
        <p className="text-sm text-gray-700">
          Your receipt couldn't be uploaded. This is usually caused by:
        </p>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 mt-2">
          <li>File size over 4 MB</li>
          <li>File may be unreadable or damaged</li>
          <li>Unstable internet connection</li>
        </ul>
      </div>

      {/* Retry CTA */}
      <button
        className="wire-btn wire-btn-primary mt-6"
        onClick={onRetry}
      >
        Try Again
      </button>

      <button className="wire-btn wire-btn-ghost mt-3">
        I'll do this later
      </button>

      {/* Attempt Counter - only show on attempt 2+ */}
      {attemptCount > 1 && (
        <p className="text-xs text-gray-400 mt-3">
          Attempt {attemptCount} of 3 — {3 - attemptCount} {3 - attemptCount === 1 ? 'try' : 'tries'} remaining
        </p>
      )}

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}






