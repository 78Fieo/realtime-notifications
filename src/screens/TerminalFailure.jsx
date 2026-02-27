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
        Upload Unsuccessful
      </h1>

      {/* Error Card - No Retry */}
      <div className="wire-card text-left" style={{ borderColor: '#dc3545', background: '#fff5f5' }}>
        <p className="text-sm text-gray-700">
          We weren't able to save your receipt after several tries. We apologize for the inconvenience.
        </p>
        <p className="text-sm text-gray-600 mt-3">
          Log in to the benefits portal to upload your receipt and complete verification.
        </p>
      </div>

      {/* Portal Link */}
      <button className="wire-btn wire-btn-primary mt-6">
        Go to Benefits Portal
      </button>

      <button className="wire-btn wire-btn-ghost mt-3">
        I'll do this later
      </button>

      {/* Transaction Reminder */}
      <div className="mt-4 text-xs text-gray-400">
        Transaction: {transaction.merchant} • {transaction.amount}
      </div>
    </div>
  )
}







