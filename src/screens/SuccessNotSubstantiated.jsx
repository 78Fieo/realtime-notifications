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
        <span className="text-2xl">RV</span>
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

    </div>
  )
}








