import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ReactComponent as LogoSvg } from '../../assets/pizza-logo.svg'
import { selectorCart } from '../../redux/slices/cartSlice'
import { resetFilter } from '../../redux/slices/filterSlice'
import { useAppDispatch } from '../../redux/store'
import { Button } from '../Button'
import { Search } from '../Search'

import { ReactComponent as CartIcon } from './cartIcon.svg'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { totalPriceState, totalCountState } = useSelector(selectorCart)

  const onResetFilter = () => {
    dispatch(resetFilter())
  }

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to="/" onClick={onResetFilter}>
          <div className={styles.headerLogo}>
            <LogoSvg />
            <div>
              <h1>{'<BuyPizza />'}</h1>
              <p></p>
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
