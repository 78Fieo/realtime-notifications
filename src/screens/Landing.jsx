import { useState } from 'react'
import BrandHeader from '../components/BrandHeader'

export default function Landing({ transaction, onUpload }) {
  const [showWhyModal, setShowWhyModal] = useState(false)

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
          
          <div className="flex justify-between items-center py-2 border-b border-dashed border-gray-300">
            <span className="text-sm text-gray-500">Date</span>
            <span className="font-medium text-gray-800">{transaction.date}</span>
          </div>
        </div>

        {/* Transaction Description (per dev spec) */}
        {transaction.description && (
          <div className="mt-4 pt-3 border-t border-dashed border-gray-300">
            <p className="text-xs text-gray-500 mb-1">Transaction details:</p>
            <p className="text-sm text-gray-600 italic">
              "{transaction.description}"
            </p>
          </div>
        )}
      </div>

      {/* Primary CTA */}
      <button 
        className="wire-btn wire-btn-primary mt-6"
        onClick={onUpload}
      >
        Upload Receipt
      </button>

      {/* Secondary Link */}
      <button 
        className="text-sm text-gray-600 underline mt-4 block mx-auto min-h-[44px] px-3"
        onClick={() => setShowWhyModal(true)}
      >
        Why do I need to do this?
      </button>

      {/* Why Modal */}
      {showWhyModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-10">
          <div className="bg-white border-2 border-dashed border-gray-400 p-5 max-w-xs motion-reveal is-visible">
            <h3 className="font-semibold mb-3">Why do I need a receipt?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Some purchases require verification to ensure they're eligible for your FSA/HSA benefits. 
              Uploading your receipt helps us process your claim quickly and keep your card active.
            </p>
            <button 
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
