import { useState } from 'react'

export const useToggle = (
  initValue: boolean = false
): [boolean, () => void] => {
  const [active, setActive] = useState(initValue)
  const setToggle = () => {
    setActive(!active)
  }

  return [active, setToggle]
}
