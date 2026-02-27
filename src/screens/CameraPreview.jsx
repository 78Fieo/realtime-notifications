import { useState } from 'react'
import BrandHeader from '../components/BrandHeader'

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
      <BrandHeader />

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
          <div className="aspect-[3/4] bg-gray-800 flex flex-col items-center justify-center relative">
            <div className="text-white text-center">
              <div className="text-2xl font-semibold mb-4">Camera</div>
              <p className="text-sm opacity-80">Camera viewfinder</p>
              <p className="text-xs opacity-60 mt-2">Center the receipt in frame</p>
            </div>
            
            {/* Viewfinder guides */}
            <div className="absolute inset-8 border-2 border-white/30 rounded-lg pointer-events-none"></div>

            <button
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-white bg-white/20"
              aria-label="Capture receipt photo"
              onClick={handleCapture}
            />
          </div>
        ) : (
          // Photo preview
          <div className="aspect-[3/4] bg-gray-200 flex flex-col items-center justify-center relative">
            <div className="text-center text-gray-600">
              <div className="text-xl font-semibold mb-2">Image</div>
              <p className="text-sm">Captured receipt image</p>
              <p className="text-xs text-gray-400 mt-1">receipt_photo.jpg</p>
            </div>
            
            {/* Check overlay */}
            <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              OK
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

    </div>
  )
}





