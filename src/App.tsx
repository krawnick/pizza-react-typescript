import './scss/app.scss'

import { Header } from './components/Header'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

export const App = () => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <Header value={searchValue} setValue={setSearchValue} />
      <div className="content">
        <Outlet />
        {/* <Home /> */}
        {/* <NotFound /> */}
      </div>
    </div>
  )
}
