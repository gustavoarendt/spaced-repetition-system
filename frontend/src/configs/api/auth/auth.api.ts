import { AxiosResponse } from 'axios';
import { FormResult } from '../../../Components/Form/Form.component';
import { http } from '../../http.config';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../helpers/helpers';

export const AuthApi = {
  login: async (data: FormResult) => {
    await http
      .post('auth/login', data)
      .then((response: AxiosResponse) => {
        localStorage.setItem('token', response.data['access_token']);
        toast('Bem vindo!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
};
