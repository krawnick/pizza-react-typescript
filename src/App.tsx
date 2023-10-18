import './scss/app.scss'
import { Categories } from './components/Categories'
import { Header } from './components/Header'
import { PizzaBlock } from './components/PizzaBlock'
import { Sort } from './components/Sort'

export const App = () => {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title='Мекскиканская' price='450' />
            <PizzaBlock />
            <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  )
}
