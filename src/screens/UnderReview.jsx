import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

export default function UnderReview({ transaction }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Status Icon */}
      <div className="status-icon status-icon-review mx-auto">
        <StatusGlyph type="review" />
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt Under Review
      </h1>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Status: Review in progress</p>
      
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
          <span className="text-base font-medium text-gray-800">{transaction.merchant}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-500">Amount</span>
          <span className="text-base font-medium text-gray-800">{transaction.amount}</span>
        </div>
      </div>

      {/* Close Message */}
      <p className="text-sm text-gray-500 mt-6">
        You may now close this page.
      </p>

    </div>
  )
}



