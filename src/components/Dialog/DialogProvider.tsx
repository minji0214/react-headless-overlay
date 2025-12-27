import { FC, ReactNode, useState, useCallback, useEffect, useRef } from 'react'

import { DialogContext, DialogInstance } from './DialogContext'

import { setDialogContext } from '@/dialog'

interface DialogProviderProps {
  children: ReactNode
  defaultZIndex?: number
}

export const DialogProvider: FC<DialogProviderProps> = ({ children, defaultZIndex = 50 }) => {
  const [dialogs, setDialogs] = useState<DialogInstance[]>([])
  const dialogsRef = useRef<DialogInstance[]>([])

  useEffect(() => {
    dialogsRef.current = dialogs
  }, [dialogs])

  const addDialog = useCallback(
    (dialog: Omit<DialogInstance, 'id'>) => {
      const id = crypto.randomUUID()
      const zIndex = dialog.zIndex ?? defaultZIndex + dialogsRef.current.length

      setDialogs((prev) => [...prev, { ...dialog, id, zIndex }])

      return id
    },
    [defaultZIndex],
  )

  const removeDialog = useCallback((id: string) => {
    setDialogs((prev) => prev.filter((dialog) => dialog.id !== id))
  }, [])

  const updateDialog = useCallback((id: string, updates: Partial<DialogInstance>) => {
    setDialogs((prev) => prev.map((dialog) => (dialog.id === id ? { ...dialog, ...updates } : dialog)))
  }, [])

  useEffect(() => {
    setDialogContext({ addDialog, removeDialog, updateDialog })
  }, [addDialog, removeDialog, updateDialog])

  return (
    <DialogContext.Provider value={{ dialogs, addDialog, removeDialog, updateDialog }}>
      {children}
    </DialogContext.Provider>
  )
}
