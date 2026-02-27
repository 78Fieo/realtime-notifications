import { useEffect, useState } from 'react'
import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

const ERROR_TYPES = {
  BLURRY: {
    title: 'Photo is too blurry',
    message: 'We couldn\'t read the text on your receipt. Please retake the photo with better lighting.',
    tip: 'Tip: Hold your phone steady and make sure the receipt is flat.',
  },
  NO_DATE: {
    title: 'Missing date',
    message: 'We couldn\'t find a date on this receipt. Make sure the full receipt is visible.',
    tip: 'Tip: Include the top of the receipt where the date is usually printed.',
  },
  NO_AMOUNT: {
    title: 'Amount not found',
    message: 'We couldn\'t find the total amount. Please capture the entire receipt.',
    tip: 'Tip: Make sure the total/amount paid is visible in the photo.',
  },
  NOT_RECEIPT: {
    title: 'Not a receipt',
    message: 'This doesn\'t appear to be a receipt. Please upload a photo of your receipt.',
    tip: 'Tip: We need the itemized receipt from the merchant, not a credit card statement.',
  },
  DOG_PHOTO: {
    title: 'That image is not a receipt',
    message: 'We could not detect receipt details in this image.',
    tip: 'Tip: Upload a clear photo of the full receipt from the merchant.',
  },
}

export default function SpecificError({ transaction, errorType = 'BLURRY', onRetry, onCancel }) {
  const error = ERROR_TYPES[errorType] || ERROR_TYPES.BLURRY
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(false)
    const timer = window.setTimeout(() => setIsVisible(true), 40)
    return () => window.clearTimeout(timer)
  }, [errorType])

  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Error Icon */}
      <div className="status-icon status-icon-error mx-auto">
        <StatusGlyph type="error" />
      </div>

      {/* Error Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        {error.title}
      </h1>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Status: Action required</p>

      {/* Error Message */}
      <div className={`wire-card text-left motion-reveal ${isVisible ? 'is-visible' : ''}`} style={{ borderColor: 'var(--wex-brand-yellow)', background: 'rgba(255, 188, 0, 0.12)' }}>
        <p className="text-sm text-gray-700">
          {error.message}
        </p>
        <p className="text-sm text-gray-600 mt-3 italic">
          {error.tip}
        </p>
      </div>

      {/* Transaction Context */}
      <div className="wire-card text-left mt-4">
        <p className="text-xs text-gray-500">For transaction:</p>
        <p className="text-base font-medium mt-1">
          <span className="text-gray-800">{transaction.merchant} • {transaction.amount}</span>
        </p>
      </div>

      {/* Primary Action */}
      <button
        className="wire-btn wire-btn-primary mt-6"
        onClick={onRetry}
      >
        Upload New Photo
      </button>

      {/* Secondary Action */}
      <button
        className="text-sm text-gray-500 underline mt-3 block mx-auto"
        onClick={onCancel}
      >
        I'll do this later
      </button>

    </div>
  )
}


