import { useContext, useEffect, useState } from 'react'

import { Categories } from '../components/Categories/index.js'
import { Pagination } from '../components/Pagination/index.js'
import { PizzaBlock } from '../components/PizzaBlock/index.js'
import { Skeleton } from '../components/PizzaBlock/Skeleton.js'
import { Sort } from '../components/Sort/index.js'
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

  const getPizzas = () => {
    console.log(pizzas.length)
    if (typeof pizzas === 'object') {
      return pizzas.map((pizza) => (
        <PizzaBlock key={pizza.id} {...pizza}></PizzaBlock>
      ))
    }
    return (
      <div className="content__empty">
        Ничего не найдено <br />
        😢
      </div>
    )
  }

  useEffect(() => {
    setIsLoading(true)

    const category = categoryState > 0 ? `&category=${categoryState}` : ''
    const sortBy = `&sortBy=${sortState.sortProperty}`
    const order = sortState.desc ? '&order=desc' : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    const page = `&page=${currentPage}`

    fetch(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?limit=4${page}${search}${category}${sortBy}${order}`
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
        {isLoading ? skeletons : getPizzas()}
      </div>
      <Pagination
        className="paginationHome"
        onChangePage={(number) => setCurrentPage(number)}
      />
    </div>
  )
}
