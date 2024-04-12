import React from 'react';
import { useState } from 'react';

const cardImages = [
    { src: '/imgs/bottle.png'},
    { src: '/imgs/diamond-ring.png'},
    { src: '/imgs/samurai.png'},
    { src: '/imgs/scroll.png'},
    { src: '/imgs/shield.png'},
    { src: '/imgs/sword.png'}

];

const Memory = () => {
    
const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

     setCards(shuffledCards);
     setTurns(0);
    };
console.log(cards, turns);
    return (
        <div className='MemoryApp'>
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>Start Game</button>
        </div>
    );
};

export default Memory;
