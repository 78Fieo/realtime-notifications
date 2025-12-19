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
        <span className="text-2xl">🚫</span>
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

      {/* Context Label */}
      <div className="mt-6 p-3 border-2 border-dashed border-red-400 bg-red-50">
        <p className="text-xs text-red-700 text-center">
          <strong>TERMINAL FAILURE</strong> — Per dev spec 5D
          <br /><br />
          <span className="text-red-600">
            Token <strong>EXPIRED</strong> — no more retries from this link.
            <br />
            User must use standard portal login flow.
          </span>
        </p>
      </div>

      {/* UX Note */}
      <div className="mt-4 p-3 border-2 border-dashed border-yellow-300 bg-yellow-50">
        <p className="text-xs text-yellow-700 text-center">
          <strong>💡 UX QUESTION:</strong> Should we preserve transaction context in portal handoff?
          <br />
          <span className="text-yellow-600">
            Deep link to specific claim in portal? Or generic login?
          </span>
        </p>
      </div>

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        Original transaction: {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}









