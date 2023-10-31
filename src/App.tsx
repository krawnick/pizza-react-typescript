import './scss/app.scss'

import { Header } from './components/Header'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Outlet } from 'react-router-dom'

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet></Outlet>
        {/* <Home /> */}
        {/* <NotFound /> */}
      </div>
    </div>
  )
}
