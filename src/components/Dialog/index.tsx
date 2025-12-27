import { FC, ReactNode } from 'react'

import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'

import { Portal } from '@/utils/portal'
import { useScrollLock } from '@/utils/useScrollLock'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
  zIndex?: number
}

export const Dialog: FC<DialogProps> = ({
  open = false,
  onOpenChange,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlayClassName,
  contentClassName,
  zIndex,
}) => {
  useScrollLock(open)

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  const handleEscape = () => {
    if (closeOnEscape) {
      handleClose()
    }
  }

  if (!open) {
    return null
  }

  const overlayStyle: React.CSSProperties | undefined = zIndex ? { zIndex } : undefined
  const contentStyle: React.CSSProperties | undefined = zIndex ? { zIndex: zIndex + 1 } : undefined

  return (
    <Portal>
      <DialogOverlay
        onClick={closeOnOverlayClick ? handleClose : undefined}
        className={overlayClassName}
        style={overlayStyle}
      />
      <DialogContent onEscape={handleEscape} className={contentClassName} style={contentStyle}>
        {children}
      </DialogContent>
    </Portal>
  )
}
