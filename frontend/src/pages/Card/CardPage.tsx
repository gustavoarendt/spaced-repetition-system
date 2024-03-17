import { useEffect, useState } from 'react';
import { Card } from '../../interfaces/card';
import { useNavigate, useParams } from 'react-router';
import { http } from '../../configs/http.config';
import { getErrorMessage } from '../../helpers/helpers';
import { toast } from 'react-toastify';
import { Form, FormResult } from '../../Components/Form/Form.component';
import FlippableCard from '../../Components/FlippableCard/FlippableCard.component';
import './CardPage.scss';

const CardPage = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState<Card[]>([]);

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

  const ListCards = ({ cards }: { cards: Card[] }) => {
    return (
      <section className='CardPage__Options'>
        {cards.map((card: Card) => (
          <FlippableCard {...card} key={card.id} />
        ))}
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
  const navigate = useNavigate();
  const { deckId } = useParams();

  const handleCreateCard = async (formData: FormResult) => {
    await http
      .post(`/decks/${deckId}/cards`, formData)
      .then(() => {
        navigate(`/decks/${deckId}`);
      })
      .catch(({ response }) => {
        const message = getErrorMessage(response);
        toast(message, { type: 'error' });
      });
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
