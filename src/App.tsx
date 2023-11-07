import './scss/app.scss'

import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Home } from './pages/Home'

export const App = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <Header value={searchValue} setValue={setSearchValue} />
      <div className="content">
        <Outlet />
        <Home value={searchValue} />
        {/* <NotFound /> */}
      </div>
    </div>
  )
}
