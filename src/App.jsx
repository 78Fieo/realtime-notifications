import { useEffect, useRef, useState } from 'react'
import useReducedMotion from './hooks/useReducedMotion'
import useDeviceMotionProfile from './hooks/useDeviceMotionProfile'
import { useToast } from './components/ToastProvider'

// Context screens (both flows)
import SMSTrigger from './screens/SMSTrigger'
import EmailTrigger from './screens/EmailTrigger'
import ConfirmationSMS from './screens/ConfirmationSMS'

// Dev Spec flow screens
import Landing from './screens/Landing'
import UploadMethodModal from './screens/UploadMethodModal'
import ImagePreview from './screens/ImagePreview'
import Thinking from './screens/Thinking'
import Success from './screens/Success'
import SuccessNotSubstantiated from './screens/SuccessNotSubstantiated'
import UploadFailed from './screens/UploadFailed'
import TerminalFailure from './screens/TerminalFailure'

// Optimal flow screens
import LandingOptimal from './screens/LandingOptimal'
import CameraPreview from './screens/CameraPreview'
import AIValidation from './screens/AIValidation'
import UnderReview from './screens/UnderReview'
import SpecificError from './screens/SpecificError'

// Edge cases (both flows)
import Expired from './screens/Expired'

const FLOW_MODES = {
  DEV_SPEC: 'dev-spec',
  OPTIMAL: 'optimal',
}

const SAFARI_EXCLUDED_SCREENS = new Set(['sms-trigger', 'email-trigger', 'confirmation-sms', 'reminder-sms'])

// Screen definitions for each flow
const DEV_SPEC_SCREENS = {
  SMS_TRIGGER: 'sms-trigger',
  EMAIL_TRIGGER: 'email-trigger',
  LANDING: 'landing',
  UPLOAD_METHOD: 'upload-method',
  IMAGE_PREVIEW: 'image-preview',
  THINKING: 'thinking',
  SUCCESS: 'success',
  SUCCESS_NOT_SUBSTANTIATED: 'success-not-substantiated',
  UPLOAD_FAILED: 'upload-failed',
  TERMINAL_FAILURE: 'terminal-failure',
  CONFIRMATION_SMS: 'confirmation-sms',
  EXPIRED: 'expired',
}

const OPTIMAL_SCREENS = {
  SMS_TRIGGER: 'sms-trigger',
  EMAIL_TRIGGER: 'email-trigger',
  LANDING_OPTIMAL: 'landing-optimal',
  CAMERA_PREVIEW: 'camera-preview',
  AI_VALIDATION: 'ai-validation',
  SUCCESS: 'success',
  UNDER_REVIEW: 'under-review',
  SPECIFIC_ERROR: 'specific-error',
  CONFIRMATION_SMS: 'confirmation-sms',
  EXPIRED: 'expired',
}

// Transaction data
const TRANSACTION = {
  merchant: 'City Chiropractic',
  amount: '$80.00',
  date: 'Today, Dec 11',
  time: '2:34 PM',
  description: 'Chiropractic adjustment - initial consultation and treatment session.',
}

