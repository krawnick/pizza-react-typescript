import { createBrowserRouter, defer } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { Cart } from '../pages/Cart'
import FullPizza from '../pages/FullPizza'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        loader: async ({ params }) => {
          try {
            const data = await fetch(
              `https://6541fc13f0b8287df1ff3ff6.mockapi.io/pizzas/${params.id}`
            ).then((res) => res.json())

            if (typeof data === 'string') throw Error('Not found')

            return defer({
              pizza: data,
            })
          } catch (error) {
            alert(error)
          }
        },

        path: 'pizza/:id',
        element: <FullPizza />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
