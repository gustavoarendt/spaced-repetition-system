import router from '../routes/router';
import { ToastContainer } from 'react-toastify';
import { Button } from '../Components/Button/Button.component';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './BaseLayout.scss';

export default function BaseLayout() {
  const token = localStorage.getItem('token');

  const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = '/login';
    };

    return <Button onClick={handleLogout}>Logout</Button>;
  };

  const isLoginOrRegisterPage = () => {
    const { pathname } = window.location;
    return pathname === '/login' || pathname === '/register';
  };

  const Header = () => {
    const navigate = useNavigate();
    return (
      <div className='Header'>
        {!isLoginOrRegisterPage() && (
          <Button onClick={() => navigate(-1)}>{'Voltar'}</Button>
        )}
        <h3>{'Spaced Repetition'}</h3>
        {token ? <LogoutButton /> : <p></p>}
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className='Footer'>
        <h3>Footer</h3>
      </div>
    );
  };

  return (
    <div className='Container'>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          {router.routes.map((route: any) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
