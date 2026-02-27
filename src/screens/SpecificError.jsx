import { useEffect, useState } from 'react'
import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

const ERROR_TYPES = {
  BLURRY: {
    title: 'Image unclear',
    message: 'We can\'t read the text on this image. Retake the photo in good lighting with the receipt flat.',
    tip: 'Tip: Hold your phone steady and tap to focus before capturing.',
  },
  NO_DATE: {
    title: 'Date not found',
    message: 'We couldn\'t locate a date on this receipt. Capture the full receipt, including the top where the date is usually printed.',
    tip: 'Tip: The date is typically at the top of the receipt.',
  },
  NO_AMOUNT: {
    title: 'Amount not found',
    message: 'We couldn\'t find the total amount. Please capture the entire receipt, including the bottom where the total is usually shown.',
    tip: 'Tip: Make sure the total or amount paid is fully visible in the photo.',
  },
  NOT_RECEIPT: {
    title: 'Receipt not detected',
    message: 'This image doesn\'t show a receipt. Upload the itemized receipt from the merchant, not a credit card statement or invoice.',
    tip: 'Tip: We need the paper or digital receipt from the merchant, not a bank notification.',
  },
  DOG_PHOTO: {
    title: 'Receipt not detected',
    message: 'This image doesn\'t show a receipt. Upload the itemized receipt from the merchant, not a credit card statement or invoice.',
    tip: 'Tip: We need the paper or digital receipt from the merchant, not a bank notification.',
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
        Retake Photo
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


