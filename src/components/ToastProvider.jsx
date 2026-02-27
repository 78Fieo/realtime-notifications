import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

function ToastItem({ toast, onDismiss }) {
  const pointerStartXRef = useRef(null)
  const [offsetX, setOffsetX] = useState(0)

  const onPointerDown = (event) => {
    pointerStartXRef.current = event.clientX
  }

  const onPointerMove = (event) => {
    if (pointerStartXRef.current == null) return
    setOffsetX(Math.max(0, event.clientX - pointerStartXRef.current))
  }

  const onPointerUp = () => {
    if (offsetX > 96) {
      onDismiss(toast.id)
    }
    setOffsetX(0)
    pointerStartXRef.current = null
  }

  return (
    <div
      className={`toast-item toast-${toast.tone}`}
      style={{ transform: `translateX(${offsetX}px)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="status"
      aria-live="polite"
    >
      <div className="toast-title">{toast.title}</div>
      {toast.description ? <div className="toast-description">{toast.description}</div> : null}
      <button className="toast-dismiss" onClick={() => onDismiss(toast.id)} aria-label="Dismiss notification">Dismiss</button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(({ title, description = '', tone = 'info', duration = 2600 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    setToasts((current) => {
      const next = [...current, { id, title, description, tone }]
      return next.slice(-2)
    })

    window.setTimeout(() => dismissToast(id), duration)
    return id
  }, [dismissToast])

  const value = useMemo(() => ({ showToast, dismissToast }), [showToast, dismissToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" aria-label="Notifications">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }

  return context
}
