export default function SMSTrigger({ transaction, onTapLink }) {
  return (
    <div className="lock-screen">
      {/* Time Display */}
      <div className="lock-time">9:41</div>
      <div className="lock-date">Tuesday, December 11</div>

      {/* SMS Notification */}
      <div className="notification-card cursor-pointer hover:bg-gray-100 transition-colors" onClick={onTapLink}>
        <div className="flex items-start gap-3">
          {/* App Icon Placeholder */}
          <div className="w-10 h-10 border-2 dashed border-gray-400 rounded-lg flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
            WEX
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm text-gray-800">WEX Benefits</span>
              <span className="text-xs text-gray-500">now</span>
            </div>
            
            {/* Message */}
            <p className="text-sm text-gray-700 leading-snug">
              Your <strong>{transaction.amount}</strong> charge at <strong>{transaction.merchant}</strong> requires a receipt.
            </p>
            <p className="text-sm text-blue-600 underline mt-1">
              Click here to upload →
            </p>
          </div>
        </div>
      </div>

      {/* Context Label */}
      <div className="mx-5 mt-8 p-3 border-2 border-dashed border-gray-400 bg-white/50">
        <p className="text-xs text-gray-600 text-center">
          <strong>BEFORE:</strong> User receives this SMS ~10 seconds after card swipe at merchant.
          <br />
          <span className="text-gray-500">Tap the notification to continue →</span>
        </p>
      </div>

      {/* Fake Lock Screen Elements */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="mx-auto w-32 h-1 bg-gray-400 rounded-full opacity-50"></div>
      </div>
    </div>
  )
}








