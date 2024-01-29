import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './scss/App.scss'

import { MainLayout } from './layouts/MainLayout'
import { Cart } from './pages/Cart'
import { FullPizza } from './pages/FullPizza'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { store } from './redux/store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'cart', element: <Cart /> },
      {
        path: 'pizza/:id',
        element: <FullPizza />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
