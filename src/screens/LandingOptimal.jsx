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
          Receipt Required
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
        or upload from files
      </button>

      {/* Why Link */}
      <button 
        ref={whyTriggerRef}
        className="text-sm text-gray-600 mt-1 block mx-auto min-h-[44px] px-3"
        onClick={() => setShowWhyModal(true)}
      >
        Why do I need to do this?
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
            <h3 id="why-title" className="font-semibold mb-3">Why do I need a receipt?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Some purchases require verification to ensure they're eligible for your FSA/HSA benefits. 
              Uploading your receipt helps us process your claim quickly and keep your card active.
            </p>
            <button 
              ref={whyCloseRef}
              className="wire-btn text-sm"
              onClick={() => setShowWhyModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}





