import cn from 'classnames'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Loader } from '../../components'
import { IPizzaObject } from '../../interface/Pizza.interface'

import styles from './FullPizza.module.scss'

interface IFullPizzaProps {
  className?: string
}

const sizesPizza = [26, 30, 40]
const typesPizza = ['Тонкое', 'Традиционное']

export const FullPizza = ({ className }: IFullPizzaProps): JSX.Element => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<IPizzaObject>()
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/' + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Произошла ошибка')
        }
        return res.json()
      })
      .then((data) => setPizza(data))
      .catch((error) => {
        alert(error)
        navigate('/')
      })
  }, [])

  return (
    <div className={cn(className, styles.fullPizza, styles.container)}>
      <div className={styles.fullPizzaBody}>
        {pizza ? (
          <>
            <img className={styles.fullPizzaImage} src={pizza.imageUrl} />
            <h2 className={styles.fullPizzaTitle}>
              Пицца &quot;{pizza.name}&quot;
            </h2>
            <p className={styles.fullPizzaDescription}>{pizza.description}</p>
            <div className={styles.fullPizzaParams}>
              <p>Доступные размеры:</p>
              <ul className={styles.fullPizzaParamsItems}>
                {sizesPizza.map((size) => {
                  const checkingSize = pizza.sizes.includes(size)
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
                  const checkingType = pizza.types.includes(index)
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
            <p className={styles.fullPizzaPrice}>от {pizza.price} ₽</p>
          </>
        ) : (
          <Loader />
        )}
        <Link to="/">
          <Button className={styles.goBackButton} appearance="back">
            Вернуться назад
          </Button>
        </Link>
      </div>
    </div>
  )
}
