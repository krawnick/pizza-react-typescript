import cn from 'classnames'
import React from 'react'
import { Await, Link, useLoaderData } from 'react-router-dom'

import { Button } from '../../components'

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

const sizesPizza = [26, 30, 40]
const typesPizza = ['Тонкое', 'Традиционное']

export const FullPizza = ({ className }: IFullPizzaProps): JSX.Element => {
  const { pizza } = useLoaderData() as { pizza: IPizza }

  return (
    <React.Suspense
      fallback={
        <div className={styles.fullPizzaLoading}>Готовим пиццу... 🙂</div>
      }
    >
      <div className={cn(className, styles.fullPizza, styles.container)}>
        <div className={styles.fullPizzaBody}>
          <Await resolve={pizza} errorElement={<div>Ошибка</div>}>
            {(data) => {
              console.log(data)

              return (
                <>
                  <img className={styles.fullPizzaImage} src={data.imageUrl} />
                  <h2 className={styles.fullPizzaTitle}>
                    Пицца &quot;{data.name}&quot;
                  </h2>
                  <p className={styles.fullPizzaDescription}>
                    {data.description}
                  </p>
                  <div className={styles.fullPizzaParams}>
                    <p>Доступные размеры:</p>
                    <ul className={styles.fullPizzaParamsItems}>
                      {sizesPizza.map((size) => {
                        const checkingSize = data.sizes.includes(size)
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
                        const checkingType = data.types.includes(index)
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
                  <p className={styles.fullPizzaPrice}>от {data.price} ₽</p>
                </>
              )
            }}
          </Await>
          <Link to="/">
            <Button className={styles.goBackButton} appearance="back">
              Вернуться назад
            </Button>
          </Link>
        </div>
      </div>
    </React.Suspense>
  )
}
