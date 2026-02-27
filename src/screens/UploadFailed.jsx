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
        Receipt could not be saved
      </h1>

      {/* Error Card */}
      <div className={`wire-card text-left motion-reveal ${isVisible ? 'is-visible' : ''}`} style={{ borderColor: '#dc3545', background: '#fff5f5' }}>
        <p className="text-sm text-gray-700">
          There was a problem uploading your receipt.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Please try again or log in to your online benefits account.
        </p>
      </div>

      {/* Possible Causes */}
      <div className="wire-card text-left mt-4">
        <p className="text-xs text-gray-500 mb-2">This could be because:</p>
        <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
          <li>File size too large (max 4 MB)</li>
          <li>Image file is corrupted</li>
          <li>Network connection issue</li>
        </ul>
      </div>

      {/* Retry CTA */}
      <button
        className="wire-btn wire-btn-primary mt-6"
        onClick={onRetry}
      >
        Retry Upload Image
      </button>

      <button className="wire-btn wire-btn-ghost mt-3">
        I will do this later
      </button>

      {/* Attempt Counter */}
      <p className="text-xs text-gray-400 mt-3">
        Attempt {Math.max(1, attemptCount)} of 3
      </p>

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}






