import { http } from '../../../configs/http.config';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../helpers/helpers';
import { Form, FormResult } from '../../../Components/Form/Form.component';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import './LoginPage.scss';

const LoginPage = () => {
  useEffect(() => {
    localStorage.removeItem('token');
  }, []);
  const navigate = useNavigate();

  const handleRegistry = async (formData: FormResult) => {
    await http
      .post('auth/login', formData)
      .then((response: AxiosResponse) => {
        localStorage.setItem('token', response.data['access_token']);
        toast('Bem vindo!', { type: 'success' });
        navigate('/');
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  };

  return (
    <div className='RegisterPage'>
      <Form
        formName='Login'
        linkUrl='/register'
        linkDescription='Ainda não tem uma conta? Cadastrar-se.'
        props={[
          {
            fieldName: 'Email',
            value: 'email',
            type: 'email',
            isRequired: true,
          },
          {
            fieldName: 'Senha',
            value: 'password',
            type: 'password',
            isRequired: true,
          },
        ]}
        onSubmit={handleRegistry}
      />
    </div>
  );
};

export default LoginPage;
