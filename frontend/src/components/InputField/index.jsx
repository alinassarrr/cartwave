import React from "react";
import "./styles.css";

const InputField = (props) => {
  const {
    title,
    id,
    name,
    type = "text",
    placeholder,
    className,
    onChange,
    value,
    required = true,
  } = props;

  return (
    <div className={`input-wrapper ${className || ""}`}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

