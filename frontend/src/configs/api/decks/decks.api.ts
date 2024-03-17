import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../helpers/helpers';
import { http } from '../../http.config';
import { Deck } from '../../../interfaces/deck';

export const DeckApi = {
  list: async (setDecks: React.Dispatch<React.SetStateAction<Deck[]>>) => {
    await http
      .get('/decks')
      .then((response) => {
        setDecks(response.data);
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },

  create: async (deckName: string) => {
    await http
      .post('/decks', { name: deckName })
      .then(() => {
        toast('Deck criado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },

  delete: async (deckId: string) => {
    await http
      .delete(`/decks/${deckId}`)
      .then(() => {
        toast('Deck deletado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
};
