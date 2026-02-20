const ERROR_TYPES = {
  BLURRY: {
    icon: 'ER',
    title: 'Photo is too blurry',
    message: 'We couldn\'t read the text on your receipt. Please retake the photo with better lighting.',
    tip: 'Tip: Hold your phone steady and make sure the receipt is flat.',
  },
  NO_DATE: {
    icon: 'ER',
    title: 'Missing date',
    message: 'We couldn\'t find a date on this receipt. Make sure the full receipt is visible.',
    tip: 'Tip: Include the top of the receipt where the date is usually printed.',
  },
  NO_AMOUNT: {
    icon: 'ER',
    title: 'Amount not found',
    message: 'We couldn\'t find the total amount. Please capture the entire receipt.',
    tip: 'Tip: Make sure the total/amount paid is visible in the photo.',
  },
  NOT_RECEIPT: {
    icon: 'ER',
    title: 'Not a receipt',
    message: 'This doesn\'t appear to be a receipt. Please upload a photo of your receipt.',
    tip: 'Tip: We need the itemized receipt from the merchant, not a credit card statement.',
  },
  DOG_PHOTO: {
    icon: 'ER',
    title: 'That image is not a receipt',
    message: 'We could not detect receipt details in this image.',
    tip: 'Tip: Upload a clear photo of the full receipt from the merchant.',
  },
}

export default function SpecificError({ transaction, errorType = 'BLURRY', onRetry, onCancel }) {
  const error = ERROR_TYPES[errorType] || ERROR_TYPES.BLURRY

  return (
    <div className="phone-content text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Error Icon */}
      <div className="status-icon status-icon-error mx-auto">
        <span className="text-2xl">{error.icon}</span>
      </div>

      {/* Error Title */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        {error.title}
      </h1>

      {/* Error Message */}
      <div className="wire-card text-left" style={{ borderColor: 'var(--wex-brand-yellow)', background: 'rgba(255, 188, 0, 0.12)' }}>
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
        <p className="text-sm font-medium mt-1">
          {transaction.merchant} • {transaction.amount}
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






