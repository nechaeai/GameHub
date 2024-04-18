import { useState } from 'react';
import PropTypes from 'prop-types';

const Keyboard = ({ onInput }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 5); // Limit input to 5 letters and uppercase
    setInput(value);
    if (value.length === 5) {
      onInput(value); // Pass the input value to the parent component
      setInput('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        maxLength={5}
        style={{ textTransform: 'uppercase' }}
      />
    </div>
  );
};

Keyboard.propTypes = {
  onInput: PropTypes.func.isRequired,
};

export default Keyboard;
