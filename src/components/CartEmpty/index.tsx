import { Button } from '../Button'
import { Link } from 'react-router-dom'
import BackIcon from '../../pages/Cart/icons/backIcon.svg?react'
import cartEmptyImg from '../../assets/empty-cart.png'
import styles from './CartEmpty.module.scss'

export const CartEmpty = () => {
  return (
    <div className={styles.cartEmpty}>
      <h2>В корзине ничего нет 😕</h2>
      <p>
        Вероятней всего, вы не добавили пиццу.
        <br />
        Для того, чтобы добавить пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />

      <Link to="/">
        <Button className={styles.goBackButton} theme="outline-gray">
          <BackIcon />
          <span>Вернуться назад</span>
        </Button>
      </Link>
    </div>
  )
}
