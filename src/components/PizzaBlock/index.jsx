import { Button } from '../Button'
import { useState } from 'react'
import AddIcon from './addIcon.svg?react'
import cn from 'classnames'
import styles from './PizzaBlock.module.scss'

export const PizzaBlock = ({ price, imageUrl, name, sizes, types }) => {
  const typeNames = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  return (
    <div className={styles.pizzaBlock}>
      <img className={styles.pizzaBlockImage} src={imageUrl} alt="Pizza" />
      <h4 className={styles.pizzaBlockTitle}>{name}</h4>
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
        <div className={styles.pizzaBlockPrice}>от {price} ₽</div>

        <Button className={cn(styles.buttonOutline, styles.buttonAdd)}>
          <div>
            <AddIcon />
            <span>Добавить</span>
            <i>1</i>
          </div>
        </Button>
      </div>
    </div>
  )
}
