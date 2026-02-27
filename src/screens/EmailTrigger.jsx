import BrandHeader from '../components/BrandHeader'

export default function EmailTrigger({ transaction, onOpenLink }) {
  return (
    <div className="lock-screen">
      <div className="phone-content relative">
        <BrandHeader />
        <div className="wire-card">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-800">Inbox</p>
            <p className="text-xs text-gray-500">9:41 AM</p>
          </div>

          <div className="p-3 border border-gray-200 rounded bg-gray-50">
            <p className="text-xs text-gray-500">From: WEX Benefits</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">
              Receipt needed for your {transaction.amount} purchase
            </p>
            <p className="text-sm text-gray-700 mt-3">
              Your <strong>{transaction.amount}</strong> purchase at <strong>{transaction.merchant}</strong> needs a receipt.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              Upload your receipt to verify this purchase for your FSA or HSA account.
            </p>
            <button
              className="wire-btn wire-btn-primary mt-4"
              onClick={onOpenLink}
            >
              Upload Receipt
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto w-32 h-1 rounded-full opacity-50" style={{ background: 'var(--wex-brand-blue)' }} />
        </div>
      </div>
    </div>
  )
}
