const ERROR_MESSAGES = [
  { 
    title: "We couldn't read that",
    detail: "The image appears to be too blurry. Please retake the photo.",
    icon: "📷"
  },
  { 
    title: "No receipt detected",
    detail: "We couldn't find a receipt in that image. Please try again with a clear photo of your receipt.",
    icon: "🔍"
  },
  { 
    title: "Missing date",
    detail: "We couldn't find a date on this receipt. Make sure the full receipt is visible.",
    icon: "📅"
  },
]

export default function SoftError({ transaction, onRetry, onForceSubmit, retryCount }) {
  // Cycle through different error messages based on retry count
  const error = ERROR_MESSAGES[retryCount % ERROR_MESSAGES.length]
  const showForceSubmit = retryCount >= 1 // Show after first retry

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

      {/* Error Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        {error.title}
      </h1>
      <p className="text-gray-600 mb-6">
        {error.detail}
      </p>

      {/* Transaction Context */}
      <div className="wire-card text-left mb-6">
        <p className="text-xs text-gray-500 mb-2">Transaction:</p>
        <p className="text-sm font-medium">
          {transaction.merchant} • {transaction.amount}
        </p>
      </div>

      {/* Primary Action - Retry */}
      <button 
        className="wire-btn wire-btn-primary"
        onClick={onRetry}
      >
        [ 📷 ]  Retake Photo
      </button>

      {/* Secondary Action - Force Submit (after 1+ retries) */}
      {showForceSubmit && (
        <button 
          className="wire-btn wire-btn-ghost mt-3"
          onClick={onForceSubmit}
        >
          It is a receipt — submit anyway
        </button>
      )}

      {/* Context Labels */}
      <div className="mt-8 p-3 border-2 border-dashed border-orange-300 bg-orange-50">
        <p className="text-xs text-orange-700 text-center">
          <strong>SOFT ERROR STATE</strong> — AI detected an issue.
          <br /><br />
          <span className="text-orange-600">
            This is real-time validation. User can retry immediately.
            <br />
            {showForceSubmit ? (
              <em>"Force Submit" appears after {retryCount}+ retries (flags for human review)</em>
            ) : (
              <em>"Force Submit" will appear after 1 retry to prevent frustration</em>
            )}
          </span>
        </p>
      </div>

      {/* Retry Counter */}
      <p className="text-xs text-gray-400 mt-3">
        Retry attempt: {retryCount + 1}
      </p>
    </div>
  )
}








