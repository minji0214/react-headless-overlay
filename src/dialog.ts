import { ReactNode } from 'react'

import type { DialogInstance } from './components/Dialog/DialogContext'

let dialogContextInstance: {
  addDialog: (dialog: Omit<DialogInstance, 'id'>) => string
  removeDialog: (id: string) => void
  updateDialog: (id: string, updates: Partial<DialogInstance>) => void
} | null = null

export const setDialogContext = (context: typeof dialogContextInstance) => {
  dialogContextInstance = context
}

interface DialogOptions {
  content: ReactNode
  zIndex?: number
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
  onOpenChange?: (open: boolean) => void
}

export const dialog = (options: DialogOptions) => {
  if (!dialogContextInstance) {
    throw new Error('dialog() must be called within DialogProvider. Make sure DialogProvider is mounted in your app.')
  }

  const id = dialogContextInstance.addDialog({
    content: options.content,
    open: true,
    zIndex: options.zIndex,
    closeOnOverlayClick: options.closeOnOverlayClick,
    closeOnEscape: options.closeOnEscape,
    overlayClassName: options.overlayClassName,
    contentClassName: options.contentClassName,
    onOpenChange: options.onOpenChange,
  })

  const close = () => {
    dialogContextInstance?.removeDialog(id)
  }

  return {
    id,
    close,
  }
}
