import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { Home, NotFound } from '../pages'

// eslint-disable-next-line react-refresh/only-export-components
const FullPizza = React.lazy(() =>
  import('../pages/').then((module) => ({ default: module.FullPizza }))
)
// eslint-disable-next-line react-refresh/only-export-components
const Cart = React.lazy(() =>
  import('../pages/').then((module) => ({ default: module.Cart }))
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
          <Suspense>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'pizza/:id',
        element: (
          <Suspense>
            <FullPizza />
          </Suspense>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
