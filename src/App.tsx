import './scss/app.scss'
import { Categories } from './components/Categories'
import { Header } from './components/Header'
import { PizzaBlock } from './components/PizzaBlock'
import { Sort } from './components/Sort'
import { useEffect, useState } from 'react'

export const App = () => {
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('http://localhost:5172/pizzas')
      .then((res) => res.json())
      .then((json) => setPizzas(json))
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
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
