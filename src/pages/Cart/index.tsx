import { Link } from 'react-router-dom'
import cn from 'classnames'
import styles from './Cart.module.scss'
import stylesPizzaBlock from '../../components/PizzaBlock/PizzaBlock.module.scss'
import BackIcon from './icons/backIcon.svg?react'
import CartIcon from '../../components/Header/cartIcon.svg?react'
import CartClearIcon from './icons/cartClearIcon.svg?react'
import MinusIcon from './icons/minusIcon.svg?react'
import PlusIcon from './icons/plusIcon.svg?react'
import { Button } from '../../components/Button'

export const Cart = () => {
  return (
    <div className={cn(styles.container, styles.containerCart)}>
      <div className={styles.cart}>
        <div className={styles.cartTop}>
          <h2 className={styles.contentTitle}>
            <CartIcon />
            Корзина
          </h2>
          <div className={styles.cartClear}>
            <CartClearIcon />
            <span>Очистить корзину</span>
          </div>
        </div>

        <div className={styles.contentItems}>
          <div className={styles.cartItem}>
            <div className={styles.cartItemImg}>
              <img
                className={stylesPizzaBlock.pizzaBlockImage}
                src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                alt="Pizza"
              />
            </div>
            <div className={styles.cartItemInfo}>
              <h3>Сырный цыпленок</h3>
              <p>тонкое тесто, 26 см.</p>
            </div>
            <div className={styles.cartItemCount}>
              {/* <div className="button button--outline button--circle cart__item-count-minus">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                    fill="#EB5A1E"
                  />
                  <path
                    d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                    fill="#EB5A1E"
                  />
                </svg>
              </div> */}
              <Button theme="outline-action-gray">
                <MinusIcon fill="black" />
              </Button>
              <b>2</b>
              <Button theme="outline-action-orange">
                <PlusIcon fill="black" />
              </Button>
            </div>
            <div className={styles.cartItemPrice}>
              <b>770 ₽</b>
            </div>
            <div className={styles.cartItemRemove}>
              <Button theme="outline-action-gray">
                <PlusIcon fill="black" />
              </Button>
            </div>
          </div>
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
            <Link
              to="/"
              // className="button button--outline button--add go-back-btn"
            >
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
