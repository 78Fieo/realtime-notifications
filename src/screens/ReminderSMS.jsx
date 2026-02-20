export default function ReminderSMS({ transaction, onTapLink }) {
  return (
    <div className="lock-screen">
      {/* Time Display */}
      <div className="lock-time">3:15</div>
      <div className="lock-date">Wednesday, December 12</div>

      {/* Reminder SMS */}
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
              Reminder: Upload your receipt for <strong>{transaction.merchant}</strong> ({transaction.amount}).
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Link expires in <strong>2 days</strong>.
            </p>
            <p className="text-sm text-blue-600 underline mt-1">
              Upload now
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








