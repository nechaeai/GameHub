import {useState, useEffect } from 'react';
import './Wordle.css';

const Wordle = () => {
    const [word, setWord] = useState('');
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [grid, setGrid] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        fetchRandomWord();
    }, []);

    useEffect(() => {
        if (word !== '') {
            setGrid(Array(word.length).fill('_'));
        }
    }, [word]);

    useEffect (() => { 
        if (startTime && !gameOver) {
            const interval = setInterval(() => {
                const currentTime = Math.floor((Date.now() - startTime) / 1000);
                setElapsedTime(currentTime);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startTime, gameOver]);

    const fetchRandomWord = async () => {
        try {
            const response = await fetch('https://it3049c-hangman.fly.dev');
            const data = await response.json();
            if (data.word.length === 5) {
                setWord(data.word.toLowerCase());
            } else {
                fetchRandomWord();
            }
        } catch (error) {
            console.log('Error with fetching word:', error);
        }
    };

    const handleGuessChange = (event) => {
        setGuess(event.target.value.toLowerCase());
    };

    const checkGuess = async () => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const newGrid = [...grid];
                    let correct = 0;

                    for (let i = 0; i < word.length; i++) {
                        if (guess[i] === word[i]) {
                            newGrid[i] = guess[i].toUpperCase();
                            correct++;
                        }
                    }

                    setGrid(newGrid);
                    setAttempts((prevAttempts) => prevAttempts + 1);

                    if (correct === word.length) {
                        setGameOver(true);
                        stopTimer();
                    } else if (attempts + 1 === 5) {
                        setGameOver(true);
                        stopTimer();
                    }
                } else {
                    alert ('Invalid word!');
                }
            } else {
                alert('Invalid word!');
            }
        } catch(error) {
            console.error('Error in checking word:', error);
        }
    };

    const resetGame = () => {
        fetchRandomWord();
        setGuess('');
        setAttempts(0);
        setGrid([]);
        setGameOver(false);
        setStartTime(null);
        setElapsedTime(0);
    };

    const startTimer = () => {
        setStartTime(Date.now());
    };
        
    const stopTimer = () => {
        const endTime = Date.now();
        const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
        setElapsedTime(elapsedTimeInSeconds);
    };

    return (
        <div className="wordle-container">
          <h1>Welcome to Wordle!</h1>
          <p>Try to guess the word.</p>
          <div className="wordle-grid">
            {grid.map((letter, index) => (
              <span key={index} className="letter">{letter}</span>
            ))}
          </div>
          {!gameOver && (
            <div>
              <input type="text" value={guess} onChange={handleGuessChange} />
              <button onClick={checkGuess}>Guess</button>
              {!startTime && (
                <button onClick={startTimer}>Start Game</button>
              )}
            </div>
          )}
          {gameOver && (
            <div>
              <p>Out of attempts. The word was: {word}</p>
              <p>Time taken: {elapsedTime} seconds.</p>
              <button onClick={resetGame}>Play Again</button>
            </div>
          )}
        </div>
      );
    
 

};

export default Wordle;
