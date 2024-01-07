import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './Cart.module.scss'
import BackIcon from './icons/backIcon.svg?react'
import CartIcon from '../../components/Header/cartIcon.svg?react'
import CartClearIcon from './icons/cartClearIcon.svg?react'
import { Button } from '../../components/Button'
import { CartItem } from '../../components/CartItem'
import { cleartItems } from '../../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Cart = () => {
  const dispatch = useDispatch()
  const { itemsState } = useSelector((state) => state.cart)

  return (
    <div className={cn(styles.container, styles.containerCart)}>
      <div className={styles.cart}>
        <div className={styles.cartTop}>
          <h2 className={styles.contentTitle}>
            <CartIcon />
            Корзина
          </h2>
          <div
            className={styles.cartClear}
            onClick={() => dispatch(cleartItems())}
          >
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
              Всего пицц: <b>3 шт.</b>{' '}
            </span>
            <span>
              {' '}
              Сумма заказа: <b>900 ₽</b>{' '}
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
