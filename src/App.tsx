import './scss/app.scss'

import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          {/* <Home /> */}
          {/* <NotFound /> */}
        </div>
      </div>
    </div>
  )
}
