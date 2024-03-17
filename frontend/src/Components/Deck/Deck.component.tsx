import { useState } from 'react';
import { Deck } from '../../interfaces/deck';
import { useNavigate } from 'react-router';
import { DeckApi } from '../../configs/api/decks/decks.api';
import { ICONS } from '../../helpers/icons';
import './Deck.component.scss';

export const ListDeck = (
  decks: Deck[],
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>
) => {
  const navigate = useNavigate();
  const handleDeckSelection = (deck: Deck) => {
    navigate(`/decks/${deck.id}`);
  };

  const handleDeckDelete = async (deckId: string) => {
    await DeckApi.delete(deckId);
    await DeckApi.list(setDecks);
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
          <figure onClick={() => handleDeckDelete(deck.id)} className='delete'>
            <i className={ICONS.TRASH}></i>
          </figure>
        </div>
      ))}
    </div>
  );
};

export const CreateDeck = ({
  setDecks,
}: {
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
}) => {
  const [deckName, setDeckName] = useState('');

  const handleCreateDeck = async () => {
    await DeckApi.create(deckName);
    await DeckApi.list(setDecks);
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
