import { useNavigate } from 'react-router';
import { Form, FormResult } from '../../../Components/Form/Form.component';
import { UsersApi } from '../../../configs/api/users/users.api';
import './RegisterPage.scss';

const RegisterPage = () => {
  const navigate = useNavigate();
  const handleRegistry = async (formData: FormResult) => {
    await UsersApi.register(formData);
    navigate('/login');
  };

  return (
    <div className='RegisterPage'>
      <Form
        formName='Criar cadastro'
        linkUrl='/login'
        linkDescription='Já tem uma conta? Entrar.'
        props={[
          { fieldName: 'Nome', value: 'name', type: 'text', isRequired: true },
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
          {
            fieldName: 'Confirmar senha',
            value: 'confirmPassword',
            type: 'password',
            isRequired: true,
          },
        ]}
        onSubmit={handleRegistry}
      />
    </div>
  );
};

export default RegisterPage;
