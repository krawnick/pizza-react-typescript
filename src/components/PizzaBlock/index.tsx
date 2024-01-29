import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectorCart } from '../../redux/slices/cart/selectors'
import { addItem } from '../../redux/slices/cart/slice'
import { useAppDispatch } from '../../redux/store'
import { Button } from '../Button'
import { ICartItem } from '../CartItem'

import styles from './PizzaBlock.module.scss'

export interface IPizzaBlockProps {
  id: string
  price: number
  imageUrl: string
  name: string
  sizes: number[]
  types: number[]
}

export const PizzaBlock = ({
  id,
  price,
  imageUrl,
  name,
  sizes,
  types,
}: IPizzaBlockProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const { itemsState } = useSelector(selectorCart)

  const countId = itemsState.reduce(
    (sum: number, item: { count: number; id: string }) => {
      if (item.id === id) {
        return sum + item.count
      } else {
        return sum
      }
    },
    0
  )

  const typeNames = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)

  const pizzaPriceSize = () => {
    return Math.floor((price / sizes[0]) * sizes[activeSize])
  }

  const addPizzaToCart = () => {
    const item: Omit<ICartItem, 'count'> = {
      id,
      name,
      price: pizzaPriceSize(),
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    }

    dispatch(addItem(item as ICartItem))
  }

  return (
    <div className={styles.pizzaBlock}>
      <Link to={`/pizza/${id}`}>
        <img className={styles.pizzaBlockImage} src={imageUrl} alt="Pizza" />
        <h4 className={styles.pizzaBlockTitle}>{name}</h4>
      </Link>
      <div className={styles.pizzaBlockSelector}>
        <ul>
          {types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveType(type)}
              className={
                types.length > 1
                  ? activeType === type
                    ? styles.active
                    : ''
                  : styles.active
              }
            >
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? styles.active : ''}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.pizzaBlockBottom}>
        <div className={styles.pizzaBlockPrice}>от {pizzaPriceSize()} ₽</div>
        <Button appearance="add" count={countId} onClick={addPizzaToCart}>
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  )
}
