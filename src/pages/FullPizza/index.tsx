import { Link, useParams } from 'react-router-dom'
import styles from './FullPizza.module.scss'
import cn from 'classnames'
import axios from 'axios'
import BackIcon from '../Cart/icons/backIcon.svg?react'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'

export const FullPizza = ({ className }) => {
  const { id } = useParams()

  const [pizza, setPizza] = useState('')

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas/${id}`
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
      }
    }

    fetchPizza()
  }, [])

  const { name, sizes, types, imageUrl, price } = pizza

  const size1 = [26, 30, 40]
  const size2 = [26]

  function isInArray(element) {
    return size2.indexOf(element) !== -1
  }

  const newArray = size1.filter(isInArray)

  console.log(newArray)

  if (!pizza) {
    return <h2>Готовим пиццу...</h2>
  }

  return (
    <div className={cn(className, styles.fullPizza)}>
      <div className={styles.fullPizzaBody}>
        <img className={styles.fullPizzaImage} src={imageUrl} />
        <h2 className={styles.fullPizzaTitle}>Пицца "{name}"</h2>
        <p className={styles.fullPizzaDescription}>
          Описане пиццы необходимо добавить! Описане пиццы необходимо добавить!
          Описане пиццы необходимо добавить! Описане пиццы необходимо добавить!
          Описане пиццы необходимо добавить! Описане пиццы необходимо добавить!
          Описане пиццы необходимо добавить! Описане пиццы необходимо добавить!
          Описане пиццы необходимо добавить! Описане пиццы необходимо добавить!
          Описане пиццы необходимо добавить!
        </p>
        <div className={styles.fullPizzaSizes}>
          <p>Доступные размеры:</p>
          <ul className={styles.fullPizzaSizesItems}>
            {sizes.map((size) => {
              return (
                <li key={size} className={cn(styles.fullPizzaSizesItem)}>
                  {size} см
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.fullPizzaTypes}>
          <p>Доступные виды теста:</p>
          <ul className={styles.fullPizzaTypesItems}>
            <li className={styles.fullPizzaTypesItem}>Тонкое тесто</li>
            <li className={styles.fullPizzaTypesItem}>Традиционное тесто</li>
          </ul>
        </div>
        <p className={styles.fullPizzaPrice}>от {price} ₽</p>
        <Link to="/">
          <Button className={styles.goBackButton} theme="outline-gray">
            <BackIcon />
            Вернуться назад
          </Button>
        </Link>
      </div>
    </div>
  )
}
