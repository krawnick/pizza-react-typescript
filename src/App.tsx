import './scss/app.scss'

import { useState } from 'react'
import { Home } from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Cart } from './pages/Cart'
import { Header } from './components/Header'

export const App = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="wrapper">
      <Header value={searchValue} setValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  )
}
