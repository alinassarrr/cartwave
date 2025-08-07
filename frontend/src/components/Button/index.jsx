import React from "react";
import "./styles.css";

const Button = ({
  text,
  onClick,
  className = "",
  icon = null,
  disabled = false,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e); //if onclick is defined
      }}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
