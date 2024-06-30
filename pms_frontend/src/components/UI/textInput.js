import React from 'react';
import PropTypes from 'prop-types';
import './textInput.css';

const TextInput = ({ id, name, label, placeholder, value, onChange }) => {
  return (
    <div className="textInput-form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
