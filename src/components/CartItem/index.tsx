import { useSelector } from 'react-redux'
import { Button } from '../Button'
import styles from './CartItem.module.scss'
import MinusIcon from './icons/minusIcon.svg?react'
import PlusIcon from './icons/plusIcon.svg?react'

export const CartItem = ({ id, name, size, price, type, imageUrl }) => {
  const { itemsState } = useSelector((state) => state.cart)
  const findItem = itemsState.find(
    (obj) => obj.id === id && obj.size === size && obj.type === type
  )
  const count = findItem.count

  return (
    <div className={styles.cartItem}>
      <img className={styles.cartItemImage} src={imageUrl} alt="pizza-image" />
      <div className={styles.cartItemLabel}>
        <h2 className={styles.cartItemTitle}>{name}</h2>
        <span className={styles.cartItemInfo}>{`${size} см, ${type}`}</span>
      </div>
      <div className={styles.cartItemCount}>
        <Button className={styles.cartItemMinus} theme="outline-action-gray">
          <MinusIcon />
        </Button>
        <span className={styles.cartItemQuantity}>{count}</span>
        <Button className={styles.cartItemPlus} theme="outline-action-orange">
          <PlusIcon />
        </Button>
      </div>
      <span className={styles.cartItemPrice}>{price} ₽</span>
      <Button theme="outline-action-gray">
        <PlusIcon className={styles.cartItemRemove} />
      </Button>
    </div>
  )
}
