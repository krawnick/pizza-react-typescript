import axios from 'axios'
import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { ReactComponent as BackIcon } from '../Cart/icons/backIcon.svg'

import styles from './FullPizza.module.scss'

interface IFullPizzaProps {
  className?: string
}

interface IPizza {
  imageUrl: string
  name: string
  sizes: number[]
  types: number[]
  price: number
}

export const FullPizza = ({ className }: IFullPizzaProps): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [pizza, setPizza] = useState<IPizza>()
  const sizesPizza = [26, 30, 40]
  const typesPizza = ['Тонкое', 'Традиционное']

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas/${id}`
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return <div className={styles.fullPizzaLoading}>Готовим пиццу... 🙂</div>
  }

  const { name, price, imageUrl, sizes, types } = pizza

  return (
    <div className={cn(className, styles.fullPizza, styles.container)}>
      <div className={styles.fullPizzaBody}>
        <img className={styles.fullPizzaImage} src={imageUrl} />
        <h2 className={styles.fullPizzaTitle}>Пицца &quot;{name}&quot;</h2>
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
