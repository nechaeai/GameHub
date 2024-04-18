import { useState, useEffect } from 'react';
import './Wordle.css';

function App() {
  const maxTries = 6; // Maximum number of tries allowed
  const [currentWord, setCurrentWord] = useState('');
  const [guess, setGuess] = useState('');
  const [triesLeft, setTriesLeft] = useState(maxTries);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [usedLetters, setUsedLetters] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [inputWord, setInputWord] = useState('');
  const [wordMatrix, setWordMatrix] = useState([]);
  

  useEffect(() => {
    fetchWord();
  }, []);

  // Check if the game is won
  useEffect(() => {
    if (timeLeft === 0) {
      setIsGameLost(true);
    }

    // Timer (has negative countdown until start over)

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (currentWord.length === 5) {
      const matrix = [];
      for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < 5; j++) {
          if (j < currentWord.length) {
            row.push(currentWord[j]);
          } else {
            row.push('');
          }
        }
        matrix.push(row);
      }
      setWordMatrix(matrix);
    }
  }, [currentWord]);

  // Sees if word exists or not

  const fetchWord = () => {
    fetch('https://it3049c-hangman.fly.dev')
      .then(response => response.json())
      .then(data => setCurrentWord(data.word.toLowerCase()))
      .catch(error => console.error('Error fetching word:', error));
  };

  const handleGuessChange = (event) => {
    setGuess(event.target.value.toLowerCase());
  };

  const handleWordChange = (event) => {
    setInputWord(event.target.value.toLowerCase());
  };

  const checkGuess = async (word) => {
    if (word.length !== 5) {
      alert('Please enter a word with 5 letters.');
      return false;
    }

    // word validity
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error('Word not found in dictionary');
      }
      const data = await response.json();
      return true;
    } catch (error) {
      console.error('Error checking word:', error);
      return false;
    }
  };

  const handleGuessSubmit = async (event) => {
    event.preventDefault();

    if (!inputWord) {
      alert('Please enter a word.');
      return;
    }

    const isValidGuess = await checkGuess(inputWord);
    if (!isValidGuess) {
      return;
    }

    if (inputWord !== currentWord) {
      setTriesLeft(triesLeft - 1);
    } else {
      setIsGameWon(true);
    }

    setInputWord('');
  };

  const handleLetterClick = (letter) => {
    setGuess(guess + letter);
  };
  // Start Over

  const resetGame = () => {
    fetchWord();
    setTriesLeft(maxTries);
    setIsGameWon(false);
    setIsGameLost(false);
    setUsedLetters([]);
    setTimeLeft(60);
  };
  const renderWordMatrix = () => {
    return wordMatrix.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((letter, colIndex) => {
          let colorClass = '';
          if (inputWord) {
            if (inputWord[colIndex] === currentWord[colIndex]) {
              colorClass = 'green'; // Correct position
            } else if (currentWord.includes(inputWord[colIndex])) {
              colorClass = 'yellow'; // Incorrect position
            } else {
              colorClass = 'grey'; // Not in the word
            }
          }
          return (
            <div key={colIndex} className={`box ${colorClass}`}>
              {letter}
            </div>
          );
        })}
      </div>
    ));
  };

  

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="timer">Time left: {timeLeft} seconds</div>
      <div className="word-matrix">{renderWordMatrix()}</div>
      <div className="tries-left">Tries left: {triesLeft}</div>
      {!isGameWon && !isGameLost && (
        <>
          <form onSubmit={handleGuessSubmit}>
            <input
              type="text"
              value={inputWord}
              onChange={handleWordChange}
              placeholder="Enter your guess (5 letters)"
            />
            <button type="submit">Guess</button>
          </form>
          <div className="keyboard">
            {Array.from(Array(26), (_, i) => String.fromCharCode(97 + i)).map((letter, index) => (
              <button key={index} onClick={() => handleLetterClick(letter)}>{letter}</button>
            ))}
          </div>
        </>
      )}
      {isGameWon && <div className="result won">You won!</div>}
      {isGameLost && <div className="result lost">You lost! The word was {currentWord}.</div>}
      {(isGameWon || isGameLost) && (
        <button onClick={resetGame}>Play Again</button>
      )}
    </div>
  );
}

export default App;


