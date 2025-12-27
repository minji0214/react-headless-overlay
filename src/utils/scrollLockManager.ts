let lockCount = 0
let originalStyles: { overflow: string; paddingRight: string } | null = null

export const lockScroll = () => {
  if (typeof document === 'undefined') {
    return
  }

  lockCount++

  // 이미 잠겨있으면 증가만
  if (lockCount > 1) {
    return
  }

  // 원본 스타일 저장
  originalStyles = {
    overflow: document.body.style.overflow,
    paddingRight: document.body.style.paddingRight,
  }

  // 스크롤바 너비 계산
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

export const unlockScroll = () => {
  if (typeof document === 'undefined') {
    return
  }

  lockCount--

  // 모든 잠금이 해제되었을 때만 스타일 복원
  if (lockCount <= 0) {
    lockCount = 0
    if (originalStyles) {
      document.body.style.overflow = originalStyles.overflow
      document.body.style.paddingRight = originalStyles.paddingRight
      originalStyles = null
    }
  }
}

export const resetScrollLock = () => {
  lockCount = 0
  if (typeof document !== 'undefined' && originalStyles) {
    document.body.style.overflow = originalStyles.overflow
    document.body.style.paddingRight = originalStyles.paddingRight
    originalStyles = null
  }
}
