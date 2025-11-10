import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout.jsx'
import { Home } from 'lucide-react'
import About from './page/About.jsx'


const router= createBrowserRouter([
  {
    path: '/',
  element:<MainLayout></MainLayout>,
  children:[
    {
path:'/',
element:<Home></Home>
    },

    {
path:'/Home',
element:<Home></Home>
    },
    {
path:'/About',
element:<About></About>
    },


  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
