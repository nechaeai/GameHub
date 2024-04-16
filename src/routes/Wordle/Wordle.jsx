import { useState, useEffect } from 'react';

const Wordle = () => {
  const [word, setWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    fetchWords();
  }, []);

  useEffect(() => {
    if (word !== '') {
      setGrid(Array(word.length).fill('_'));
    }
  }, [word]);

  useEffect(() => {
    if (startTime && !gameOver) {
      const interval = setInterval(() => {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(currentTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime, gameOver]);

  const fetchWords = async () => {
    try {
      const response = await fetch('https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minLength=5&maxLength=5&limit=100&api_key=YOUR_API_KEY');
      const data = await response.json();
      const randomWord = data[Math.floor(Math.random() * data.length)].word.toLowerCase();
      setWord(randomWord);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value.toLowerCase());
  };

  const checkGuess = () => {
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
  };

  const resetGame = () => {
    fetchWords();
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
    <div>
      <h1>Welcome to Wordle!</h1>
      <p>Try to guess the word.</p>
      <div>
        {grid.map((letter, index) => (
          <span key={index}>{letter} </span>
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

