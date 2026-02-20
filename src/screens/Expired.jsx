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
        <span className="text-2xl">EX</span>
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
          Receipt upload links currently expire after <strong>4 days</strong>.
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

    </div>
  )
}







