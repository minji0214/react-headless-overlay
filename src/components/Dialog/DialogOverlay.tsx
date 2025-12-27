import { FC, MouseEvent } from 'react'

interface DialogOverlayProps {
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export const DialogOverlay: FC<DialogOverlayProps> = ({ onClick, className, style }) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClick) {
      onClick()
    }
  }

  return <div onClick={handleClick} className={className} style={style} aria-hidden="true" />
}
