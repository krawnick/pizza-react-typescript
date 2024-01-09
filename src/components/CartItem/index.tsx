import { useDispatch } from 'react-redux'
import { Button } from '../Button'
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice'
import styles from './CartItem.module.scss'
import MinusIcon from './icons/minusIcon.svg?react'
import PlusIcon from './icons/plusIcon.svg?react'

export const CartItem = ({ id, count, name, size, price, type, imageUrl }) => {
  const dispatch = useDispatch()
  const item = { id, size, type }

  const onClickPlus = () => {
    dispatch(addItem(item))
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
      <img className={styles.cartItemImage} src={imageUrl} alt="pizza-image" />
      <div className={styles.cartItemLabel}>
        <h2 className={styles.cartItemTitle}>{name}</h2>
        <span className={styles.cartItemInfo}>{`${size} см, ${type}`}</span>
      </div>
      <div className={styles.cartItemCount}>
        <Button
          onClick={onClickMinus}
          className={styles.cartItemMinus}
          theme="outline-action-gray"
        >
          <MinusIcon />
        </Button>
        <span className={styles.cartItemQuantity}>{count}</span>
        <Button
          onClick={onClickPlus}
          className={styles.cartItemPlus}
          theme="outline-action-orange"
        >
          <PlusIcon />
        </Button>
      </div>
      <span className={styles.cartItemPrice}>{price * count} ₽</span>
      <Button
        onClick={onClickRemove}
        className={styles.cartItemRemove}
        theme="outline-action-gray"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
