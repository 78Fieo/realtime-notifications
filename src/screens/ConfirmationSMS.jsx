import { useEffect, useState } from 'react'

export default function ConfirmationSMS({ transaction }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 120)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="lock-screen">
      {/* Time Display */}
      <div className="lock-time">9:42</div>
      <div className="lock-date">Tuesday, December 11</div>

      {/* Confirmation SMS */}
      <div className={`notification-card motion-notification ${isVisible ? 'is-visible' : ''}`}>
        <div className="flex items-start gap-3">
          {/* iMessage-style app icon */}
          <div className="sms-app-icon flex-shrink-0" aria-hidden="true">
            <svg viewBox="0 0 24 24" role="presentation" focusable="false">
              <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2h9A3.5 3.5 0 0 1 20 5.5v7A3.5 3.5 0 0 1 16.5 16H10l-3.8 3.2a.75.75 0 0 1-1.2-.58V16.8A3.5 3.5 0 0 1 4 13.5v-8Z" />
            </svg>
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm text-gray-800">+1 (612) 555-0148</span>
              <span className="text-xs text-gray-500">just now</span>
            </div>
            
            {/* Message */}
            <p className="text-sm text-gray-700 leading-snug">
              We verified your <strong>{transaction.amount}</strong> purchase at <strong>{transaction.merchant}</strong>. You're all set!
            </p>
          </div>
        </div>
      </div>

      {/* Fake Lock Screen Elements */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="mx-auto w-32 h-1 rounded-full opacity-50" style={{ background: 'var(--wex-brand-blue)' }}></div>
      </div>
    </div>
  )
}


