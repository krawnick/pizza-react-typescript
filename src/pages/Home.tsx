import { useEffect, useState } from 'react'

import { Categories } from '../components/Categories.jsx'
import { Pagination } from '../components/Pagination/index.js'
import { PizzaBlock } from '../components/PizzaBlock/index.jsx'
import { Skeleton } from '../components/PizzaBlock/Skeleton.jsx'
import { Sort } from '../components/Sort'

export const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [typeSort, setTypeSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const sortBy = `&sortBy=${typeSort.sortProperty}`
    const order = typeSort.desc ? '&order=desc' : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    fetch(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?${category}${sortBy}${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [setPizzas, categoryId, typeSort, searchValue])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={typeSort} onChangeSort={(sort) => setTypeSort(sort)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : pizzas.map((pizza) =>
            isLoading ? (
              <Skeleton />
            ) : (
              <PizzaBlock key={pizza.id} {...pizza} />
            )
          )}
      </div>
      <Pagination />
    </div>
  )
}
