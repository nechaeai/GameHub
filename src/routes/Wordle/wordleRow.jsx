import { useState } from 'react';
import propTypes from 'prop-types';

const wordleRow = ({ word, targetWords }) => {
  const [guess, setGuess] = useState('');
const WordleRow = ({ word, targetWords }) => {
    const [isCorrect, setIsCorrect] = React.useState(false);

  const handleChange = (e) => {
    setGuess(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess === targetWords) {
      setIsCorrect(true);
    }
  };

  return (
    <div>
      <p>{word}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={handleChange}
          maxLength={5}
          style={{ textTransform: 'uppercase' }}
        />
        <button type="submit">Guess</button>
      </form>
      {isCorrect && <p>Correct!</p>}
    </div>
  );
};

wordleRow.propTypes = {
    word: propTypes.string.isRequired,
    targetWords: propTypes.string.isRequired,
};

export default wordleRow;
