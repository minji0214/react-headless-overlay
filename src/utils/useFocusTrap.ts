import { useEffect } from 'react'
import type { RefObject } from 'react'

export const useFocusTrap = (containerRef: RefObject<HTMLElement>, enabled: boolean, onEscape?: () => void) => {
  useEffect(() => {
    if (!enabled || !containerRef.current) {
      return
    }

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // 첫 번째 요소에 포커스
    if (firstElement) {
      firstElement.focus()
    }

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape()
      }
    }

    container.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscape)

    return () => {
      container.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [enabled, containerRef, onEscape])
}
