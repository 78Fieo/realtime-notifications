import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

export default function SuccessNotSubstantiated({ transaction }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Success Icon (but with warning tint) */}
      <div className="status-icon status-icon-review mx-auto">
        <StatusGlyph type="review" />
      </div>

      {/* Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt Under Review
      </h1>
      
      {/* Warning Card */}
      <div className="wire-card text-left" style={{ borderColor: '#ffc107', background: '#fffbeb' }}>
        <p className="text-sm text-gray-700">
          We received your receipt and our team is reviewing it now.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          If we need any additional information, we'll contact you within 2 business days.
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

      {/* Close Button */}
      <button className="wire-btn wire-btn-primary mt-6">
        Close
      </button>

    </div>
  )
}





