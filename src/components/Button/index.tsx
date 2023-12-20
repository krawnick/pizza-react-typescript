import cn from 'classnames'
import styles from './Button.module.scss'

export const Button = ({ children, className }) => {
  return <button className={cn(styles.button, className)}>{children}</button>
}
