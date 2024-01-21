import { useDispatch } from 'react-redux'

import styles from './CartItem.module.scss'
import { ICartItemProps } from './CartItem.props'
import MinusIcon from './icons/minusIcon.svg'
import PlusIcon from './icons/plusIcon.svg'

import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice'
import { Button } from '../Button'

export const CartItem = ({
  id,
  count,
  name,
  size,
  price,
  type,
  imageUrl,
}: ICartItemProps): JSX.Element => {
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
        `Вы дейсвительно хотите удалить пиццу:\n${name}, ${type}, ${size} см?`,
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
