import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '../layouts/MainLayout'
import { FullPizza } from '../pages/FullPizza'
import { Home } from '../pages/Home'
import { NotFound } from '../pages/NotFound'

const Cart = React.lazy(() =>
  import('../pages/Cart').then((module) => ({ default: module.Cart }))
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'cart',
        element: <Cart />,
        lazy: () =>
          import('../pages/Loading').then((module) => ({
            default: module.Loading,
          })),
      },
      {
        path: 'pizza/:id',
        element: <FullPizza />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
])
