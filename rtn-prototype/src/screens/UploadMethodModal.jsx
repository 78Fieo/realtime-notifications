export default function UploadMethodModal({ onSelect, onCancel }) {
  const methods = [
    { id: 'documents', label: 'Documents', icon: '📄', desc: 'Browse files' },
    { id: 'camera', label: 'Camera', icon: '📷', desc: 'Take a photo' },
    { id: 'photos', label: 'Photos', icon: '🖼️', desc: 'Choose from gallery' },
  ]

  return (
    <div className="phone-content">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Modal Card */}
      <div className="wire-card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          Choose upload method
        </h2>

        <div className="space-y-3">
          {methods.map((method) => (
            <button
              key={method.id}
              className="wire-btn flex items-center gap-4 text-left"
              onClick={() => onSelect(method.id)}
            >
              <span className="text-2xl">{method.icon}</span>
              <div>
                <div className="font-medium">{method.label}</div>
                <div className="text-xs text-gray-500">{method.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Cancel */}
        <button
          className="wire-btn wire-btn-ghost mt-4"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>

      {/* Context Label */}
      <div className="mt-6 p-3 border-2 border-dashed border-gray-300 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          <strong>UPLOAD METHOD MODAL</strong> — Per dev spec
          <br />
          <span className="text-gray-400">
            Token still valid. Cancel returns to landing.
          </span>
        </p>
      </div>

      {/* UX Note */}
      <div className="mt-4 p-3 border-2 border-dashed border-blue-300 bg-blue-50">
        <p className="text-xs text-blue-700 text-center">
          <strong>💡 UX NOTE:</strong> OS will handle actual file/camera picker.
          <br />
          <span className="text-blue-600">
            This modal just determines which native flow to invoke.
          </span>
        </p>
      </div>
    </div>
  )
}








