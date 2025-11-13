import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx'
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
import { Toaster } from 'react-hot-toast';
import EditReview from './pages/EditReview.jsx';
import MyFavorites from './pages/MyFavorites.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', 
        element: <Home />
       },

      { path: '/home',
         element: <Home /> 
        },

      { path: '/login',
         element: <Login /> 
        },

      { path: '/register',
         element: <Register />
        },

      { path: '/allreviews', 
        element: <AllReviews />
       },
      { path: '/reviewdetails',
         element: <ReviewDetails /> 
        },


      {
        path: '/editreview/:id',
        element: (
          <PrivateRoute>
            <EditReview />
          </PrivateRoute>
        ),
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
        path: '/my-reviews',
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-favorites",
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
  </StrictMode>,
);
