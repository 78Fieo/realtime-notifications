import { useBrand } from '../context/BrandContext'

export default function EmailTrigger({ transaction, onOpenLink }) {
  const { brand } = useBrand()

  return (
    <div className="mail-app">
      <div className="mail-topbar">
        <div className="mail-top-row">
          <span className="mail-nav">Mailboxes</span>
          <span className="mail-title">Inbox</span>
          <span className="mail-edit">Edit</span>
        </div>
      </div>

      <div className="mail-content">
        <div className="mail-meta-line">
          <span>Today</span>
          <span>9:41 AM</span>
        </div>

        <div className="mail-card">
          <p className="mail-from">{brand.senderName}</p>
          <h2 className="mail-subject">Receipt needed for your {transaction.amount} purchase</h2>
          <p className="mail-preview">to you</p>

          <div className="mail-body">
            <p>Your {transaction.amount} purchase at {transaction.merchant} needs a receipt to complete verification.</p>
            <p>Upload your receipt to verify this purchase for your FSA or HSA account.</p>
          </div>

          <button
            className="wire-btn wire-btn-primary mt-4"
            onClick={onOpenLink}
          >
            Upload Receipt
          </button>
        </div>

        <div className="mail-home-indicator" aria-hidden="true" />
      </div>
    </div>
  )
}
