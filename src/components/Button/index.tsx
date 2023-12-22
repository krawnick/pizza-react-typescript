import cn from 'classnames'
import styles from './Button.module.scss'

export const Button = ({ children, className, theme, ...props }) => {
  console.log(theme)
  return (
    <button
      className={cn(styles.button, className, {
        [styles.buttonOrange]: theme === 'orange',
        [styles.buttonBlack]: theme === 'black',
        [styles.buttonOutline]: theme === 'outline',
      })}
      {...props}
    >
      {children}
    </button>
  )
}
