import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/Index.js'

import { Home, Signup, Login, AddPhoto, AllPosts,AddPost, EditPost,
  Post, Profile, EditProfilePage, Settings, Logs } 
from './pages/Index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { 
        path: '/',
        element: <Home />
      },
      { 
        path: '/:slug',
        element: <h1>Sorry, this page isn't available.</h1>
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: '/add-profile/:slug',
        element: (
          <AuthLayout authentication>
            <AddPhoto />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts/',
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: '/all-posts/:slug',
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      },
      {
        path: '/add-post/',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/profile/:slug',
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        )
      },
      {
        path: '/edit-profile',
        element: (
          <AuthLayout authentication>
            <EditProfilePage />
          </AuthLayout>
        )
      },
      {
        path: '/settings',
        element: (
          <AuthLayout authentication>
            <Settings />
          </AuthLayout>
        )
      },
      {
        path: '/logs',
        element: (
          <AuthLayout authentication>
            <Logs />
          </AuthLayout>
        )
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
