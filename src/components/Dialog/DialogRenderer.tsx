import { FC } from 'react'

import { useDialogContext } from './DialogContext'
import { DialogRoot } from './DialogRoot'

export const DialogRenderer: FC = () => {
  const { dialogs, removeDialog, updateDialog } = useDialogContext()

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogRoot
          key={dialog.id}
          open={dialog.open}
          onOpenChange={(open) => {
            if (!open) {
              removeDialog(dialog.id)
            } else {
              updateDialog(dialog.id, { open })
            }
            dialog.onOpenChange?.(open)
          }}
          zIndex={dialog.zIndex}
          closeOnOverlayClick={dialog.closeOnOverlayClick}
          closeOnEscape={dialog.closeOnEscape}
          overlayClassName={dialog.overlayClassName}
          contentClassName={dialog.contentClassName}
        >
          {dialog.content}
        </DialogRoot>
      ))}
    </>
  )
}
