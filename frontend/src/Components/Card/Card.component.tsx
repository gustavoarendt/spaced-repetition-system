import { Card } from '../../interfaces/card';
import './Card.component.scss';

export const ListCard = (cards: Card[], { ...props }) => {
  return (
    <div className='FlippableCard'>
      {cards.map((card: Card) => (
        <div key={card.id} className='Card__Item'>
          <p className='Card__Title'>{card.frontText}</p>
          <p className='Card__Title'>{card.backText}</p>
        </div>
      ))}
    </div>
  );
};
