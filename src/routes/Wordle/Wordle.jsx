import { useState, useEffect } from 'react';

const WordleGame = () => {
  const words = ["HELLO", "WORLD", "APPLE", "BANANA", "ORANGE"]; // List of possible words
  const [secretWord, setSecretWord] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [time, setTime] = useState(0);

  // Generate a random word when the component mounts
  useEffect(() => {
    generateRandomWord();
  }, []);

  // Function to generate a random word
  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSecretWord(words[randomIndex]);
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
      setFeedback(result);
    }
  };

  const handleKeyboardClick = (letter) => {
    setGuess(guess + letter);
  };

  return (
    <div>
      <h1>Wordle Game</h1>
      <p>Guess the 5-letter word!</p>
      <p>Time: {time} seconds</p>
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
