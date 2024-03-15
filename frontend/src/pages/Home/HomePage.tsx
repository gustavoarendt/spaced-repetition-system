import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { http } from '../../configs/http.config';
import { Deck } from '../../interfaces/deck';
import { Card } from '../../interfaces/card';
import { CreateDeck, ListDeck } from '../../Components/Deck/Deck.component';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';
import { getErrorMessage } from '../../helpers/helpers';

const HomePage = () => {
  const selectedDeck = localStorage.getItem('selectedDeck');
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = localStorage.getItem('token');
    const fetchDecks = async () =>
      await http
        .get('/decks')
        .then((response) => {
          setDecks(response.data);
        })
        .catch(({ response }) => {
          const message = getErrorMessage(response);
          toast(message, { type: 'error' });
        });
    if (!userLogged) {
      navigate('/login');
    } else {
      fetchDecks();
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCards = async () =>
      await http
        .get(`/decks/${selectedDeck}/cards`)
        .then((response) => {
          setCards(response.data);
        })
        .catch(({ response }) => {
          const message = getErrorMessage(response);
          toast(message, { type: 'error' });
        });
    if (selectedDeck) {
      fetchCards();
    }
  }, [selectedDeck]);

  return (
    <div className='HomePage'>
      {!selectedDeck ? (
        <section className='HomePage__DeckSection'>
          <div>
            <p>Selecione um deck para começar:</p>
            <div>{ListDeck(decks)}</div>
          </div>
          <div>
            <p>ou crie um novo deck:</p>
            <CreateDeck />
          </div>
        </section>
      ) : (
        <section className='HomePage__CardSection'>
          {cards.map((card: Card) => (
            <div key={card.id}>
              <h3>{card.frontText}</h3>
              <p>{card.backText}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default HomePage;
