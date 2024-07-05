import React from 'react';

const OptionInput = ({ id, name, label, placeholder, options, value, onChange, styles = {} }) => {
  return (
    <div className={styles.formGroup || 'form-group'}>
      <label htmlFor={id} className={styles.label || 'label'}>{label}</label>
      <select
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input || 'form-control'}
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
