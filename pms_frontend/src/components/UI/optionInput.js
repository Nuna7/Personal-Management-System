import React from 'react';
import './optionInput.css'

const OptionInput = ({ id, name, label, placeholder, options, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="label" >{label} </label>
      <select
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};


export default OptionInput;
