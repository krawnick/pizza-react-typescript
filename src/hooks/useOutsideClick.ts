import { useEffect } from 'react'

export const useOutsideClick = (
  elementRef: React.RefObject<HTMLElement>,
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>,
  state: boolean = true,
) => {
  useEffect(() => {
    if (!state) return

    const handleclickOutside = (event: MouseEvent): void => {
      const clickElement = event.composedPath()

      if (elementRef.current && !clickElement.includes(elementRef.current)) {
        closeFunc(false)
      }
    }

    document.body.addEventListener('click', handleclickOutside)

    return () => {
      document.body.removeEventListener('click', handleclickOutside)
    }
  }, [elementRef, closeFunc, state])
}
