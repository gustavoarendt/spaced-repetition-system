import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../helpers/helpers';
import { Card } from '../../../interfaces/card';
import { http } from '../../http.config';
import { FormResult } from '../../../Components/Form/Form.component';

export const CardApi = {
  list: async (
    setCards: React.Dispatch<React.SetStateAction<Card[]>>,
    deckId: string
  ) => {
    await http
      .get(`/decks/${deckId}/cards`)
      .then((response) => {
        setCards(response.data);
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
  create: async (card: FormResult, deckId: string) => {
    await http
      .post(`/decks/${deckId}/cards`, card)
      .then(() => {
        toast('Card criado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
  update: async (card: Card, deckId: string) => {
    await http
      .put(`/decks/${deckId}/cards/${card.id}`, card)
      .then(() => {
        toast('Card atualizado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
  updateDifficulty: async (
    { id }: Card,
    deckId: string,
    difficultyLevel: string
  ) => {
    await http
      .put(`/decks/${deckId}/cards/${id}`, { difficultyLevel })
      .then(() => {
        toast('Card atualizado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
  delete: async (card: Card, deckId: string) => {
    await http
      .delete(`/decks/${deckId}/cards/${card.id}`)
      .then(() => {
        toast('Card deletado com sucesso!', { type: 'success' });
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  },
};
