import { useEffect, useState } from 'react'

import { Categories } from '../components/Categories.jsx'
import { PizzaBlock } from '../components/PizzaBlock/index.jsx'
import { Skeleton } from '../components/PizzaBlock/Skeleton.jsx'
import { Sort } from '../components/Sort.jsx'

export const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // fetch('http://localhost:5172/pizzas')
    fetch('./pizzasData.json')
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json)
        setIsLoading(false)
      })
  }, [setPizzas])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        {/* {pizzas.map((pizza) =>
            isLoading ? (
              <Skeleton />
            ) : (
              <PizzaBlock key={pizza.id} {...pizza} />
            )
          )} */}
      </div>
    </>
  )
}
