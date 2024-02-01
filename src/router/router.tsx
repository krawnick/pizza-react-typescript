import React from 'react'
import { createBrowserRouter, defer } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { Home, NotFound } from '../pages'

const FullPizza = React.lazy(() =>
  import(/* webpackChunkName: 'FullPizzaChunk' */ '../pages/FullPizza').then(
    (module) => ({ default: module.FullPizza })
  )
)

const Cart = React.lazy(() =>
  import(/* webpackChunkName: 'CartChunk' */ '../pages/Cart').then(
    (module) => ({ default: module.Cart })
  )
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'cart',
        element: (
          <React.Suspense fallback={<h1>🍕🍕🍕🍕🍕🍕🍕🍕</h1>}>
            <Cart />
          </React.Suspense>
        ),
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
