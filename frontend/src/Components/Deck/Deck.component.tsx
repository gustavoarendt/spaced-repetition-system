import { useState } from 'react';
import { http } from '../../configs/http.config';
import { Deck } from '../../interfaces/deck';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../helpers/helpers';
import { useNavigate } from 'react-router';
import './Deck.component.scss';

export const ListDeck = (decks: Deck[]) => {
  const navigate = useNavigate();
  const handleDeckSelection = (deck: Deck) => {
    navigate(`/decks/${deck.id}`);
  };

  return (
    <div className='Deck'>
      {decks.map((deck: Deck) => (
        <div key={deck.id} className='Deck__Item'>
          <p className='Deck__Title'>{deck.name}</p>
          <button
            className='Deck__Button'
            onClick={() => {
              handleDeckSelection(deck);
            }}
          >
            Selecionar
          </button>
        </div>
      ))}
    </div>
  );
};

export const CreateDeck = () => {
  const [deckName, setDeckName] = useState('');

  const handleCreateDeck = () => {
    http
      .post('/decks', { name: deckName })
      .then(() => {
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
  };

  return (
    <div className='CreateDeck'>
      <input
        type='text'
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        placeholder='Nome do deck'
        className='CreateDeck__Input'
      />
      <button className='CreateDeck__Button' onClick={handleCreateDeck}>
        Criar
      </button>
    </div>
  );
};
