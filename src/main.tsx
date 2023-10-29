import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { App } from './App.tsx'
import './index.css'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home.tsx'
import { Cart } from './pages/Cart.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

// const router = createBrowserRouter([
//   {
//     element: <App />,
//     errorElement: ,
//     children: [
//       {
//         path: '/',
//         element: <Home />,
//       },
//     ],
//   },
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
