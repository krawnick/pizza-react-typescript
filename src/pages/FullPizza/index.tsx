import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from './FullPizza.module.scss'
import cn from 'classnames'
import axios from 'axios'
import BackIcon from '../Cart/icons/backIcon.svg?react'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'

export const FullPizza = ({ className }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [pizza, setPizza] = useState('')
  const [isLoading, setLoading] = useState(true)
  const sizesPizza = [26, 30, 40]
  const typesPizza = ['Тонкое', 'Традиционное']

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas/${id}`
        )
        setPizza(data)
        setLoading(false)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  const { name, sizes, types, imageUrl, price } = pizza

  if (isLoading) {
    return <div className={styles.fullPizzaLoading}>Готовим пиццу... 🙂</div>
  }

  return (
    <div className={cn(className, styles.fullPizza)}>
      <div className={styles.fullPizzaBody}>
        <img className={styles.fullPizzaImage} src={imageUrl} />
        <h2 className={styles.fullPizzaTitle}>Пицца "{name}"</h2>
        <p className={styles.fullPizzaDescription}>
          Описание пиццы необходимо добавить! Описание отсутствует! Описание
          пиццы необходимо добавить! Описание отсутствует! Описание пиццы
          необходимо добавить! Описание отсутствует! Описание пиццы необходимо
          добавить! Описание отсутствует! Описание пиццы необходимо добавить!
          Описание отсутствует!
        </p>
        <div className={styles.fullPizzaParams}>
          <p>Доступные размеры:</p>
          <ul className={styles.fullPizzaParamsItems}>
            {sizesPizza.map((size) => {
              const checkingSize = sizes.includes(size)
              return (
                <li
                  key={size}
                  className={cn({
                    [styles.fullPizzaParamsItem]: true,
                    [styles.active]: checkingSize,
                  })}
                >
                  {size} см
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.fullPizzaParams}>
          <p>Доступные виды теста:</p>
          <ul className={styles.fullPizzaParamsItems}>
            {typesPizza.map((type, index) => {
              const checkingType = types.includes(index)
              return (
                <li
                  key={type}
                  className={cn({
                    [styles.fullPizzaParamsItem]: true,
                    [styles.active]: checkingType,
                  })}
                >
                  {type} тесто
                </li>
              )
            })}
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
