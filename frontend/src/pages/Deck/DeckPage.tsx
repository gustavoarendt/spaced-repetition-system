import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../interfaces/card';
import { useEffect, useState } from 'react';
import { Button } from '../../Components/Button/Button.component';
import { CardApi } from '../../configs/api/cards/cards.api';
import './DeckPage.scss';

const DeckPage = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (deckId) {
      const fetchCards = async () => await CardApi.list(setCards, deckId);
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
    </div>
  );
};

export default DeckPage;
