import { useEffect, useState } from 'react'

import { Categories } from '../components/Categories.jsx'
import { PizzaBlock } from '../components/PizzaBlock/index.jsx'
import { Skeleton } from '../components/PizzaBlock/Skeleton.jsx'
import { Sort } from '../components/Sort'

export const Home = ({ value }) => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [categoryId, setCategoryId] = useState(0)
  const [typeSort, setTypeSort] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })

  const allPizzas = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

  const searchPizzas = pizzas.filter((pizza) => {
    return pizza.name.toLowerCase().includes(value.toLowerCase())
  })

  
  useEffect(() => {
    setIsLoading(true)
    // fetch('http://localhost:5172/pizzas')
    // fetch('./pizzasData.json')
    fetch(
      `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas?${categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${typeSort.sortProperty}&${typeSort.desc ? 'order=desc' : ''}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [setPizzas, categoryId, typeSort])

  console.log(typeSort)
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
          : allPizzas
        {/* {pizzas.map((pizza) =>
            isLoading ? (
              <Skeleton />
            ) : (
              <PizzaBlock key={pizza.id} {...pizza} />
            )
          )} */}
      </div>
    </div>
  )
}
