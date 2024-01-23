import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'



import { ReactComponent as LogoSvg } from '../../assets/pizza-logo.svg'
import { selectorCart } from '../../redux/slices/cartSlice'
import { Button } from '../Button'
import { Search } from '../Search'

import { ReactComponent as CartIcon } from './cartIcon.svg'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
  const { totalPriceState, totalCountState } = useSelector(selectorCart)

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.headerLogo}>
            <LogoSvg />
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
              <span>{totalCountState}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
