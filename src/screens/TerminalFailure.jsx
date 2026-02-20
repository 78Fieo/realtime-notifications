export default function TerminalFailure({ transaction }) {
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
        <span className="text-2xl">ER</span>
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt could not be saved
      </h1>

      {/* Error Card - No Retry */}
      <div className="wire-card text-left" style={{ borderColor: '#dc3545', background: '#fff5f5' }}>
        <p className="text-sm text-gray-700">
          We were unable to save your receipt after multiple attempts.
        </p>
        <p className="text-sm text-gray-700 mt-3">
          <strong>Additional action is required.</strong>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Please log in to your online benefits account to upload your receipt.
        </p>
      </div>

      {/* Portal Link */}
      <button className="wire-btn wire-btn-primary mt-6">
        Go to Benefits Portal
      </button>

      <p className="text-xs text-gray-400 mt-3">
        [ Opens login page ]
      </p>

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        Original transaction: {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}








