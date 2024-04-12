import React, { useState, useEffect } from 'react';
import './Memory.css';

const cardImages = [
  { src: './imgs/bottle.png', matched: false },
  { src: './imgs/diamond-ring.png', matched: false },
  { src: './imgs/samurai.png', matched: false },
  { src: './imgs/scroll.png', matched: false },
  { src: './imgs/shield.png', matched: false },
  { src: './imgs/sword.png', matched: false }
];

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [turns, setTurns] = useState(0);

  // Shuffle cards and reset game state
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    setCards(shuffledCards);
    setOpenCards([]);
    setMatchedCards(new Set());
    setTurns(0);
  };

  // Effect for comparing two selected cards
  useEffect(() => {
    if (openCards.length === 2) {
      const [first, second] = openCards;
      if (cards[first].src === cards[second].src) {
        setMatchedCards((prev) => new Set(prev.add(first).add(second)));
        setOpenCards([]);
      } else {
        setTimeout(() => {
          setOpenCards([]);
        }, 1000);
      }
      setTurns((prevTurns) => prevTurns + 1);
    }
  }, [openCards, cards]);

  // Handle card click
  const handleCardClick = (index) => {
    if (!openCards.includes(index) && openCards.length < 2 && !matchedCards.has(index)) {
      setOpenCards([...openCards, index]);
    }
  };

  return (
    <div className='MemoryApp'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>Start Game</button>

      <div className='card-grid'>
        {cards.map((card, index) => (
          <div 
            className={`card ${openCards.includes(index) || matchedCards.has(index) ? 'flipped' : ''}`} 
            key={card.id} 
            onClick={() => handleCardClick(index)}
          >
            <img 
              className={`front ${openCards.includes(index) || matchedCards.has(index) ? 'visible' : ''}`} 
              src={card.src} 
              alt='card front' 
            />
            <img 
              className='back' 
              src='./imgs/cover.png' 
              alt='card back' 
            />
          </div>
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default Memory;
