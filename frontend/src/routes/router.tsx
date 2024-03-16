import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Auth/Login/LoginPage';
import RegisterPage from '../pages/Auth/Register/RegisterPage';
import DeckPage from '../pages/Deck/DeckPage';
import CardPage, { CreateCard } from '../pages/Card/CardPage';

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
  {
    path: '/decks/:deckId',
    element: <DeckPage />,
    children: [],
  },
  {
    path: '/decks/:deckId/cards',
    element: <CardPage />,
    children: [],
  },
  {
    path: '/decks/:deckId/cards/new',
    element: <CreateCard />,
    children: [],
  },
]);

export default router;
