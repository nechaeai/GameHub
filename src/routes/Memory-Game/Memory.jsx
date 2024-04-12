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
    const [score, setScore] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, id: index }));

        setCards(shuffledCards);
        setOpenCards([]);
        setMatchedCards(new Set());
        setTurns(0);
        setScore(0);
        setGameCompleted(false);
    };

    useEffect(() => {
        if (openCards.length === 2) {
            const [first, second] = openCards;
            if (cards[first].src === cards[second].src) {
                const newMatched = new Set(matchedCards);
                newMatched.add(first);
                newMatched.add(second);
                setMatchedCards(newMatched);
                setScore(prevScore => prevScore + 10);
                setOpenCards([]);
                
                // Check if the game is completed
                if (newMatched.size === cards.length) {
                    setGameCompleted(true);
                }
            } else {
                setTimeout(() => {
                    setOpenCards([]);
                }, 1000);
            }
            setTurns(prevTurns => prevTurns + 1);
        }
    }, [openCards, cards, matchedCards]);
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
            {gameCompleted ? (
                <div className="completion-message">
                    <p>You hit the max score!</p>
                </div>
            ) : (
                <div className='score-board'>
                    <p>Score: {score}</p>
                    <p>Turns: {turns}</p>
                </div>
            )}
            <div className='card-grid'>
                {cards.map((card, index) => (
                    <div className={`card ${matchedCards.has(index) ? 'matched' : ''} ${openCards.includes(index) ? 'flipped' : ''}`} key={card.id} onClick={() => handleCardClick(index)}>
                        <img className='front' src={card.src} alt='card front' />
                        <img className='back' src='./imgs/cover.png' alt='card back' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Memory;
