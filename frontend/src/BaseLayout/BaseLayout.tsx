import { RouterProvider } from 'react-router-dom';
import router from '../routes/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BaseLayout.css';

export default function BaseLayout() {
  const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.clear();
      window.location.reload();
    };

    return (
      <button className='logout-button' onClick={handleLogout}>
        Logout
      </button>
    );
  };

  const Header = () => {
    const selectedDeckName = localStorage.getItem('selectedDeckName');
    const token = localStorage.getItem('token');

    return (
      <div className='Header'>
        <p></p>
        <h3>{selectedDeckName || 'Spaced Repetition System'}</h3>
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
      <Header />
      <RouterProvider router={router} />
      <ToastContainer />
      <Footer />
    </div>
  );
}
