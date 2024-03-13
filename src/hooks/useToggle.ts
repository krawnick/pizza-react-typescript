import { useState } from 'react'

export const useToggle = (
  initValue: boolean = false
): [boolean, () => void, () => void] => {
  const [active, setActive] = useState(initValue)
  const setToggle = () => {
    setActive(!active)
  }
  const closeToggle = () => {
    setActive(false)
  }

  return [active, setToggle, closeToggle]
}
