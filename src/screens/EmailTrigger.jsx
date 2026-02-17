export default function EmailTrigger({ transaction, onOpenLink }) {
  return (
    <div className="phone-content">
      <div className="wire-card">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-gray-800">Inbox</p>
          <p className="text-xs text-gray-500">9:41 AM</p>
        </div>

        <div className="p-3 border border-gray-200 rounded bg-gray-50">
          <p className="text-xs text-gray-500">From: WEX Benefits</p>
          <p className="text-sm font-semibold text-gray-800 mt-1">
            Receipt needed for recent card purchase
          </p>
          <p className="text-sm text-gray-700 mt-3">
            Your <strong>{transaction.amount}</strong> purchase at <strong>{transaction.merchant}</strong> needs a receipt.
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Please upload your receipt to avoid follow-up issues.
          </p>
          <button
            className="wire-btn wire-btn-primary mt-4"
            onClick={onOpenLink}
          >
            Upload Receipt
          </button>
        </div>
      </div>

      <div className="mt-6 p-3 border-2 border-dashed border-gray-300 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          <strong>BEFORE:</strong> Email entry point (placeholder copy).
          <br />
          <span className="text-gray-500">Tap Upload Receipt to continue to the same landing flow.</span>
        </p>
      </div>
    </div>
  )
}
