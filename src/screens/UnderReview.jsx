export default function UnderReview({ transaction }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Status Icon */}
      <div className="status-icon mx-auto" style={{ borderColor: 'var(--wex-brand-blue-accent)', background: 'rgba(28, 110, 255, 0.1)' }}>
        <span className="text-2xl">IN</span>
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt Under Review
      </h1>
      
      {/* Clear Explanation */}
      <div className="wire-card text-left">
        <p className="text-sm text-gray-700">
          Your receipt was uploaded successfully.
        </p>
        <p className="text-sm text-gray-600 mt-3">
          Our team will review it within <strong>2 business days</strong>.
        </p>
        <p className="text-sm text-gray-600 mt-3">
          We'll notify you if we need anything else.
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






