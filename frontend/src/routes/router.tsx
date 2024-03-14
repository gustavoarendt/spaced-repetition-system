import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/LoginPage';

const loggedUser = localStorage.getItem('token');

const router = createBrowserRouter([
  {
    path: '/',
    element: loggedUser ? <HomePage /> : <LoginPage />,
    children: [],
  },
]);

export default router;
