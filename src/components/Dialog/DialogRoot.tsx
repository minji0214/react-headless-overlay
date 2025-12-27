import { FC, ReactNode, useRef } from 'react'
import { Portal } from '@/utils/portal'
import { useScrollLock } from '@/utils/useScrollLock'
import { useFocusTrap } from '@/utils/useFocusTrap'
import { DialogOverlay } from './DialogOverlay'
import { DialogContent } from './DialogContent'

interface DialogRootProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  zIndex?: number
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
}

export const DialogRoot: FC<DialogRootProps> = ({
  open,
  onOpenChange,
  children,
  zIndex,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlayClassName,
  contentClassName,
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

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

  useScrollLock(open)
  useFocusTrap(contentRef, open, closeOnEscape ? handleEscape : undefined)

  if (!open) {
    return null
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...(zIndex !== undefined && { zIndex }),
  }

  const contentStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    ...(zIndex !== undefined && { zIndex: zIndex + 1 }),
  }

  return (
    <Portal>
      <DialogOverlay
        onClick={closeOnOverlayClick ? handleClose : undefined}
        className={overlayClassName}
        style={overlayStyle}
      />
      <DialogContent ref={contentRef} className={contentClassName} style={contentStyle}>
        {children}
      </DialogContent>
    </Portal>
  )
}

