import BrandHeader from '../components/BrandHeader'

export default function ImagePreview({ transaction, onConfirm, onCancel }) {
  return (
    <div className="phone-content">
      {/* Header */}
      <BrandHeader />

      {/* Preview Heading */}
      <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Preview of image
      </h1>

      {/* Image Preview */}
      <div className="wire-card">
        <div className="aspect-[4/3] max-h-48 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center mb-4 overflow-hidden">
          <div className="text-center text-gray-500">
            <div className="text-lg font-semibold mb-2">Image</div>
            <div className="text-sm">Selected image</div>
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

    </div>
  )
}






