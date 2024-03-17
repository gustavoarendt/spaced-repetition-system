import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../interfaces/card';
import { useEffect, useState } from 'react';
import { http } from '../../configs/http.config';
import { getErrorMessage } from '../../helpers/helpers';
import { toast } from 'react-toastify';
import { Button } from '../../Components/Button/Button.component';
import './DeckPage.scss';

const DeckPage = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () =>
      await http
        .get(`/decks/${deckId}/cards`)
        .then((response) => {
          setCards(response.data);
        })
        .catch(({ response }) => {
          const message = getErrorMessage(response);
          toast(message, { type: 'error' });
        });
    if (deckId) {
      fetchCards();
    }
  }, [deckId]);

  return (
    <div className='DeckPage'>
      <h3>Você possui: {cards.length} cards</h3>
      <div className='DeckPage__Options'>
        <Button onClick={() => navigate(`/decks/${deckId}/cards`)}>
          Visualizar Cards
        </Button>
        <Button onClick={() => navigate(`/decks/${deckId}/cards/new`)}>
          Adicionar Card
        </Button>
      </div>
      {/* <section className='DeckPage__Options'>
        <ListCards cards={cards} />
      </section> */}
    </div>
  );
};

export default DeckPage;
