import { useEffect, useState } from 'react';
import { Card } from '../../interfaces/card';
import { useNavigate, useParams } from 'react-router';
import { Form, FormResult } from '../../Components/Form/Form.component';
import FlippableCard from '../../Components/FlippableCard/FlippableCard.component';
import { CardApi } from '../../configs/api/cards/cards.api';
import './CardPage.scss';

const CardPage = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (deckId) {
      const fetchCards = async () => await CardApi.list(setCards, deckId);
      fetchCards();
    }
  }, [deckId]);

  const ListCards = ({ cards }: { cards: Card[] }) => {
    return (
      <section className='CardPage__Options'>
        {cards.map(
          (card: Card) =>
            deckId && (
              <FlippableCard
                setCards={setCards}
                deckId={deckId}
                card={card}
                key={card.id}
              />
            )
        )}
      </section>
    );
  };

  return (
    <div className='CardPage'>
      <ListCards cards={cards} />
    </div>
  );
};

export const CreateCard = () => {
  const { deckId } = useParams();
  const navigate = useNavigate();

  const handleCreateCard = async (formData: FormResult) => {
    if (deckId) {
      await CardApi.create(formData, deckId);
      navigate(`/decks/${deckId}/cards`);
    }
  };

  return (
    <div className='CreateCard'>
      <Form
        formName='Criar Card'
        onSubmit={handleCreateCard}
        props={[
          {
            fieldName: 'Frente',
            value: 'frontText',
            type: 'text',
            isRequired: true,
          },
          {
            fieldName: 'Verso',
            value: 'backText',
            type: 'text',
            isRequired: true,
          },
        ]}
      />
    </div>
  );
};

export default CardPage;
