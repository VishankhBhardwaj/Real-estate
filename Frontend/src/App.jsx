
import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Signin from './Components/Signin/Signin'
import About from './Components/About/About'
const router = createBrowserRouter([
  {
    path: '/',
    element:
    <div>
      <Navbar />
      <Home />
    </div>
  },
  {
    path: '/Signin',
    element:
    <div>
      <Navbar />
      <Signin />
    </div>
  },
  {path: '/About',
    element: <div>
      <Navbar />
      <About />
    </div>
  },
])
function App() {


  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
