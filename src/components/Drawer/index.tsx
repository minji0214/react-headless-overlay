import { FC } from 'react'

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const Drawer: FC<DrawerProps> = ({
  open = false,
  onOpenChange: _onOpenChange,
  children,
  side: _side = 'right',
}) => {
  return (
    <div>
      {/* Drawer implementation will be added here */}
      {open && <div>{children}</div>}
    </div>
  )
}
