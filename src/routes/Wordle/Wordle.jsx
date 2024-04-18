import { useState, useEffect } from 'react';
import './Wordle.css';

const WordleGame = () => {
  const words = ["HELLO", "WORLD", "APPLE", "BANANA", "ORANGE"]; // List of possible words
  const [secretWord, setSecretWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [time, setTime] = useState(0);
  const [grid, setGrid] = useState([]);

  // Generate a random word and grid when the component mounts
  useEffect(() => {
    generateRandomWord();
    generateGrid();
  }, []);

  // Function to generate a random word
  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSecretWord(words[randomIndex]);
  };

  // Function to generate the grid
  const generateGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 10; i++) {
      newGrid.push({
        id: i,
        guess: '',
        feedback: ''
      });
    }
    setGrid(newGrid);
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempts(attempts + 1);

    // Check if the guess is correct
    if (guess.toUpperCase() === secretWord) {
      setFeedback('You guessed the word! Congratulations!');
    } else {
      // Compare the guess to the secret word
      let result = '';
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === guess.toUpperCase()[i]) {
          result += guess[i].toUpperCase();
        } else if (secretWord.includes(guess.toUpperCase()[i])) {
          result += '+';
        } else {
          result += '-';
        }
      }

      // Update grid with guess and feedback
      const updatedGrid = [...grid];
      updatedGrid[attempts].guess = guess.toUpperCase();
      updatedGrid[attempts].feedback = result;
      setGrid(updatedGrid);

      setFeedback(result);
    }
    setGuess(''); // Clear guess after submission
  };

  const handleKeyboardClick = (letter) => {
    setGuess(guess + letter);
  };

  const renderGrid = () => {
    return grid.map((row, index) => (
      <div key={index} className="row">
        {[...row.guess].map((char, charIndex) => (
          <div key={charIndex} className={`cell ${row.feedback[charIndex] === '+' ? 'correct' : row.feedback[charIndex] === '-' ? 'incorrect' : ''}`}>
            {char}
          </div>
        ))}
        <div className="cell">{row.feedback}</div>
      </div>
    ));
  };

  return (
    <div>
      <h1>Wordle Game</h1>
      <p>Guess the 5-letter word!</p>
      <p>Time: {time} seconds</p>
      <div className="grid">
        {renderGrid()}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          maxLength={5}
          onChange={(e) => setGuess(e.target.value)}
          required
        />
        <button type="submit">Guess</button>
      </form>
      <div>
        Virtual Keyboard:
        {Array.from(Array(26)).map((_, index) => (
          <button key={index} onClick={() => handleKeyboardClick(String.fromCharCode(65 + index))}>
            {String.fromCharCode(65 + index)}
          </button>
        ))}
      </div>
      <p>Attempts: {attempts}</p>
      <p>{feedback}</p>
    </div>
  );
};

export default WordleGame;
