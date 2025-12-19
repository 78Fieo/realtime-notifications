export default function SuccessNotSubstantiated({ transaction }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Success Icon (but with warning tint) */}
      <div className="status-icon mx-auto" style={{ borderColor: '#666', background: '#fff3cd' }}>
        <span className="text-2xl">⚠️</span>
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt Uploaded
      </h1>
      
      {/* Warning Card */}
      <div className="wire-card text-left" style={{ borderColor: '#ffc107', background: '#fffbeb' }}>
        <p className="text-sm text-gray-700">
          Your receipt has been uploaded successfully but <strong>your claim could not be substantiated</strong>.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Additional action may be required.
        </p>
      </div>

      {/* Transaction Details */}
      <div className="wire-card text-left mt-4">
        <p className="text-xs text-gray-500 mb-2">Transaction:</p>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Merchant</span>
          <span className="font-medium">{transaction.merchant}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Amount</span>
          <span className="font-medium">{transaction.amount}</span>
        </div>
      </div>

      {/* Close Message */}
      <p className="text-sm text-gray-500 mt-6">
        You may now close this page.
      </p>

      {/* Context Label */}
      <div className="mt-6 p-3 border-2 border-dashed border-yellow-300 bg-yellow-50">
        <p className="text-xs text-yellow-700 text-center">
          <strong>SUCCESS (NOT SUBSTANTIATED)</strong> — Per dev spec 5B
          <br /><br />
          <span className="text-yellow-600">
            Upload succeeded. Image saved to portal + receipt organizer.
            <br />
            Token <strong>EXPIRES</strong> — user can't retry.
            <br /><br />
            Reasons: receipt not valid, OR ClaimsAI processing issue.
          </span>
        </p>
      </div>

      {/* UX Question */}
      <div className="mt-4 p-3 border-2 border-dashed border-red-300 bg-red-50">
        <p className="text-xs text-red-700 text-center">
          <strong>⚠️ UX CONCERN:</strong> This feels like a dead end.
          <br />
          <span className="text-red-600">
            "Additional action may be required" — but WHAT action?
            <br />
            Should we link to portal? Explain next steps?
          </span>
        </p>
      </div>
    </div>
  )
}









