
import PropTypes from 'prop-types';
import wordleRow from './wordleRow'; // Importing the WordleRow component

const Board = ({ words, targetWords }) => {
  return (
    <div>
      {words.map((word, index) => (
        <wordleRow key={index} word={word} targetWords={targetWords[index]} />
      ))}
    </div>
  );
};

Board.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
  targetWords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Board;
