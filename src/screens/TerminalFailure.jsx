import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

export default function TerminalFailure({ transaction }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Error Icon */}
      <div className="status-icon status-icon-error mx-auto">
        <StatusGlyph type="error" />
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

      <button className="wire-btn wire-btn-ghost mt-3">
        I will do this later
      </button>

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        Original transaction: {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}







