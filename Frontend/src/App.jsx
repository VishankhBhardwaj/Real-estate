
import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Signin from './Components/Signin/Signin'
import About from './Components/About/About'
import Mylist from './Components/Mylist/Mylist'
import Properties from './Page/Properties'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './Page/User/User'
import ContactForm from './Page/Contact/ContactForm'
import ViewProperty from './Page/ViewProperty/PropertyGallery'
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
  {
    path: '/Details',
    element: <div>
      <Navbar />
      <h1>Details</h1>
    </div>
  },
  {
    path: '/Mylist',
    element: <div>
      <Navbar />
      <Mylist />
    </div>
  },{
    path: '/Properties',
    element:<Properties />
  },{
    path: '/User',
    element: <div>
      <Navbar />
      <User />
    </div>
  },{
    path: '/Contact',
    element: <div>
      <Navbar />
      <ContactForm />
    </div>
  },
  {
    path: '/ViewProperty/:propertyId',
    element: <div>
      <Navbar />
      <ViewProperty />
    </div>
  }
])
function App() {


  return (
    <>
    <ToastContainer 
    position="top-right" 
    autoClose={3000} 
    hideProgressBar={false} 
    newestOnTop={false} 
    closeOnClick 
    rtl={false} 
    pauseOnFocusLoss 
    draggable 
    pauseOnHover 
/>

    <RouterProvider router={router} />
    </>
  )
}

export default App
