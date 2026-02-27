import BrandHeader from '../components/BrandHeader'
import StatusGlyph from '../components/StatusGlyph'

export default function Expired() {
  return (
    <div className="phone-content text-center">
      {/* Header */}
      <BrandHeader />

      {/* Lock Icon */}
      <div className="status-icon status-icon-error mx-auto">
        <StatusGlyph type="expired" />
      </div>

      {/* Expired Message */}
      <h1 className="text-xl font-semibold text-gray-800 mb-2">
        Link Expired
      </h1>
      <p className="text-gray-600 mb-6">
        For your security, this link expired after 4 days.
      </p>

      {/* Explanation */}
      <div className="wire-card text-left mb-6">
        <p className="text-sm text-gray-600">
          Log in to the benefits portal to upload your receipt and complete verification.
        </p>
      </div>

      {/* CTA to Portal */}
      <button className="wire-btn wire-btn-primary">
        Go to Benefits Portal
      </button>

    </div>
  )
}





