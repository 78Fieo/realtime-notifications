import { useState } from 'react'

export default function CameraPreview({ transaction, onUpload, onCancel }) {
  const [hasPhoto, setHasPhoto] = useState(false)

  const handleCapture = () => {
    // Simulate camera capture
    setHasPhoto(true)
  }

  const handleRetake = () => {
    setHasPhoto(false)
  }

  return (
    <div className="phone-content">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-lg font-semibold text-gray-800">
          {hasPhoto ? 'Preview' : 'Take Photo'}
        </h1>
        <p className="text-sm text-gray-500">
          {transaction.merchant} • {transaction.amount}
        </p>
      </div>

      {/* Camera / Preview Area */}
      <div className="wire-card p-0 overflow-hidden">
        {!hasPhoto ? (
          // Camera viewfinder
          <div 
            className="aspect-[3/4] bg-gray-800 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleCapture}
          >
            <div className="text-white text-center">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-sm opacity-80">[ Camera Viewfinder ]</p>
              <p className="text-xs opacity-60 mt-2">Tap to simulate capture</p>
            </div>
            
            {/* Viewfinder guides */}
            <div className="absolute inset-8 border-2 border-white/30 rounded-lg pointer-events-none"></div>
          </div>
        ) : (
          // Photo preview
          <div className="aspect-[3/4] bg-gray-200 flex flex-col items-center justify-center relative">
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">📄</div>
              <p className="text-sm">[ Captured Receipt Image ]</p>
              <p className="text-xs text-gray-400 mt-1">receipt_photo.jpg</p>
            </div>
            
            {/* Check overlay */}
            <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              ✓
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {hasPhoto ? (
        <div className="mt-4 space-y-3">
          <button 
            className="wire-btn wire-btn-primary"
            onClick={onUpload}
          >
            Upload Receipt
          </button>
          <button 
            className="wire-btn wire-btn-ghost"
            onClick={handleRetake}
          >
            Retake Photo
          </button>
        </div>
      ) : (
        <button 
          className="wire-btn wire-btn-ghost mt-4"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}

      {/* UX Improvement Note */}
      <div className="mt-6 p-3 border-2 border-dashed border-green-300 bg-green-50">
        <p className="text-xs text-green-700 text-center">
          <strong>✨ OPTIMAL UX</strong> — Combined camera + preview
          <br />
          <span className="text-green-600">
            One screen handles capture AND preview.
            <br />
            Retake is inline, not a separate flow.
            <br />
            <em>Removes separate preview screen.</em>
          </span>
        </p>
      </div>
    </div>
  )
}








