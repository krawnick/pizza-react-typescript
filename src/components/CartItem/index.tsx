import { Link } from 'react-router-dom'

import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice'
import { useAppDispatch } from '../../redux/store'
import { Button } from '../Button'

import styles from './CartItem.module.scss'

export interface ICartItem {
  id: string
  count: number
  name: string
  size: number
  price: number
  type: string
  imageUrl: string
}

export type TCartItemAction = Omit<
  ICartItem,
  'name' | 'price' | 'imageUrl' | 'count'
>

export type TCartAddItem = Omit<ICartItem, 'count'>

export const CartItem = ({
  id,
  count,
  name,
  size,
  price,
  type,
  imageUrl,
}: ICartItem): JSX.Element => {
  const dispatch = useAppDispatch()

  const item: TCartItemAction = {
    id,
    size,
    type,
  }

  const onClickPlus = () => {
    dispatch(addItem(item as ICartItem))
  }

  const onClickMinus = () => {
    dispatch(minusItem(item))
  }

  const onClickRemove = () => {
    if (
      confirm(
        `Вы дейсвительно хотите удалить пиццу:\n${name}, ${type}, ${size} см?`
      )
    )
      dispatch(removeItem(item))
  }

  return (
    <div className={styles.cartItem}>
      <Link to={`/pizza/${id}`}>
        <img
          className={styles.cartItemImage}
          src={imageUrl}
          alt="pizza-image"
        />
      </Link>
      <div className={styles.cartItemLabel}>
        <h2 className={styles.cartItemTitle}>{name}</h2>
        <span className={styles.cartItemInfo}>{`${size} см, ${type}`}</span>
      </div>
      <div className={styles.cartItemCount}>
        <Button
          onClick={onClickMinus}
          className={styles.cartItemMinus}
          appearance="action-minus"
          disabled={count === 1 ? true : false}
        ></Button>
        <span className={styles.cartItemQuantity}>{count}</span>
        <Button
          onClick={onClickPlus}
          className={styles.cartItemPlus}
          appearance="action-plus"
        ></Button>
      </div>
      <span className={styles.cartItemPrice}>{price * count} ₽</span>
      <Button
        onClick={onClickRemove}
        className={styles.cartItemRemove}
        appearance="action-reset"
      ></Button>
    </div>
  )
}
