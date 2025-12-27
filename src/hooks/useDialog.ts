import { ReactNode } from 'react'

import { useDialogContext } from '../components/Dialog/DialogContext'

interface DialogOptions {
  content: ReactNode
  zIndex?: number
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
  onOpenChange?: (open: boolean) => void
}

export const useDialog = () => {
  const { addDialog, removeDialog, updateDialog } = useDialogContext()

  const dialog = (options: DialogOptions) => {
    const id = addDialog({
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
      removeDialog(id)
    }

    return {
      id,
      close,
    }
  }

  return {
    dialog,
    removeDialog,
    updateDialog,
  }
}
