export default function Expired() {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Lock Icon */}
      <div className="status-icon status-icon-error mx-auto">
        <span className="text-2xl">🔒</span>
      </div>

      {/* Expired Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Link Expired
      </h1>
      <p className="text-gray-600 mb-6">
        For your security, this link is no longer active.
      </p>

      {/* Explanation */}
      <div className="wire-card text-left mb-6">
        <p className="text-sm text-gray-600">
          Receipt upload links expire after <strong>4 days</strong> for security purposes.
        </p>
        <p className="text-sm text-gray-600 mt-3">
          To upload your receipt, please log in to the benefits portal.
        </p>
      </div>

      {/* CTA to Portal */}
      <button className="wire-btn wire-btn-primary">
        Go to Benefits Portal
      </button>

      <p className="text-xs text-gray-400 mt-3">
        [ Opens login page ]
      </p>

      {/* Context Label */}
      <div className="mt-8 p-3 border-2 border-dashed border-gray-300 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          <strong>EXPIRED STATE</strong> — Edge case (clicked after 4 days)
          <br /><br />
          <span className="text-gray-400">
            PRD specifies 4-day expiration (96 hours).
            <br />
            User must fall back to full portal login.
          </span>
        </p>
      </div>

      {/* UX Question */}
      <div className="mt-4 p-3 border-2 border-dashed border-yellow-300 bg-yellow-50">
        <p className="text-xs text-yellow-700 text-center">
          <strong>💡 UX QUESTION:</strong> Should we show <em>which</em> transaction expired?
          <br />
          Or is that a security risk?
        </p>
      </div>
    </div>
  )
}









