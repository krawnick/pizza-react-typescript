import cn from 'classnames'
import { ReactNode } from 'react'

import styles from './Button.module.scss'
import { ReactComponent as AddIcon } from './icons/addIcon.svg'
import { ReactComponent as BackIcon } from './icons/backIcon.svg'
import { ReactComponent as MinusIcon } from './icons/minusIcon.svg'
import { ReactComponent as PlusIcon } from './icons/plusIcon.svg'

interface IButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  count?: number
  children?: ReactNode
  appearance:
    | 'default'
    | 'add'
    | 'back'
    | 'action-minus'
    | 'action-plus'
    | 'action-reset'
}

export const Button = ({
  children,
  className,
  appearance,
  count,
  ...props
}: IButtonProps) => {
  const countId = count !== undefined && count > 0 ? <i>{count}</i> : null

  return (
    <button
      className={cn(styles.button, className, {
        [styles.buttonDefault]: appearance === 'default',

        [styles.buttonAdd]: appearance === 'add',
        [styles.buttonBack]: appearance === 'back',

        [styles.buttonAction]: appearance.includes('action'),
        [styles.buttonActionMinus]: appearance === 'action-minus',
        [styles.buttonActionPlus]: appearance === 'action-plus',
        [styles.buttonActionReset]: appearance === 'action-reset',
      })}
      {...props}
    >
      {appearance === 'add' && (
        <>
          <AddIcon className={styles.addIcon} />
          {countId}
        </>
      )}
      {appearance === 'back' && <BackIcon />}

      {appearance === 'action-minus' ? <MinusIcon /> : null}
      {appearance === 'action-plus' ? <PlusIcon /> : null}
      {appearance === 'action-reset' ? <PlusIcon /> : null}

      {children}
    </button>
  )
}
