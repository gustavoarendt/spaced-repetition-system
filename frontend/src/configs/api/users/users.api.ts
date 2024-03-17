import { toast } from 'react-toastify';
import { FormResult } from '../../../Components/Form/Form.component';
import { http } from '../../http.config';
import { getErrorMessage } from '../../../helpers/helpers';

export const UsersApi = {
  register: async (data: FormResult) => {
    if (data.password !== data.confirmPassword) {
      toast('Senhas não conferem', { type: 'error' });
      return;
    }

    const { confirmPassword, ...user } = data;
    await http
      .post('users', user)
      .then(() => {
        toast('Usuário registrado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
};
