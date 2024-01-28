import cn from 'classnames'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button } from '../../components/Button'
import { CartEmpty } from '../../components/CartEmpty'
import { CartItem } from '../../components/CartItem'
import { ReactComponent as CartIcon } from '../../components/Header/cartIcon.svg'
import { clearItems, selectorCart } from '../../redux/slices/cartSlice'
import { useAppDispatch } from '../../redux/store'

import styles from './Cart.module.scss'
import { ReactComponent as CartClearIcon } from './icons/cartClearIcon.svg'

export const Cart = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { itemsState, totalCountState, totalPriceState } =
    useSelector(selectorCart)

  const onCleartCart = () => {
    if (confirm('Вы хотите очистить корзину?')) {
      dispatch(clearItems())
    }
  }

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
              <Button appearance="back">Вернуться назад</Button>
            </Link>
            <Button className={styles.payButton} appearance="default">
              Оплатить сейчас
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
