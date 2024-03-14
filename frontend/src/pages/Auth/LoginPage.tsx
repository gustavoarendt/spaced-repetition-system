import { FormEvent, useState } from 'react';
import './LoginPage.scss';
import { http } from '../../configs/http.config';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    http
      .post('/auth/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data['access_token']);
        window.location.reload();
      })
      .catch(({ response }) => {
        toast(response.data.message, { type: 'error' });
      });
  };

  return (
    <div className='LoginPage'>
      <ToastContainer />
      <form
        className='login-form'
        onSubmit={(e: FormEvent<HTMLFormElement>) => handleLogin(e)}
      >
        <h2>Conectar</h2>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>Senha:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
