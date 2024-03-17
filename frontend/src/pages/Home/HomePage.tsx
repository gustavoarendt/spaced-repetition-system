import { useEffect, useState } from 'react';
import { Deck } from '../../interfaces/deck';
import { CreateDeck, ListDeck } from '../../Components/Deck/Deck.component';
import { useNavigate } from 'react-router-dom';
import { DeckApi } from '../../configs/api/decks/decks.api';
import './HomePage.scss';

const HomePage = () => {
  const userLoggedIn = localStorage.getItem('token');
  const [decks, setDecks] = useState<Deck[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      await DeckApi.list(setDecks);
    };
    userLoggedIn ? fetchDecks() : navigate('/login');
  }, [navigate, userLoggedIn]);

  return (
    <div className='HomePage'>
      <section className='HomePage__DeckSection'>
        <div>
          <p>Selecione um deck para começar:</p>
          <div>{ListDeck(decks, setDecks)}</div>
        </div>
        <div>
          <p>Criar um deck:</p>
          <CreateDeck setDecks={setDecks} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
