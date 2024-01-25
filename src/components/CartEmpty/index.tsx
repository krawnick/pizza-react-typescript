import { Link } from 'react-router-dom'

import cartEmptyImg from '../../assets/empty-cart.png'
import { Button } from '../Button'

import styles from './CartEmpty.module.scss'

export const CartEmpty = (): JSX.Element => {
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
        <Button className={styles.backButton} theme="button-back">
          Вернуться назад
        </Button>
      </Link>
    </div>
  )
}
