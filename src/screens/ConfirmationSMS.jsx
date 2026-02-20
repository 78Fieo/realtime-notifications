export default function ConfirmationSMS({ transaction }) {
  return (
    <div className="lock-screen">
      {/* Time Display */}
      <div className="lock-time">9:42</div>
      <div className="lock-date">Tuesday, December 11</div>

      {/* Confirmation SMS */}
      <div className="notification-card">
        <div className="flex items-start gap-3">
          {/* App Icon Placeholder */}
          <div className="w-10 h-10 border-2 dashed border-gray-400 rounded-lg flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
            WEX
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm text-gray-800">WEX Benefits</span>
              <span className="text-xs text-gray-500">just now</span>
            </div>
            
            {/* Message */}
            <p className="text-sm text-gray-700 leading-snug">
              Your <strong>{transaction.amount}</strong> receipt for <strong>{transaction.merchant}</strong> was verified. No action needed.
            </p>
          </div>
        </div>
      </div>

      {/* Fake Lock Screen Elements */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="mx-auto w-32 h-1 bg-gray-400 rounded-full opacity-50"></div>
      </div>
    </div>
  )
}








