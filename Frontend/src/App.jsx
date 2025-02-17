import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile'

function App() {

  const userData = useSelector((state)=>state.userData.userInfo)

  console.log("userSlice store value:",userData);

  if (userData) {
    var token = userData.token;
  }
  
  console.log("Token:",token);
  

  const router=createBrowserRouter([
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:"/",
      element: token ? <Home/> : <Login/>
    },
    {
      path:"/profile",
      element: token ? <Profile/> : <Login/>
    }
  ])
  return (
<RouterProvider router={router}></RouterProvider>
  )
}

export default App