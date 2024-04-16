import React, { useState, useEffect } from 'react';
import './Memory.css';  // Importing CSS for styling

// Predefined set of card images and their initial matched state
const cardImages = [
    { src: './imgs/bottle.png', matched: false },
    { src: './imgs/diamond-ring.png', matched: false },
    { src: './imgs/samurai.png', matched: false },
    { src: './imgs/scroll.png', matched: false },
    { src: './imgs/shield.png', matched: false },
    { src: './imgs/sword.png', matched: false }
];

// The main functional component for the memory game
const Memory = () => {
    const [cards, setCards] = useState([]); // Stores the current set of cards
    const [openCards, setOpenCards] = useState([]); // Indexes of currently flipped cards
    const [matchedCards, setMatchedCards] = useState(new Set()); // Set of indexes of matched cards
    const [turns, setTurns] = useState(0); // Count of turns taken
    const [score, setScore] = useState(0); // Current score
    const [gameCompleted, setGameCompleted] = useState(false); // Status of game completion
    const [gameStarted, setGameStarted] = useState(false); // Status to check if game has started

    // Function to shuffle and set up the cards at the beginning of the game
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]  // Duplicate and shuffle the cards
            .sort(() => Math.random() - 0.5)  // Random sorting to shuffle
            .map((card, index) => ({ ...card, id: index }));  // Assign a unique ID to each card

        setCards(shuffledCards);  // Update the state with shuffled cards
        setOpenCards([]);  // Reset open cards
        setMatchedCards(new Set());  // Reset matched cards
        setTurns(0);  // Reset turns
        setScore(0);  // Reset score
        setGameCompleted(false);  // Reset game completion status
        setGameStarted(true);  // Indicate that the game has started
    };

    // Effect hook to handle the logic when two cards are open
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
                }, 1000);  // Hide cards again after 1 second if they don't match
            }
            setTurns(prevTurns => prevTurns + 1);  // Increment turn count
        }
    }, [openCards, cards, matchedCards]);  // Depend on openCards, cards, and matchedCards for changes

    // Function to handle clicking a card
    const handleCardClick = (index) => {
        if (!openCards.includes(index) && openCards.length < 2 && !matchedCards.has(index)) {
            setOpenCards([...openCards, index]);  // Add the card to openCards if conditions met
        }
    };

    // Render the memory game UI
    return (
        <div className='MemoryApp'>
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>Start Game</button>      {/* //Button to start the game */}
            {gameStarted && (
                <>
                    {gameCompleted ? (
                        <div className="completion-message">
                            <p>You hit the max score!</p>  {/*// Show completion message*/}
                        </div>
                    ) : (
                        <div className='score-board'>
                            <p>Score: {score}</p>  {/* Display current score*/}
                            <p>Turns: {turns}</p>  {/* Display turn count*/}
                        </div>
                    )}
                    <div className='card-grid'>
                        {cards.map((card, index) => (
                            <div className={`card ${matchedCards.has(index) ? 'matched' : ''} ${openCards.includes(index) ? 'flipped' : ''}`} key={card.id} onClick={() => handleCardClick(index)}>
                                <img className='front' src={card.src} alt='card front' />
                                <img className='back' src='./imgs/cover.png' alt='card back' />
                            </div>  // Display each card with click handler
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Memory;  // Export the component for use in other parts of the application
