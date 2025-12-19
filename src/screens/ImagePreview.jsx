export default function ImagePreview({ transaction, onConfirm, onCancel }) {
  return (
    <div className="phone-content">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-2 border-2 border-dashed border-gray-400 text-sm text-gray-500">
          [ EMPLOYER LOGO ]
        </div>
      </div>

      {/* Preview Heading */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Preview of image
      </h1>

      {/* Image Preview */}
      <div className="wire-card">
        <div className="aspect-[3/4] bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-4">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📄</div>
            <div className="text-sm">[ Selected Image ]</div>
            <div className="text-xs text-gray-400 mt-1">receipt_photo.jpg</div>
          </div>
        </div>

        {/* Requirements Copy */}
        <div className="bg-gray-100 border border-dashed border-gray-300 p-3 text-sm text-gray-600">
          <p className="font-medium mb-2">Before uploading, please confirm:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Image is less than 4 MB</li>
            <li>Receipt shows date of service</li>
            <li>Receipt shows provider/merchant name</li>
            <li>Receipt shows amount paid</li>
          </ul>
        </div>
      </div>

      {/* Transaction Context */}
      <div className="text-center text-sm text-gray-500 my-4">
        For: {transaction.merchant} • {transaction.amount}
      </div>

      {/* Actions */}
      <button
        className="wire-btn wire-btn-primary"
        onClick={onConfirm}
      >
        Yes, upload my receipt
      </button>

      <button
        className="wire-btn wire-btn-ghost mt-3"
        onClick={onCancel}
      >
        Cancel
      </button>

      {/* Context Label */}
      <div className="mt-6 p-3 border-2 border-dashed border-gray-300 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          <strong>IMAGE PREVIEW</strong> — Confirmation before upload
          <br />
          <span className="text-gray-400">
            Token still valid. Cancel → back to method modal.
          </span>
        </p>
      </div>

      {/* UX Question */}
      <div className="mt-4 p-3 border-2 border-dashed border-yellow-300 bg-yellow-50">
        <p className="text-xs text-yellow-700 text-center">
          <strong>💡 DESIGN QUESTION:</strong> Should user be able to crop/rotate here?
          <br />
          <span className="text-yellow-600">
            Or is that over-engineering for MVP?
          </span>
        </p>
      </div>
    </div>
  )
}









