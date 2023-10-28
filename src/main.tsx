import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import './index.css'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home.tsx'
import { Header } from './components/Header'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Header />,
        children: [{ path: '/home', element: <Home /> }],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
