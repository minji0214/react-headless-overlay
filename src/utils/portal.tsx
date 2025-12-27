import { useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  container?: HTMLElement
}

export const Portal = ({ children, container }: PortalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return null
  }

  const targetContainer = container || (typeof document !== 'undefined' ? document.body : null)

  if (!targetContainer) {
    return null
  }

  return createPortal(children, targetContainer)
}
