import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

export default function Success({ transaction, onContinue }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Success Icon with ripple rings */}
      <div className="success-ripple-wrap">
        <div className="success-ring" aria-hidden="true" />
        <div className="success-ring success-ring-2" aria-hidden="true" />
        <div className="success-ring success-ring-3" aria-hidden="true" />
        <div className="status-icon status-icon-success" aria-label="Success status">
          <StatusGlyph type="success" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt Verified
      </h1>
      <p className="text-gray-600 mb-6">
        You're all set! Your claim is approved.
      </p>

      {/* Confirmation Details */}
      <div className="wire-card text-left">
        <p className="text-sm text-gray-600">
          Verified for this purchase:
        </p>
        <div className="mt-3 pt-3 border-t border-dashed border-gray-300">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Merchant</span>
            <span className="text-base font-medium text-gray-800">{transaction.merchant}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Amount</span>
            <span className="text-base font-medium text-gray-800">{transaction.amount}</span>
          </div>
        </div>
      </div>

      {/* Close / Continue Button */}
      <button 
        className="wire-btn wire-btn-primary mt-6"
        onClick={onContinue}
      >
        Close
      </button>

    </div>
  )
}





