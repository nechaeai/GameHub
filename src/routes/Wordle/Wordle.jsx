import { useState, useEffect } from 'react';
import './Wordle.css';
import './Board';

function Wordle() {
  const maxTries = 6;
  const wordLength = 5;
  const [currentWord, setCurrentWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [inputWord, setInputWord] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [gridState, setGridState] = useState(
    Array(maxTries).fill().map(() => Array(wordLength).fill({ letter: '', status: '' }))
  );

  // Effect to fetch a new word when the component mounts
  useEffect(() => {
    fetchWord();
  }, []);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameLost(true);
    }
  }, [timeLeft]);

  // Fetch a random word from an API
  const fetchWord = async () => {
    try {
      const response = await fetch('https://it3049c-hangman.fly.dev');
      const data = await response.json();
      setCurrentWord(data.word.toLowerCase());
    } catch (error) {
      console.error('Error fetching word:', error);
    }
  };



  // Update grid state with the guess
  const updateGridStateWithGuess = (guess) => {
    const newGridState = [...gridState];
    const results = getGuessResults(guess);
  
    newGridState[currentAttempt] = Array.from({ length: wordLength }, (_, index) => {
      const letter = guess[index] || ''; // Fill with an empty string if no guess for this cell
      const status = letter ? results[index] : 'neutral'; // Use 'neutral' status for cells without guesses
      return { letter, status };
    });

    setGridState(newGridState);

    // Check win condition
    if (guess.toLowerCase() === currentWord.toLowerCase()) {
      setIsGameWon(true);
      setTimeLeft(0); // Stops the timer
    }
  };

  // Get guess results by comparing the guess with the current word
  const getGuessResults = (guess) => {
    return guess.split('').map((letter, index) => {
      if (letter.toLowerCase() === currentWord[index]) {
        return 'correct';
      } else if (currentWord.includes(letter.toLowerCase())) {
        return 'misplaced';
      }
      return 'wrong';
    });
  };

  // Handle input word change
  const handleWordChange = (event) => {
    setInputWord(event.target.value.toLowerCase());
  };
// Handle guess submission
const handleGuessSubmit = (event) => {
  event.preventDefault();
  if (inputWord.length !== wordLength) {
    alert('Please enter a 5 letter word.');
    setInputWord(''); // Clear the input field if the word is not 5 letters long
    return;
  }
  if (currentAttempt < maxTries) {
    updateGridStateWithGuess(inputWord);
    setInputWord('');
    setCurrentAttempt((prev) => prev + 1);
  }

  if (currentAttempt + 1 >= maxTries) {
    setTimeLeft(0); // Will trigger the game over effect
  }
};


  // Reset the game to the initial state
  const resetGame = () => {
    setCurrentWord('');
    setCurrentAttempt(0);
    setTimeLeft(60);
    setInputWord('');
    setIsGameWon(false);
    setIsGameLost(false);
    setGridState(
      Array(maxTries).fill().map(() => Array(wordLength).fill({ letter: '', status: '' }))
    );
    fetchWord();
  };

  // Start a timer when the game begins
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the timer when the game is won, lost, or the component is unmounting
    return () => clearInterval(timer);
  }, [isGameWon, isGameLost]);

  return (
    <div className="wordle">
      <h1>Wordle</h1>
      <Board gridState={gridState} />
      {isGameLost && <div className="message">Time's up or max tries reached! The word was {currentWord}.</div>}
      {isGameWon && <div className="message">Congratulations! You've won!</div>}
      {!isGameWon && !isGameLost && (
        <>
          <div className="timer">Time left: {timeLeft} seconds</div>
          <div className="tries-left">Tries left: {maxTries - currentAttempt}</div>
          <form onSubmit={handleGuessSubmit}>
            <input
              type="text"
              value={inputWord}
              onChange={handleWordChange}
              maxLength={5}
              disabled={currentAttempt >= maxTries}
              placeholder="Enter your guess"
            />
            <button type="submit" disabled={currentAttempt >= maxTries || inputWord.length !== 5}>Guess</button>
          </form>
          {(isGameLost || isGameWon) && <button onClick={resetGame}>Reset Game</button>}
        </>
      )}
    </div>
  );
}

export default Wordle;
