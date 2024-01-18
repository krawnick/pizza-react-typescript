import cn from 'classnames'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button } from '../../components/Button'
import { CartEmpty } from '../../components/CartEmpty'
import { CartItem } from '../../components/CartItem'
import CartIcon from '../../components/Header/cartIcon.svg'

import { cleartItems } from '../../redux/slices/cartSlice'

import styles from './Cart.module.scss'
import BackIcon from './icons/backIcon.svg'
import CartClearIcon from './icons/cartClearIcon.svg'

export const Cart = (): JSX.Element => {
  const dispatch = useDispatch()
  const { itemsState, totalCountState, totalPriceState } = useSelector(
    (state) => state.cart
  )

  const onCleartCart = () => {
    if (confirm('Вы хотите очистить корзину?')) {
      dispatch(cleartItems())
    }
  }
  console.log('itemsState', itemsState)

  if (totalCountState === 0) {
    return <CartEmpty />
  }

  return (
    <div className={cn(styles.container, styles.containerCart)}>
      <div className={styles.cart}>
        <div className={styles.cartTop}>
          <h2 className={styles.contentTitle}>
            <CartIcon />
            Корзина
          </h2>
          <div className={styles.cartClear} onClick={onCleartCart}>
            <CartClearIcon />
            <span>Очистить корзину</span>
          </div>
        </div>

        <div className={styles.contentItems}>
          {itemsState.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
        </div>
        <div className={styles.cartBottom}>
          <div className={styles.cartBottomDetails}>
            <span>
              {' '}
              Всего пицц: <b>{totalCountState} шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>{totalPriceState} ₽</b>{' '}
            </span>
          </div>
          <div className={styles.cartBottomButtons}>
            <Link to="/">
              <Button className={styles.goBackButton} theme="outline-gray">
                <BackIcon />
                <span>Вернуться назад</span>
              </Button>
            </Link>
            <Button className={styles.payButton} theme="orange">
              <span>Оплатить сейчас</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
