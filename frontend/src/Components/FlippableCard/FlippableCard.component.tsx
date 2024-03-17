import React, { useState } from 'react';
import './FlippableCard.component.scss'; // Import SCSS styles (optional)

interface Card {
  frontText: string;
  backText: string;
}

const FlippableCard: React.FC<Card> = ({ frontText, backText }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const cardClass = isFlipped ? 'FlippableCard__Flipped' : ''; // Add "flipped" class for styling

  return (
    <div className={`FlippableCard ${cardClass}`} onClick={handleFlip}>
      <div className='FlippableCard__Face FlippableCard__Content'>
        {isFlipped ? (
          <p className='FlippableCard__Back'>{backText}</p>
        ) : (
          <p className='FlippableCard__Front'>{frontText}</p>
        )}
      </div>
    </div>
  );
};

export default FlippableCard;
