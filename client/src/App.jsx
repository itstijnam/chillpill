import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
import Layout from './pages/Layout';
import MoviesPage from './pages/movie/MoviesPage';
import AddMovie from './pages/addmovie/AddMovie';
import Login from './pages/auth/Login';


const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: `m/:moviecat`,
        element: <MoviesPage/>
      },
      {
        path: `add`,
        element: <AddMovie/>
      },
    ]
  },
  {
    path:'/login',
    element: <Login/>
  },
  // {
  //   path:'/signup',
  //   element: <SignUp/>
  // }
])

function App() {
  return (
    <RouterProvider router={browserRouter} />
  )
}

export default App