function App() {
  const [flowMode, setFlowMode] = useState(FLOW_MODES.OPTIMAL)
  const [currentScreen, setCurrentScreen] = useState('sms-trigger')
  const [displayScreen, setDisplayScreen] = useState('sms-trigger')
  const [transitionKey, setTransitionKey] = useState(0)
  const [simulatedOutcome, setSimulatedOutcome] = useState('success')
  const [uploadAttempts, setUploadAttempts] = useState(0)
  const [errorType, setErrorType] = useState('BLURRY')

  const reducedMotion = useReducedMotion()
  const motionProfile = useDeviceMotionProfile(reducedMotion)
  const { showToast } = useToast()
  const lastToastScreenRef = useRef(null)

  const MAX_RETRIES = 3
  const goTo = (screen) => setCurrentScreen(screen)
  const isSafariShellScreen = (screen) => !SAFARI_EXCLUDED_SCREENS.has(screen)

  const resetFlow = () => {
    setCurrentScreen('sms-trigger')
    setUploadAttempts(0)
  }

  const switchFlowMode = (mode) => {
    setFlowMode(mode)
    resetFlow()
  }

  // ========== DEV SPEC FLOW HANDLERS ==========
  const handleDevSpecUploadClick = () => goTo(DEV_SPEC_SCREENS.UPLOAD_METHOD)
  const handleDevSpecMethodSelect = () => goTo(DEV_SPEC_SCREENS.IMAGE_PREVIEW)
  const handleDevSpecMethodCancel = () => goTo(DEV_SPEC_SCREENS.LANDING)
  const handleDevSpecPreviewConfirm = () => {
    setUploadAttempts((prev) => prev + 1)
    goTo(DEV_SPEC_SCREENS.THINKING)
  }
  const handleDevSpecPreviewCancel = () => goTo(DEV_SPEC_SCREENS.UPLOAD_METHOD)
  const handleDevSpecThinkingComplete = () => {
    switch (simulatedOutcome) {
      case 'success': goTo(DEV_SPEC_SCREENS.SUCCESS); break
      case 'not-substantiated': goTo(DEV_SPEC_SCREENS.SUCCESS_NOT_SUBSTANTIATED); break
      case 'upload-failed':
        if (uploadAttempts >= MAX_RETRIES) goTo(DEV_SPEC_SCREENS.TERMINAL_FAILURE)
        else goTo(DEV_SPEC_SCREENS.UPLOAD_FAILED)
        break
      default: goTo(DEV_SPEC_SCREENS.SUCCESS)
    }
  }
  const handleDevSpecRetry = () => {
    showToast({ title: 'Retrying upload', description: 'Take a clear, well-lit photo of the full receipt.', tone: 'info' })
    goTo(DEV_SPEC_SCREENS.UPLOAD_METHOD)
  }

  // ========== OPTIMAL FLOW HANDLERS ==========
  const handleOptimalTakePhoto = () => goTo(OPTIMAL_SCREENS.CAMERA_PREVIEW)
  const handleOptimalUploadFile = () => goTo(OPTIMAL_SCREENS.CAMERA_PREVIEW)
  const handleOptimalUpload = () => {
    setUploadAttempts((prev) => prev + 1)
    goTo(OPTIMAL_SCREENS.AI_VALIDATION)
  }
  const handleOptimalCameraCancel = () => goTo(OPTIMAL_SCREENS.LANDING_OPTIMAL)
  const handleOptimalSuccess = () => {
    switch (simulatedOutcome) {
      case 'success': goTo(OPTIMAL_SCREENS.SUCCESS); break
      case 'not-substantiated': goTo(OPTIMAL_SCREENS.UNDER_REVIEW); break
      case 'upload-failed': goTo(OPTIMAL_SCREENS.SPECIFIC_ERROR); break
      default: goTo(OPTIMAL_SCREENS.SUCCESS)
    }
  }
  const handleOptimalError = () => goTo(OPTIMAL_SCREENS.SPECIFIC_ERROR)
  const handleOptimalRetry = () => {
    showToast({ title: 'Try another photo', description: 'Good lighting helps us read your receipt.', tone: 'info' })
    goTo(OPTIMAL_SCREENS.CAMERA_PREVIEW)
  }
  const handleOptimalLater = () => goTo(OPTIMAL_SCREENS.LANDING_OPTIMAL)

  useEffect(() => {
    document.title = `RTN Prototype | ${currentScreen}`
  }, [currentScreen])

  useEffect(() => {
    if (currentScreen === displayScreen) return
    setDisplayScreen(currentScreen)
    setTransitionKey((prev) => prev + 1)
  }, [currentScreen, displayScreen])

  useEffect(() => {
    if (lastToastScreenRef.current === currentScreen) return

    if (currentScreen === DEV_SPEC_SCREENS.SUCCESS || currentScreen === OPTIMAL_SCREENS.SUCCESS) {
      showToast({ title: 'Receipt verified', description: 'Your claim is approved.', tone: 'success' })
    }

    if (currentScreen === DEV_SPEC_SCREENS.SUCCESS_NOT_SUBSTANTIATED || currentScreen === OPTIMAL_SCREENS.UNDER_REVIEW) {
      showToast({ title: 'Receipt under review', description: 'We\'ll notify you within 2 business days.', tone: 'info' })
    }

    if (currentScreen === DEV_SPEC_SCREENS.UPLOAD_FAILED || currentScreen === OPTIMAL_SCREENS.SPECIFIC_ERROR) {
      showToast({ title: 'Upload unsuccessful', description: 'Please take a new photo or try again.', tone: 'error' })
    }

    lastToastScreenRef.current = currentScreen
  }, [currentScreen, showToast])

  // ========== RENDER SCREEN ==========
  const renderScreen = (screenKey) => {
    // Shared screens
    if (screenKey === 'sms-trigger') {
      return (
        <SMSTrigger
          transaction={TRANSACTION}
          onTapLink={() => goTo(flowMode === FLOW_MODES.DEV_SPEC ? DEV_SPEC_SCREENS.LANDING : OPTIMAL_SCREENS.LANDING_OPTIMAL)}
        />
      )
    }

    if (screenKey === 'email-trigger') {
      return (
        <EmailTrigger
          transaction={TRANSACTION}
          onOpenLink={() => goTo(flowMode === FLOW_MODES.DEV_SPEC ? DEV_SPEC_SCREENS.LANDING : OPTIMAL_SCREENS.LANDING_OPTIMAL)}
        />
      )
    }

    if (screenKey === 'confirmation-sms') {
      return <ConfirmationSMS transaction={TRANSACTION} />
    }

    if (screenKey === 'expired') {
      return <Expired />
    }

    // Dev Spec flow
    if (flowMode === FLOW_MODES.DEV_SPEC) {
      switch (screenKey) {
        case DEV_SPEC_SCREENS.LANDING:
          return <Landing transaction={TRANSACTION} onUpload={handleDevSpecUploadClick} />
        case DEV_SPEC_SCREENS.UPLOAD_METHOD:
          return <UploadMethodModal onSelect={handleDevSpecMethodSelect} onCancel={handleDevSpecMethodCancel} />
        case DEV_SPEC_SCREENS.IMAGE_PREVIEW:
          return <ImagePreview transaction={TRANSACTION} onConfirm={handleDevSpecPreviewConfirm} onCancel={handleDevSpecPreviewCancel} />
        case DEV_SPEC_SCREENS.THINKING:
          return <Thinking transaction={TRANSACTION} onComplete={handleDevSpecThinkingComplete} />
        case DEV_SPEC_SCREENS.SUCCESS:
          return <Success transaction={TRANSACTION} onContinue={() => goTo(DEV_SPEC_SCREENS.CONFIRMATION_SMS)} />
        case DEV_SPEC_SCREENS.SUCCESS_NOT_SUBSTANTIATED:
          return <SuccessNotSubstantiated transaction={TRANSACTION} />
        case DEV_SPEC_SCREENS.UPLOAD_FAILED:
          return <UploadFailed transaction={TRANSACTION} onRetry={handleDevSpecRetry} attemptCount={uploadAttempts} />
        case DEV_SPEC_SCREENS.TERMINAL_FAILURE:
          return <TerminalFailure transaction={TRANSACTION} />
        default:
          return <Landing transaction={TRANSACTION} onUpload={handleDevSpecUploadClick} />
      }
    }

    // Optimal flow
    if (flowMode === FLOW_MODES.OPTIMAL) {
      switch (screenKey) {
        case OPTIMAL_SCREENS.LANDING_OPTIMAL:
          return <LandingOptimal transaction={TRANSACTION} onTakePhoto={handleOptimalTakePhoto} onUploadFile={handleOptimalUploadFile} />
        case OPTIMAL_SCREENS.CAMERA_PREVIEW:
          return <CameraPreview transaction={TRANSACTION} onUpload={handleOptimalUpload} onCancel={handleOptimalCameraCancel} />
        case OPTIMAL_SCREENS.AI_VALIDATION:
          return (
            <AIValidation
              transaction={TRANSACTION}
              onSuccess={handleOptimalSuccess}
              onError={handleOptimalError}
              onCancel={handleOptimalCameraCancel}
              simulateError={simulatedOutcome === 'upload-failed'}
            />
          )
        case OPTIMAL_SCREENS.SUCCESS:
          return <Success transaction={TRANSACTION} onContinue={() => goTo(OPTIMAL_SCREENS.CONFIRMATION_SMS)} />
        case OPTIMAL_SCREENS.UNDER_REVIEW:
          return <UnderReview transaction={TRANSACTION} />
        case OPTIMAL_SCREENS.SPECIFIC_ERROR:
          return (
            <SpecificError
              transaction={TRANSACTION}
              errorType={errorType}
              onRetry={handleOptimalRetry}
              onCancel={handleOptimalLater}
            />
          )
        default:
          return <LandingOptimal transaction={TRANSACTION} onTakePhoto={handleOptimalTakePhoto} onUploadFile={handleOptimalUploadFile} />
      }
    }
  }

  // Screen list for control panel
  const getScreenList = () => {
    if (flowMode === FLOW_MODES.DEV_SPEC) {
      return [
        {
          group: 'BEFORE',
          screens: [
            { key: 'sms-trigger', label: '0A. SMS Trigger' },
            { key: 'email-trigger', label: '0B. Email Trigger' },
          ],
        },
        {
          group: 'CORE FLOW',
          screens: [
            { key: DEV_SPEC_SCREENS.LANDING, label: '1. Landing' },
            { key: DEV_SPEC_SCREENS.UPLOAD_METHOD, label: '2. Upload Modal' },
            { key: DEV_SPEC_SCREENS.IMAGE_PREVIEW, label: '3. Preview' },
            { key: DEV_SPEC_SCREENS.THINKING, label: '4. Processing' },
          ],
        },
        {
          group: 'OUTCOMES',
          screens: [
            { key: DEV_SPEC_SCREENS.SUCCESS, label: '5A. Success' },
            { key: DEV_SPEC_SCREENS.SUCCESS_NOT_SUBSTANTIATED, label: '5B. Under Review' },
            { key: DEV_SPEC_SCREENS.UPLOAD_FAILED, label: '5C. Failed (retry)' },
            { key: DEV_SPEC_SCREENS.TERMINAL_FAILURE, label: '5D. Terminal' },
          ],
        },
        { group: 'AFTER', screens: [{ key: 'confirmation-sms', label: '6. Confirm SMS' }] },
        {
          group: 'EDGE CASES',
          screens: [
            { key: 'expired', label: 'X. Expired' },
          ],
        },
      ]
    }

    return [
      {
        group: 'BEFORE',
        screens: [
          { key: 'sms-trigger', label: '0A. SMS Trigger' },
          { key: 'email-trigger', label: '0B. Email Trigger' },
        ],
      },
      {
        group: 'STREAMLINED FLOW',
        screens: [
          { key: OPTIMAL_SCREENS.LANDING_OPTIMAL, label: '1. Landing (direct)' },
          { key: OPTIMAL_SCREENS.CAMERA_PREVIEW, label: '2. Camera+Preview' },
          { key: OPTIMAL_SCREENS.AI_VALIDATION, label: '3. AI Validation' },
        ],
      },
      {
        group: 'OUTCOMES',
        screens: [
          { key: OPTIMAL_SCREENS.SUCCESS, label: '4A. Success' },
          { key: OPTIMAL_SCREENS.UNDER_REVIEW, label: '4B. Under Review' },
          { key: OPTIMAL_SCREENS.SPECIFIC_ERROR, label: '4C. Specific Error' },
          { key: OPTIMAL_SCREENS.EXPIRED, label: '4D. Expired Link' },
        ],
      },
      { group: 'AFTER', screens: [{ key: 'confirmation-sms', label: '5. Confirm SMS' }] },
    ]
  }

  const showSafariChrome = isSafariShellScreen(displayScreen)

  const stagedScreen = (
    <div className="screen-stage">
      <div key={`${displayScreen}-${transitionKey}`} className="screen-layer screen-layer-enter">
        {renderScreen(displayScreen)}
      </div>
    </div>
  )

  return (
    <div className="flex gap-8" data-motion-level={motionProfile.motionLevel}>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Current screen: {displayScreen}
      </div>

      {/* Phone Frame */}
      <div className="phone-frame">
        {showSafariChrome ? (
          <div className="ios-safari-shell">
            <div className="ios-status-bar">
              <span className="ios-status-time">9:41</span>
              <div className="ios-dynamic-island" />
              <span className="ios-status-signal">5G</span>
            </div>

            <div className="ios-safari-topbar">
              <div className="ios-url-pill">
                <span className="ios-url-lock">Secure</span>
                <span>wexbenefits.com</span>
              </div>
            </div>

            <div className="ios-browser-viewport">{stagedScreen}</div>

            <div className="ios-safari-bottombar">
              <span>Back</span>
              <span>Forward</span>
              <span>Share</span>
              <span>Tabs</span>
            </div>
          </div>
        ) : (
          stagedScreen
        )}
      </div>

      {/* Control Panel */}
      <div className="control-panel hidden lg:block" style={{ maxWidth: '260px' }}>
        <h3>Prototype Controls</h3>

        {/* Flow Mode Toggle */}
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Flow Version:</p>
          <div className="flex gap-1">
            <button
              onClick={() => switchFlowMode(FLOW_MODES.OPTIMAL)}
              className={`flex-1 text-xs py-2 rounded ${flowMode === FLOW_MODES.OPTIMAL ? '!bg-[#172DA1] !text-white' : ''}`}
            >
              Optimal
            </button>
            <button
              onClick={() => switchFlowMode(FLOW_MODES.DEV_SPEC)}
              className={`flex-1 text-xs py-2 rounded ${flowMode === FLOW_MODES.DEV_SPEC ? '!bg-[#172DA1] !text-white' : ''}`}
            >
              Dev Spec
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 text-center">
            {flowMode === FLOW_MODES.OPTIMAL ? '3 core screens' : '5 core screens'}
          </p>
        </div>

        {/* Screen Navigation */}
        <div className="max-h-[280px] overflow-y-auto mb-3">
          {getScreenList().map(({ group, screens }) => (
            <div key={group} className="mb-2">
              <p className="text-xs text-gray-500 mb-1 font-semibold">{group}</p>
              {screens.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => goTo(key)}
                  className={currentScreen === key ? 'active' : ''}
                  style={{ fontSize: '10px', padding: '5px 8px' }}
                >
                  {label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Outcome Simulation */}
        <div className="border-t pt-3">
          <p className="text-xs text-gray-500 mb-2 font-semibold">Simulate outcome:</p>
          <select
            value={simulatedOutcome}
            onChange={(e) => setSimulatedOutcome(e.target.value)}
            className="w-full text-xs p-2 border border-gray-300 rounded"
          >
            <option value="success">Success (verified)</option>
            <option value="not-substantiated">Under Review</option>
            <option value="upload-failed">Error / Failed</option>
          </select>
        </div>

        {/* Error Type (for optimal flow) */}
        {flowMode === FLOW_MODES.OPTIMAL && simulatedOutcome === 'upload-failed' && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Error type:</p>
            <select
              value={errorType}
              onChange={(e) => setErrorType(e.target.value)}
              className="w-full text-xs p-1 border border-gray-300 rounded"
            >
              <option value="BLURRY">Blurry photo</option>
              <option value="DOG_PHOTO">Uploaded a dog photo</option>
              <option value="NO_DATE">Missing date</option>
              <option value="NO_AMOUNT">Missing amount</option>
              <option value="NOT_RECEIPT">Not a receipt</option>
            </select>
          </div>
        )}

        {/* State Info */}
        <div className="border-t pt-2 mt-2">
          <p className="text-xs text-gray-400">Attempts: {uploadAttempts}/{MAX_RETRIES}</p>
        </div>

        {/* Reset */}
        <button
          onClick={resetFlow}
          className="mt-2 !bg-gray-800 !text-white w-full"
        >
          Reset Flow
        </button>
      </div>
    </div>
  )
}

export default App
