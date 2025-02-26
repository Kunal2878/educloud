import { useState } from 'react'
import{createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import LandingPage from './Frontend/Pages/LandingPage'
import UserOption from './Frontend/Pages/UserOption'
import Nav from './Frontend/Components/Navbar/Navbar'
import RegisterPrincipal from './Frontend/Pages/Principal/RegisterPrincipal'
import Login from './Frontend/Pages/Login'
import { Provider } from 'react-redux'
import { store } from './Store/store'
import Test from './Test'

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />
    },
    {
      path: "/user-options",
      element: <UserOption/>
    },
    {
      path: "/admin-signup",
      element: <RegisterPrincipal/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path:'/dashboard',
      element:<Nav path={"/dashboard"}/>
    },
    {
      path:'/mark-attendance',
      element:<Nav path={"/mark-attendance"}/>
    },
    {
      path:'/profile',
      element:<Nav path={"/profile"}/>
    },
    {
      path:'/all-students',
      element:<Nav path={"/all-students"}/>
    },
    {
      path:'/all-teachers',
      element:<Nav path={"/all-teachers"}/>
    },
    {
      path:'/assign-classes-subjects',
      element:<Nav path={"/assign-classes-subjects"}/>
    },
    {
      path:'/register-class',
      element:<Nav path={"/register-class"}/>
    },
    {
      path:'/events',
      element:<Nav path={"/events"}/>
    },
    {
      path:'/add-students',
      element:<Nav path={"/add-students"}/>
    },
    {
      path:'/add-teachers',
      element:<Nav path={"/add-teachers"}/>
    },
    {
      path:'/register-subjects',
      element:<Nav path={"/register-subjects"}/>
    },
    {
      path:'/time-table',
      element:<Nav path={"/time-table"}/>
    },
    {
      path:'/create-exams',
      element:<Nav path={"/create-exams"}/>
    },
    {
      path:'/test',
      element:<Test/>

    }
  ])

  return (
    <Provider store={store}>
    <div className='w-full flex flex-col bg-slate-200 overflow-x-hidden'>
      <RouterProvider router={routes} />
    </div>
    </Provider>
  )
}
export default App
