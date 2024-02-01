import { useEffect } from 'react'

import {
  Categories,
  Pagination,
  PizzaBlock,
  Skeleton,
  Sort,
} from '../../components'
import { selectorFilter } from '../../redux/slices/filter/selectors'
import { setPage } from '../../redux/slices/filter/slice'
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

  const { paginationState, searchState, categoryState, sortState } =
    useAppSelector(selectorFilter)

  const getPizzasState = async () => {
    const category = categoryState > 0 ? `&category=${categoryState}` : ''
    const sortBy = `&sortBy=${sortState.sortProperty}`
    const order = sortState.desc ? '&order=desc' : ''
    const search = searchState ? `&search=${searchState}` : ''
    const page = `&page=${paginationState}`

    dispatch(fetchPizzas({ category, sortBy, order, search, page }))
  }

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

      default: {
        return (
          <div className="content__error">
            Произошла ошибка, попробуйте позже! <br />
            😢
          </div>
        )
      }
    }
  }

  useEffect(() => {
    getPizzasState()
    window.scrollTo(0, 0)
  }, [categoryState, sortState, searchState, paginationState])

  const onChangePage = (page: number): void => {
    dispatch(setPage(page))
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentTop}>
        <Categories value={categoryState} className={styles.categories} />
        <Sort value={sortState} />
      </div>
      <h2 className={styles.contentTitle}>Все пиццы</h2>
      <div className={styles.contentItems}>{showPizzas()}</div>
      <Pagination
        className={styles.paginationHome}
        onChangePage={onChangePage}
      />
    </div>
  )
}
