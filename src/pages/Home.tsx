import { Categories } from '../components/Categories/index.js'
import { Pagination } from '../components/Pagination/index.js'
import { PizzaBlock } from '../components/PizzaBlock/index.js'
import { Skeleton } from '../components/PizzaBlock/Skeleton.js'
import { Sort } from '../components/Sort/index.js'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setPage } from '../redux/slices/filterSlice.js'
import { fetchPizzas } from '../redux/slices/pizzasSlice.js'

export const Home = () => {
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

  return (
    <div className="container">
      <div className="content__top">
        <Categories className="categories" />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{showPizzas()}</div>
      <Pagination
        className="paginationHome"
        onChangePage={(number) => dispatch(setPage(number))}
      />
    </div>
  )
}
