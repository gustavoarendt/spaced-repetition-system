import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { http } from '../../configs/http.config';
import { Deck } from '../../interfaces/deck';
import { CreateDeck, ListDeck } from '../../Components/Deck/Deck.component';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../helpers/helpers';
import './HomePage.scss';

const HomePage = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
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

  return (
    <div className='HomePage'>
      <section className='HomePage__DeckSection'>
        <div>
          <p>Selecione um deck para começar:</p>
          <div>{ListDeck(decks)}</div>
        </div>
        <div>
          <p>Criar um deck:</p>
          <CreateDeck />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
