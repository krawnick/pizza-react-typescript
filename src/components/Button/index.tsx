import cn from 'classnames'
import { ReactNode } from 'react'

import styles from './Button.module.scss'

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className: string
  children: ReactNode
  theme:
    | 'orange'
    | 'outline-orange'
    | 'outline-gray'
    | 'outline-action-gray'
    | 'outline-action-orange'
}

export const Button = ({
  children,
  className,
  theme,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.buttonOrange]: theme === 'orange',

        [styles.buttonOutlineOrange]: theme === 'outline-orange',
        [styles.buttonOutlineGray]: theme === 'outline-gray',

        [styles.buttonOutlineAction]: theme.includes('outline-action'),
        [styles.buttonOutlineActionGray]: theme === 'outline-action-gray',
        [styles.buttonOutlineActionOrange]: theme === 'outline-action-orange',
      })}
      {...props}
    >
      {children}
    </button>
  )
}
