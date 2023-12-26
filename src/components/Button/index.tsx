import cn from 'classnames'
import styles from './Button.module.scss'

export const Button = ({ children, className, theme, ...props }) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.buttonOrange]: theme === 'orange',
        [styles.buttonBlack]: theme === 'black',
        [styles.buttonOutlineOrange]: theme === 'outline-orange',
        [styles.buttonOutlineGray]: theme === 'outline-gray',
      })}
      {...props}
    >
      {children}
    </button>
  )
}