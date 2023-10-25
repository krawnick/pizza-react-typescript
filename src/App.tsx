import './scss/app.scss'
import { Categories } from './components/Categories'
import { Header } from './components/Header'
import { PizzaBlock } from './components/PizzaBlock/'
import { Skeleton } from './components/PizzaBlock/Skeleton.jsx'
import { Sort } from './components/Sort'
import { useEffect, useState } from 'react'

export const App = () => {
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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  )
}
