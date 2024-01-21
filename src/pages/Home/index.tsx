import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Home.module.scss'

import { Categories } from '../../components/Categories/'
import { Pagination } from '../../components/Pagination/'
import { PizzaBlock } from '../../components/PizzaBlock/'
import { Skeleton } from '../../components/PizzaBlock/Skeleton'
import { Sort } from '../../components/Sort/index'

import { setPage } from '../../redux/slices/filterSlice'
import { fetchPizzas } from '../../redux/slices/pizzasSlice'

export const Home = (): JSX.Element => {
  const dispatch = useDispatch()

  const pizzas = useSelector((state) => state.pizzas.items)
  const pizzasStatus = useSelector((state) => state.pizzas.status)

  const { paginationState, searchState, categoryState, sortState } =
    useSelector((state) => state.filter)

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
      case 'loading': {
        return [...new Array(4)].map((_, index) => <Skeleton key={index} />)
      }

      case 'success': {
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
        <Categories className={styles.categories} />
        <Sort />
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
