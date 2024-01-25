import cn from 'classnames'
import { ReactNode } from 'react'

import styles from './Button.module.scss'
import { ReactComponent as AddIcon } from './icons/addIcon.svg'
import { ReactComponent as BackIcon } from './icons/backIcon.svg'

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  count?: number
  children: ReactNode
  theme:
    | 'orange'
    | 'button-add'
    | 'button-back'
    | 'outline-action-s'
    | 'outline-action-orange'
}

export const Button = ({
  children,
  className,
  theme,
  count,
  ...props
}: IButtonProps) => {
  const countId = count !== undefined && count > 0 ? <i>{count}</i> : null

  return (
    <button
      className={cn(styles.button, className, {
        [styles.buttonOrange]: theme === 'orange',

        [styles.buttonAdd]: theme === 'button-add',
        [styles.buttonBack]: theme === 'button-back',

        [styles.buttonOutlineAction]: theme.includes('outline-action'),
        [styles.buttonOutlineActionGray]: theme === 'outline-action-gray',
        [styles.buttonOutlineActionOrange]: theme === 'outline-action-orange',
      })}
      {...props}
    >
      {theme === 'button-add' && (
        <>
          <AddIcon className={styles.addIcon} />
          {countId}
        </>
      )}
      {theme === 'button-back' && <BackIcon />}

      {children}
    </button>
  )
}
