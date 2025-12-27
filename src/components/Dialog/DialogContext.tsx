import { createContext, useContext, ReactNode } from 'react'

export interface DialogInstance {
  id: string
  content: ReactNode
  open: boolean
  zIndex?: number
  onOpenChange?: (open: boolean) => void
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
}

interface DialogContextValue {
  dialogs: DialogInstance[]
  addDialog: (dialog: Omit<DialogInstance, 'id'>) => string
  removeDialog: (id: string) => void
  updateDialog: (id: string, updates: Partial<DialogInstance>) => void
}

const DialogContext = createContext<DialogContextValue | null>(null)

export const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialogContext must be used within DialogProvider')
  }
  return context
}

export { DialogContext }
