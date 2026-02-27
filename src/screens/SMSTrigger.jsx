import { useEffect, useRef, useState } from 'react'
import { useBrand } from '../context/BrandContext'

const SYNC_STATES = {
  IDLE: 'idle',
  PULLING: 'pulling',
  READY: 'ready',
  SYNCING: 'syncing',
  DONE: 'done',
}

export default function SMSTrigger({ transaction, onTapLink }) {
  const { brand } = useBrand()
  const [showNotification, setShowNotification] = useState(false)
  const [isRead, setIsRead] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [syncState, setSyncState] = useState(SYNC_STATES.IDLE)
  const startYRef = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowNotification(true), 160)
    return () => window.clearTimeout(timer)
  }, [])

  const handleTapNotification = () => {
    setIsRead(true)
    setIsExiting(true)
    window.setTimeout(onTapLink, 170)
  }

  const handleTouchStart = (event) => {
    startYRef.current = event.touches[0]?.clientY || null
  }

  const handleTouchMove = (event) => {
    if (syncState === SYNC_STATES.SYNCING) return

    const currentY = event.touches[0]?.clientY
    if (startYRef.current == null || currentY == null) return

    const delta = Math.max(0, currentY - startYRef.current)
    const nextDistance = Math.min(delta, 88)
    setPullDistance(nextDistance)

    if (nextDistance >= 56) {
      setSyncState(SYNC_STATES.READY)
    } else if (nextDistance > 8) {
      setSyncState(SYNC_STATES.PULLING)
    } else {
      setSyncState(SYNC_STATES.IDLE)
    }
  }

  const handleTouchEnd = () => {
    startYRef.current = null

    if (syncState === SYNC_STATES.READY) {
      setSyncState(SYNC_STATES.SYNCING)
      setPullDistance(56)

      window.setTimeout(() => {
        setSyncState(SYNC_STATES.DONE)
        setPullDistance(0)
        window.setTimeout(() => setSyncState(SYNC_STATES.IDLE), 900)
      }, 900)
      return
    }

    setPullDistance(0)
    setSyncState(SYNC_STATES.IDLE)
  }

  const syncLabel = {
    [SYNC_STATES.IDLE]: 'Pull to refresh',
    [SYNC_STATES.PULLING]: 'Keep pulling',
    [SYNC_STATES.READY]: 'Release to refresh',
    [SYNC_STATES.SYNCING]: 'Refreshing...',
    [SYNC_STATES.DONE]: 'Up to date',
  }[syncState]

  const fullSMSMessage = `${brand.smsLabel}: A debit card transaction has been processed for ${transaction.amount} on 2/26/2026 at City Chiropractic, Minneapolis, US. Your purchase needs a receipt to complete verification. Upload receipt now`
  const truncatedSMSMessage = fullSMSMessage.length > 178 ? `${fullSMSMessage.slice(0, 175).trimEnd()}...` : fullSMSMessage

  return (
    <div
      className="lock-screen notification-feed"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className={`pull-indicator ${syncState}`} style={{ transform: `translateY(${pullDistance * 0.65}px)` }}>
        <span className="pull-indicator-dot" />
        <span>{syncLabel}</span>
      </div>

      {/* Time Display */}
      <div className="lock-time">9:41</div>
      <div className="lock-date">Tuesday, December 11</div>

      {!showNotification ? (
        <div className="notification-empty-state" aria-live="polite">
          No new notifications
        </div>
      ) : null}

      {/* SMS Notification */}
      {showNotification ? (
        <div
          className={`notification-card motion-notification ${isRead ? 'is-read' : 'is-unread'} ${isExiting ? 'is-exiting' : 'is-visible'}`}
          onClick={handleTapNotification}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleTapNotification()
            }
          }}
          tabIndex={0}
          role="list"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex items-start gap-3">
            {/* iMessage-style app icon */}
            <div className="sms-app-icon flex-shrink-0" aria-hidden="true">
              <svg viewBox="0 0 24 24" role="presentation" focusable="false">
                <path d="M4 5.5A3.5 3.5 0 0 1 7.5 2h9A3.5 3.5 0 0 1 20 5.5v7A3.5 3.5 0 0 1 16.5 16H10l-3.8 3.2a.75.75 0 0 1-1.2-.58V16.8A3.5 3.5 0 0 1 4 13.5v-8Z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0" role="listitem" aria-label="Unread notification, receipt verification needed">
              {/* Header */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-gray-800">+1 (612) 555-0148</span>
                  {!isRead ? <span className="notification-unread-dot" aria-hidden="true" /> : null}
                </div>
                <span className="text-xs text-gray-500">now</span>
              </div>

              {/* Message */}
              <p className="text-sm text-gray-700 leading-snug notification-preview-text">
                {truncatedSMSMessage}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Fake Lock Screen Elements */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="mx-auto w-32 h-1 rounded-full opacity-50" style={{ background: 'var(--wex-brand-blue)' }} />
      </div>
    </div>
  )
}
