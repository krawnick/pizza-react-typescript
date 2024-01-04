import { Button } from '../Button'
import { Link } from 'react-router-dom'
import { Search } from '../Search'
import { useSelector } from 'react-redux'
import CartIcon from './cartIcon.svg?react'
import logoSvg from '../../assets/pizza-logo.svg'
import styles from './Header.module.scss'

export const Header = () => {
  const { totalPriceState, itemsState } = useSelector((state) => state.cart)

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
            <Button theme="orange" className={styles.buttonCart}>
              <span>{totalPriceState}&nbsp;₽</span>
              <div className={styles.buttonDelimiter}></div>
              <CartIcon />
              <span>{itemsState.length}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
