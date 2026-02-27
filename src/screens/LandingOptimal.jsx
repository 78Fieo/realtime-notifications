import { useEffect, useRef, useState } from 'react'
import BrandHeader from '../components/BrandHeader'

export default function LandingOptimal({ transaction, onTakePhoto, onUploadFile }) {
  const [showWhyModal, setShowWhyModal] = useState(false)
  const whyTriggerRef = useRef(null)
  const whyCloseRef = useRef(null)

  useEffect(() => {
    if (!showWhyModal) return
    whyCloseRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowWhyModal(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showWhyModal])

  useEffect(() => {
    if (!showWhyModal) {
      whyTriggerRef.current?.focus()
    }
  }, [showWhyModal])

  return (
    <div className="phone-content relative">
      {/* Header / Logo */}
      <BrandHeader />

      {/* Context Card - Merchant Details */}
      <div className="wire-card">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Verify Your Purchase
        </h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-300">
            <span className="text-sm text-gray-500">Merchant</span>
            <span className="font-medium text-gray-800">{transaction.merchant}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-300">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="font-medium text-gray-800">{transaction.amount}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-medium text-gray-800">{transaction.date}</span>
          </div>
        </div>
      </div>

      {/* Primary CTA - Direct Camera */}
      <button 
        className="wire-btn wire-btn-primary mt-6"
        onClick={onTakePhoto}
      >
        Take Photo of Receipt
      </button>

      {/* Secondary - File Upload (text link, not button) */}
      <button 
        className="text-sm text-gray-600 underline mt-3 block mx-auto min-h-[44px] px-3"
        onClick={onUploadFile}
      >
        Upload from your files instead
      </button>

      {/* Why Link */}
      <button 
        ref={whyTriggerRef}
        className="text-sm text-gray-600 mt-1 block mx-auto min-h-[44px] px-3"
        onClick={() => setShowWhyModal(true)}
      >
        Why is a receipt needed?
      </button>

      {/* Why Modal */}
      {showWhyModal && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-10"
          onClick={() => setShowWhyModal(false)}
        >
          <div
            className="bg-white border-2 border-dashed border-gray-400 p-5 max-w-xs motion-reveal is-visible"
            role="dialog"
            aria-modal="true"
            aria-labelledby="why-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="why-title" className="font-semibold mb-3">About receipt verification</h3>
            <p className="text-sm text-gray-600 mb-4">
              Certain merchants require a receipt to confirm your purchase qualifies for tax-free benefits.
              This quick step ensures your claim is approved and your benefits card stays active.
            </p>
            <button 
              ref={whyCloseRef}
              className="wire-btn text-sm"
              onClick={() => setShowWhyModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}





