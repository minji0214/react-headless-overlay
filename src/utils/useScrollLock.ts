import { useEffect } from 'react'

import { lockScroll, unlockScroll } from './scrollLockManager'

export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (locked) {
      lockScroll()
      return () => {
        unlockScroll()
      }
    }

    return undefined
  }, [locked])
}
