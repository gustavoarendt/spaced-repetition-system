import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { http } from '../../configs/http.config';
import { Deck } from '../../interfaces/deck';
import { Card } from '../../interfaces/card';
import './HomePage.scss';

const HomePage = () => {
  const selectedDeck = localStorage.getItem('selectedDeck');
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    http
      .get('/decks')
      .then((response) => {
        setDecks(response.data);
      })
      .catch(({ response }) => {
        toast(response.data.message, { type: 'error' });
      });
  }, []);

  useEffect(() => {
    http
      .get(`/decks/${selectedDeck}/cards`)
      .then((response) => {
        setCards(response.data);
      })
      .catch(({ response }) => {
        toast(response.data.message, { type: 'error' });
      });
  }, [selectedDeck]);

  console.log(cards);

  return (
    <div className='HomePage'>
      {!selectedDeck ? (
        <div>
          <h1>Selecione um deck</h1>
          {decks.map((deck: Deck) => (
            <div key={deck.id}>
              <h2>{deck.name}</h2>
              <button
                onClick={() => {
                  localStorage.setItem('selectedDeck', deck.id);
                  localStorage.setItem('selectedDeckName', deck.name);
                  window.location.reload();
                }}
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Cards</h2>
          {cards.map((card: Card) => (
            <div key={card.id}>
              <h3>{card.frontText}</h3>
              <p>{card.backText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
