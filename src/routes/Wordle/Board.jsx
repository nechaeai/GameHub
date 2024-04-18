
import { useState } from 'react';
import PropTypes from 'prop-types';
import WordleRow from './WordleRow';
import Keyboard from './Keyboard';

const Board = ({ words, targetWords }) => {
  const [columns, setColumns] = useState(Array.from({ length: 6 }, () => ''));

  const handleInput = (value) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const emptyIndex = newColumns.findIndex((col) => col === '');
      if (emptyIndex !== -1) {
        newColumns[emptyIndex] = value;
      }
      return newColumns;
    });
  };

  return (
    <div>
      {columns.map((word, index) => (
        <WordleRow key={index} word={words} targetWord={targetWords[index]} />
      ))}
      <Keyboard onInput={handleInput} />
    </div>
  );
};

Board.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  targetWords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;

