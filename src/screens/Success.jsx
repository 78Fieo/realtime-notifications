export default function Success({ transaction, onContinue }) {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Success Icon */}
      <div className="status-icon status-icon-success mx-auto">
        <span className="text-2xl">OK</span>
      </div>

      {/* Success Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Receipt Received
      </h1>
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
            <span className="font-medium">{transaction.merchant}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-500">Amount</span>
            <span className="font-medium">{transaction.amount}</span>
          </div>
        </div>
      </div>

      {/* Close / Continue Button */}
      <button 
        className="wire-btn mt-6"
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








