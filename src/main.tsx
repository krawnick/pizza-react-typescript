import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )

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

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <RouterProvider router={router} />
// )
