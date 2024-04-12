import React, { useState } from 'react';
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
    // Using a Set for flippedCards to handle unique IDs
    const [flippedCards, setFlippedCards] = useState(new Set());

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index })); // Use index for unique ID

        setCards(shuffledCards);
        setFlippedCards(new Set()); // Reset the flipped cards
    };

    const handleCardClick = (id) => {
        setFlippedCards((prevFlippedCards) => {
            const newFlippedCards = new Set(prevFlippedCards);
            if (newFlippedCards.has(id)) {
                newFlippedCards.delete(id);
            } else {
                newFlippedCards.add(id);
            }
            return newFlippedCards;
        });
    };

    return (
        <div className='MemoryApp'>
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>Start Game</button>
            <div className='card-grid'>
                {cards.map(card => (
                    <div className={`card ${flippedCards.has(card.id) ? 'flipped' : ''}`} key={card.id} onClick={() => handleCardClick(card.id)}>
                        <img className={`front ${flippedCards.has(card.id) ? 'visible' : ''}`} src={card.src} alt='card front' />
                        <img className='back' src='./imgs/cover.png' alt='card back' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Memory;
