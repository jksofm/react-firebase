import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login'
import AuthenticatedContainer from './layouts/AuthenticatedContainer'
import { Spin } from 'antd'
import { Home } from './pages/Home'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: AuthenticatedContainer,
    children: [
      {
        path: 'login',

        Component: Login
      },

      {
        id: 'auth',
        path: '/',

        children: [
          {
            id: 'home',
            path: '/home',
            Component: Home
          }
        ]
      }
    ]
  }
])

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<Spin />} />
}

export default Router
