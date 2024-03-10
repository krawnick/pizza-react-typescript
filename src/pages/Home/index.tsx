import { useEffect } from 'react'

import { NotFound } from '..'
import { Categories, PizzaBlock, Skeleton, Sort } from '../../components'
import { selectorFilter } from '../../redux/slices/filter/selectors'
import {
  selectorPizzas,
  selectorPizzasStatus,
} from '../../redux/slices/pizzas/selectors'
import { fetchPizzas } from '../../redux/slices/pizzas/slice'
import { StatusLoading } from '../../redux/slices/pizzas/types'
import { useAppDispatch, useAppSelector } from '../../redux/store'

import styles from './Home.module.scss'

export const Home = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const pizzas = useAppSelector(selectorPizzas)
  const pizzasStatus = useAppSelector(selectorPizzasStatus)

  const { searchState, categoryState, sortState } =
    useAppSelector(selectorFilter)

  useEffect(() => {
    dispatch(fetchPizzas())

    window.scrollTo(0, 0)
  }, [categoryState, sortState, searchState])

  const showPizzas = () => {
    switch (pizzasStatus) {
      case StatusLoading.LOADING: {
        return [...new Array(4)].map((_, index) => <Skeleton key={index} />)
      }
      case StatusLoading.SUCCESS: {
        return pizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza}></PizzaBlock>
        ))
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentTop}>
        <Categories value={categoryState} className={styles.categories} />
        <Sort value={sortState} />
      </div>
      {pizzasStatus === StatusLoading.SUCCESS && pizzas.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <h2 className={styles.contentTitle}>Все пиццы</h2>
          <div className={styles.contentItems}>{showPizzas()}</div>
        </>
      )}
    </div>
  )
}
