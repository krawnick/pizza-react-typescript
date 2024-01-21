import { Link } from 'react-router-dom'

import styles from './CartEmpty.module.scss'

import cartEmptyImg from '../../assets/empty-cart.png'
import BackIcon from '../../pages/Cart/icons/backIcon.svg'
import { Button } from '../Button'

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
        <Button className={styles.goBackButton} theme="outline-gray">
          <BackIcon />
          <span>Вернуться назад</span>
        </Button>
      </Link>
    </div>
  )
}
