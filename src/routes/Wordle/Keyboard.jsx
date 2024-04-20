import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const Keyboard = ({ onInput }) => {
  const [input, setInput] = useState('');

  const handleChange = useCallback((e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5); // Limit input to 5 letters and uppercase
    setInput(value);
    if (value.length === 5) {
      onInput(value); // Pass the input value to the parent component
      setInput('');
    }
  }, [onInput]); // Ensures useCallback does not change unless onInput changes

  return (
    <div>
      <label htmlFor="keyboardInput">Enter Letters:</label>
      <input
        id="keyboardInput"
        type="text"
        value={input}
        onChange={handleChange}
        maxLength={5}
        style={{ textTransform: 'uppercase' }}
        aria-label="Input for letters"
      />
      <span>{input.length}/5</span> {/* Visual feedback for character count */}
    </div>
  );
};

Keyboard.propTypes = {
  onInput: PropTypes.func.isRequired,
};

export default Keyboard;
