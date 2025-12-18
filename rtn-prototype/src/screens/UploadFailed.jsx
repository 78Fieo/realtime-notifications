export default function UploadFailed({ transaction, onRetry, attemptCount }) {
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
        <span className="text-2xl">❌</span>
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt could not be saved
      </h1>

      {/* Error Card */}
      <div className="wire-card text-left" style={{ borderColor: '#dc3545', background: '#fff5f5' }}>
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

      {/* Attempt Counter */}
      <p className="text-xs text-gray-400 mt-3">
        Attempt {attemptCount} of 3
      </p>

      {/* Context Label */}
      <div className="mt-6 p-3 border-2 border-dashed border-orange-300 bg-orange-50">
        <p className="text-xs text-orange-700 text-center">
          <strong>UPLOAD FAILED (RETRY ALLOWED)</strong> — Per dev spec 5C
          <br /><br />
          <span className="text-orange-600">
            Token <strong>STILL VALID</strong> — user can retry.
            <br />
            After multiple failures → terminal failure state.
          </span>
        </p>
      </div>

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}








