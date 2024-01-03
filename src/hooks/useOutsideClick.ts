import { useEffect } from 'react'

export const useOutsideClick = (elementRef, closeFunc, state = true) => {
  useEffect(() => {
    if (!state) return

    const handleclickOutside = (event) => {
      const clickElement = event.composedPath()

      if (!clickElement.includes(elementRef.current)) {
        closeFunc(false)
      }
    }

    document.body.addEventListener('click', handleclickOutside)

    return () => {
      document.body.removeEventListener('click', handleclickOutside)
    }
  }, [elementRef, closeFunc, state])
}
