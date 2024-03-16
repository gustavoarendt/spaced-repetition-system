import { Form, FormResult } from '../../../Components/Form/Form.component';
import { http } from '../../../configs/http.config';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../helpers/helpers';
import './RegisterPage.scss';

const RegisterPage = () => {
  const handleRegistry = async (formData: FormResult) => {
    if (formData.password !== formData.confirmPassword) {
      toast('Senhas não conferem', { type: 'error' });
      return;
    }
    const { confirmPassword, ...user } = formData;

    await http
      .post('users', user)
      .then(() => {
        toast('Usuário registrado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
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
