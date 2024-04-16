import React, { useState } from 'react';

const WORDS = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'pear', 'peach', 'plum', 'cherry', 'melon'];

const Wordle = () => {
  const [selectedWord, setSelectedWord] = useState(WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState(null);

  const handleGuess = () => {
    let correct = 0;
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess[i]) {
        correct++;
      }
    }

    if (correct === selectedWord.length) {
      setResult('You win!');
    } else {
      setAttempts(prevAttempts => prevAttempts + 1);
    }
  };

  const handleChange = (e) => {
    setGuess(e.target.value.toLowerCase().substring(0, selectedWord.length));
  };

  const renderInput = () => {
    if (result === null) {
      return (
        <>
          <input type="text" value={guess} onChange={handleChange} />
          <button onClick={handleGuess}>Guess</button>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1>Wordle</h1>
      <p>Guess the word:</p>
      {renderInput()}
      {result && <p>{result}</p>}
      <p>Attempts: {attempts}</p>
    </div>
  );
};

export default Wordle;
