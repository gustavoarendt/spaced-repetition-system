import router from '../routes/router';
import { ToastContainer } from 'react-toastify';
import { Button } from '../Components/Button/Button.component';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './BaseLayout.scss';
import { ICONS } from '../helpers/icons';

export default function BaseLayout() {
  const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.clear();
      window.location.href = '/login';
    };

    return <Button onClick={handleLogout}>Sair</Button>;
  };

  const isLoginOrRegisterPage = () => {
    const { pathname } = window.location;
    return (
      pathname === '/login' || pathname === '/register' || pathname === '/'
    );
  };

  const Header = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const goBack = () => {
      navigate(-1);
    };
    return (
      <header className='Header'>
        {!isLoginOrRegisterPage() && (
          <Button onClick={goBack}>
            <i className={ICONS.ARROW_LEFT} />
          </Button>
        )}
        <h3 className='Header__Title' onClick={() => navigate('/')}>
          {'Spaced Repetition'}
        </h3>
        {token ? <LogoutButton /> : <p></p>}
      </header>
    );
  };

  const Footer = () => {
    return (
      <footer className='Footer'>
        <figure>
          <a
            href='https://github.com/gustavoarendt'
            target='_blank'
            rel='noreferrer'
          >
            <i className={ICONS.GITHUB}></i>
          </a>
        </figure>
        <figure>
          <a
            href='https://www.linkedin.com/in/gustavoarendt/'
            target='_blank'
            rel='noreferrer'
          >
            <i className={ICONS.LINKEDIN}></i>
          </a>
        </figure>
        <figure>
          <a
            href='https://twitter.com/GustyZero'
            target='_blank'
            rel='noreferrer'
          >
            <i className={ICONS.TWITTER}></i>
          </a>
        </figure>
      </footer>
    );
  };

  return (
    <div className='Container'>
      <BrowserRouter>
        <Header />
        <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
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
