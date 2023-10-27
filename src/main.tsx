import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import './index.css'
import { NotFound } from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage/>
  },
  // {
  //   path: '/NotFound',
  //   element: <NotFound />,
  //   // errorElement: <ErrorPage/>
  // },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
