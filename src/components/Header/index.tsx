import { Button } from '../Button'
import CartIcon from './cartIcon.svg?react'
import { Link } from 'react-router-dom'
import { Search } from '../Search'
import logoSvg from '../../assets/pizza-logo.svg'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.headerLogo}>
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search className={styles.search} />
        <div className={styles.headerCart}>
          <Link to="/cart">
            <Button className={styles.buttonCart}>
              <span>520&nbsp;₽</span>
              <div className={styles.buttonDelimiter}></div>
              <CartIcon />
              <span>3</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
