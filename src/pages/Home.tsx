import { useContext, useEffect, useState } from 'react'

import { Categories } from '../components/Categories/'
import { Pagination } from '../components/Pagination/'
import { PizzaBlock } from '../components/PizzaBlock/'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Sort } from '../components/Sort/'
import { SearchContext } from '../App.js'
import { useSelector } from 'react-redux'

export const Home = () => {
  const sortState = useSelector((state) => state.filter.sort)
  const categoryState = useSelector((state) => state.filter.categoryId)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { searchValue } = useContext(SearchContext)

  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ))

  useEffect(() => {
    setIsLoading(true)

    const category = categoryState > 0 ? `&category=${categoryState}` : ''
    const sortBy = `&sortBy=${sortState.sortProperty}`
    const order = sortState.desc ? '&order=desc' : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const page = `&page=${currentPage}`

    fetch(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?limit=4${page}${category}${sortBy}${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [setPizzas, categoryState, sortState, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories className="categories" />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          skeletons
        ) : pizzas.length ? (
          pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)
        ) : (
          <div class="content__empty">
            Ничего не найдено <br />
            😢
          </div>
        )}
      </div>
      <Pagination
        className="paginationHome"
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  )
}
