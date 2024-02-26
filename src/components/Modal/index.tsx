import cn from 'classnames'
import { ReactNode } from 'react'

import styles from './Modal.module.scss'

interface IModalProps {
  active: boolean
  className?: string
  children: ReactNode
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({
  active,
  setActive,
  children,
  className,
}: IModalProps) => {
  return (
    <div
      onClick={() => {
        setActive(false)
      }}
      className={cn(className, styles.modal, !active ? styles.out : '')}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(styles.modalContent)}
      >
        {children}
      </div>
    </div>
  )
}
