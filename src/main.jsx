import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layout/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AllReviews from './pages/AllReviews.jsx';
import ReviewDetails from './pages/ReviewDetails.jsx';
import AddReview from './pages/AddReview.jsx';
import MyReviews from './pages/MyReviews.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import EditReview from './pages/EditReview.jsx';
import MyFavorites from './pages/MyFavorites.jsx';

import { Toaster } from 'react-hot-toast';

import axios from 'axios';

axios.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const userEmail = localStorage.getItem('userEmail');
    if (userEmail && !config.headers['X-User-Email']) {
      config.headers['X-User-Email'] = userEmail;
    }



    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {

      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/allreviews', element: <AllReviews /> },
      {
        path: '/reviewdetails/:id',
        element: <ReviewDetails />,
      },
      {
        path: '/add-review',
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: '/edit-review/:id',
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-favorites',
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);