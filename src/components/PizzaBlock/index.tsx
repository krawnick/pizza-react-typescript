import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import AddIcon from './addIcon.svg'
import styles from './PizzaBlock.module.scss'
import { IPizzaBlockProps } from './PizzaBlock.props'

import { addItem } from '../../redux/slices/cartSlice'
import { Button } from '../Button'

export interface ICartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  type: string
  size: number
  count?: number
}

export const PizzaBlock = ({
  id,
  price,
  imageUrl,
  name,
  sizes,
  types,
}: IPizzaBlockProps): JSX.Element => {
  const dispatch = useDispatch()

  const { itemsState } = useSelector((state) => state.cart)

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

  const typeNames: ICartItem['type'][] = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)

  const pizzaPriceSize = () => {
    return Math.floor((price / sizes[0]) * sizes[activeSize])
  }

  const addPizzaToCart = () => {
    const item: ICartItem = {
      id,
      name,
      price: pizzaPriceSize(),
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    }
    dispatch(addItem(item))
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
        <Button
          className={(styles.buttonOutline, styles.buttonAdd)}
          theme="outline-orange"
          onClick={addPizzaToCart}
        >
          <div>
            <AddIcon className={styles.addIcon} />
            <span>Добавить</span>
            {countId > 0 ? <i>{countId}</i> : false}
          </div>
        </Button>
      </div>
    </div>
  )
}
