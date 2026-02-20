export default function UploadMethodModal({ onSelect, onCancel }) {
  const methods = [
    { id: 'documents', label: 'Documents', icon: 'DOC', desc: 'Browse files' },
    { id: 'camera', label: 'Camera', icon: 'CAM', desc: 'Take a photo' },
    { id: 'photos', label: 'Photos', icon: 'LIB', desc: 'Choose from gallery' },
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

    </div>
  )
}








