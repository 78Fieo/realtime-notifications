import { useEffect, useState } from 'react'
import wexLogoRed from '../assets/wex_logo_red.svg'

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
          {/* App Icon Placeholder */}
          <div className="w-10 h-10 border border-gray-300 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <img src={wexLogoRed} alt="WEX" className="h-4 w-auto" />
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm text-gray-800">WEX Benefits</span>
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





