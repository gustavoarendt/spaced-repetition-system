import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/Login/LoginPage';
import RegisterPage from '../pages/Auth/Register/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [],
  },
  {
    path: '/login',
    element: <LoginPage />,
    children: [],
  },
  {
    path: '/register',
    element: <RegisterPage />,
    children: [],
  },
]);

export default router;
