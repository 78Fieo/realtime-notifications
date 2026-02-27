import { useBrand } from '../context/BrandContext'

export default function SMSMessageThread({ onTapUploadLink }) {
  const { brand } = useBrand()
  const messageBody = `${brand.smsLabel}: A debit card transaction has been processed for $80.00 on 2/26/2026 at City Chiropractic, Minneapolis, US.`

  return (
    <div className="messages-app">
      <div className="messages-topbar">
        <div className="messages-top-row">
          <span className="messages-back">Messages</span>
          <span className="messages-contact">+1 (612) 555-0148</span>
          <span className="messages-meta">Details</span>
        </div>
      </div>

      <div className="messages-thread">
        <p className="messages-date-stamp">Today 9:41 AM</p>

        <div className="message-bubble incoming">
          <p>{messageBody}</p>
          <p>
            Your purchase needs a receipt to complete verification.{' '}
            <button
              className="inline-message-link"
              onClick={onTapUploadLink}
              type="button"
            >
              Upload receipt now
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
