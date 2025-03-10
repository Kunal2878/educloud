import { useState } from 'react'
import{createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import LandingPage from './Frontend/Pages/LandingPage'
import SchoolLandingPage from './Frontend/Pages/LandingPage2'
import UnderMaintenance from './Frontend/Pages/UnderMaintence'
import Nav from './Frontend/Components/Navbar/Navbar'
import RegisterPrincipal from './Frontend/Pages/Principal/RegisterPrincipal'
import Login from './Frontend/Pages/Login'
import UserOption from './Frontend/Pages/UserOption'
import { Provider } from 'react-redux'
import { store } from './Store/store'
import Test from './Test'

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <SchoolLandingPage />
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
      path: "/user-options",
      element: < UserOption/> 

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
      path:'/all-exams',
      element:<Nav path={"/all-exams"}/>
    },
    {
      path:'/my-attendance',
      element:<Nav path={"/my-attendance"}/>
    },
    {
      path:'/my-exams',
      element:<Nav path={"/my-exams"}/>
    },
    {
      path:'/my-subjects',
      element:<Nav path={"/my-subjects"}/>
    },
    {
      path:'/my-results',
      element:<Nav path={"/my-results"}/>
    },
    {
      path:'/my-students',
      element:<Nav path={"/my-students"}/>
    },
    {
      path:'/all-classes',
      element:<Nav path={"/all-classes"}/>
    },
    {
      path:'/payment-modes',
      element:<Nav path={"/payment-modes"}/>
    },
    {
      path:'/all-subjects',
      element:<Nav path={"/all-subjects"}/>
    },
    {
      path:'/leaderboard',
      element:<Nav path={"/leaderboard"}/>
    },
    {
      path:'/add-marks',
      element:<Nav path={"/add-marks"}/>
    },
    {
      path:'/id-card',
      element:<Nav path={"/id-card"}/>
    },
    {
      path:'/teacher-attendance',
      element:<Nav path={"/teacher-attendance"}/>
    },
    {
      path:'/my-time-table',
      element:<Nav path={"/my-time-table"}/>
    },
    {
      path:'/my-results',
      element:<Nav path={"/my-results"}/>
    },
    {
      path:'/my-subjects',
      element:<Nav path={"/my-subjects"}/>
    },
    {
      path:'/under-maintenance',
      element:<UnderMaintenance/>
    },
    {
      path:'/test',
      element:<Test/>

    }
  ])

  return (
    <Provider store={store}>
    <div className='w-full flex flex-col bg overflow-x-hidden'>
      <RouterProvider router={routes} />
    </div>
    </Provider>
  )
}
export default App
