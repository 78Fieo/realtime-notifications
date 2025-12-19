const ERROR_TYPES = {
  BLURRY: {
    icon: '📷',
    title: 'Photo is too blurry',
    message: 'We couldn\'t read the text on your receipt. Please retake the photo with better lighting.',
    tip: 'Tip: Hold your phone steady and make sure the receipt is flat.',
  },
  NO_DATE: {
    icon: '📅',
    title: 'Missing date',
    message: 'We couldn\'t find a date on this receipt. Make sure the full receipt is visible.',
    tip: 'Tip: Include the top of the receipt where the date is usually printed.',
  },
  NO_AMOUNT: {
    icon: '💵',
    title: 'Amount not found',
    message: 'We couldn\'t find the total amount. Please capture the entire receipt.',
    tip: 'Tip: Make sure the total/amount paid is visible in the photo.',
  },
  NOT_RECEIPT: {
    icon: '❓',
    title: 'Not a receipt',
    message: 'This doesn\'t appear to be a receipt. Please upload a photo of your receipt.',
    tip: 'Tip: We need the itemized receipt from the merchant, not a credit card statement.',
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
      <div className="wire-card text-left" style={{ borderColor: '#f59e0b', background: '#fffbeb' }}>
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
        <span className="mr-2">📷</span> Retake Photo
      </button>

      {/* Secondary Action */}
      <button
        className="text-sm text-gray-500 underline mt-3 block mx-auto"
        onClick={onCancel}
      >
        I'll do this later
      </button>

      {/* UX Improvement Note */}
      <div className="mt-6 p-3 border-2 border-dashed border-green-300 bg-green-50">
        <p className="text-xs text-green-700 text-center">
          <strong>✨ OPTIMAL UX</strong> — Specific, actionable errors
          <br />
          <span className="text-green-600">
            User knows EXACTLY what went wrong.
            <br />
            Includes helpful tip to fix the issue.
            <br />
            <em>Per PRD: Real-time AI feedback.</em>
          </span>
        </p>
      </div>

      {/* Comparison Note */}
      <div className="mt-4 p-3 border-2 border-dashed border-orange-300 bg-orange-50">
        <p className="text-xs text-orange-700 text-center">
          <strong>Compare to Dev Spec 5C:</strong>
          <br />
          <span className="text-orange-600">
            Was: "Receipt could not be saved" (generic)
            <br />
            Now: Specific problem + how to fix it
          </span>
        </p>
      </div>
    </div>
  )
}









