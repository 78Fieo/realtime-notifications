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
        Receipt Received
      </h1>
      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Status: Complete</p>
      <p className="text-gray-600 mb-6">
        You're all set!
      </p>

      {/* Confirmation Details */}
      <div className="wire-card text-left">
        <p className="text-sm text-gray-600">
          We've matched this receipt to your expense:
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
        Done
      </button>

      <p className="text-xs text-gray-400 mt-3">
        You can safely close this window
      </p>

    </div>
  )
}





