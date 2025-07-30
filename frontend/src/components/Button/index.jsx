import React from 'react';
import './styles.css';

const Button = ({ text , onClick,className='', disabled = false}) => {
    return (  
        <button className={`button ${className}`}
        onClick={(e) => {
            e.preventDefault();
            onClick?.(e);  //if onclick is defined
        }}
        disabled={disabled}>
            {text}
        </button>

    );
};

export default Button;