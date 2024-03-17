import { useState } from 'react';
import { ICONS } from '../../helpers/icons';
import { Card } from '../../interfaces/card';
import { CardApi } from '../../configs/api/cards/cards.api';
import './FlippableCard.component.scss';
import { Button } from '../Button/Button.component';

const DifficultyLevel = {
  NEW: 'NEW',
  LEARNING: 'LEARNING',
  MASTERED: 'MASTERED',
};

const FlippableCard = ({
  card,
  deckId,
  setCards,
}: {
  card: Card;
  deckId: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDelete = async () => {
    await CardApi.delete(card, deckId);
    await CardApi.list(setCards, deckId);
  };

  const handleUpdate = async (difficultyLevel: string) => {
    await CardApi.updateDifficulty(card, deckId, difficultyLevel);
    await CardApi.list(setCards, deckId);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardClass = isFlipped ? 'FlippableCard__Flipped' : ''; // Add "flipped" class for styling

  return (
    <div className={`FlippableCard ${cardClass}`} onClick={handleFlip}>
      <div className='FlippableCard__Face FlippableCard__Content'>
        <figure onClick={handleDelete} className='delete'>
          <i className={ICONS.TRASH}></i>
        </figure>
        <p></p>
        {isFlipped ? (
          <p className='FlippableCard__Back'>{card.backText}</p>
        ) : (
          <p className='FlippableCard__Front'>{card.frontText}</p>
        )}
        <div className='rating'>
          <figure className='rating__item'>
            <Button onClick={() => handleUpdate(DifficultyLevel.NEW)}>
              Revisar
            </Button>
          </figure>
          <figure className='rating__item'>
            <Button onClick={() => handleUpdate(DifficultyLevel.LEARNING)}>
              + Tempo
            </Button>
          </figure>
          <figure className='rating__item'>
            <Button onClick={() => handleUpdate(DifficultyLevel.MASTERED)}>
              Mestre
            </Button>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
