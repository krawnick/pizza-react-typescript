import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import './index.css'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home.tsx'
import { Header } from './components/Header'

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: [<Header />, <NotFound />],
    children: [
      {
        path: '/',
        element: [<Header />, <Home />],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
