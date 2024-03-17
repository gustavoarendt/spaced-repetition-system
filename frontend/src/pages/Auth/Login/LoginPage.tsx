import { Form, FormResult } from '../../../Components/Form/Form.component';
import { useNavigate } from 'react-router-dom';
import { AuthApi } from '../../../configs/api/auth/auth.api';
import './LoginPage.scss';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegistry = async (formData: FormResult) => {
    await AuthApi.login(formData);
    navigate('/');
  };

  return (
    <div className='LoginPage'>
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
