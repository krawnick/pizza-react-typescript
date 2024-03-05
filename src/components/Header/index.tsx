import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { ReactComponent as LogoSvg } from '../../assets/pizza-logo.svg'
import { selectorCart } from '../../redux/slices/cart/selectors'
import { resetFilter } from '../../redux/slices/filter/slice'
import { useAppDispatch } from '../../redux/store'
import { Button } from '../Button'
import { Search } from '../Search'

import { ReactComponent as CartIcon } from './cartIcon.svg'
import styles from './Header.module.scss'

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { itemsState, totalCountState, totalPriceState } =
    useSelector(selectorCart)
  const location = useLocation()
  const onResetFilter = () => {
    dispatch(resetFilter())
  }

  // const isMounted = useRef(false)
  useEffect(() => {
    // if (isMounted.current) {
    const json = JSON.stringify({
      itemsState,
      totalCountState,
      totalPriceState,
    })
    localStorage.setItem('cart', json)
    // }
    // isMounted.current = true
  }, [totalPriceState])

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
        {location.pathname === '/' && <Search className={styles.search} />}
        <div className={styles.headerCart}>
          <Link to="/cart">
            <Button appearance="default" className={styles.buttonCart}>
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
