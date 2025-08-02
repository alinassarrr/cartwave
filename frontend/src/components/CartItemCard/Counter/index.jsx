import React, { useState } from "react";
import "./styles.css";
const Counter = ({ initial = 1, min = 1, max = 99, onChange }) => {
  const [quantity, setQuantity] = useState(initial);

  const inc = () => {
    if (quantity < max) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  const dec = () => {
    if (quantity > min) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  return (
    <div className="counter">
      <button onClick={dec} disabled={quantity === min}>
        –
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
        className="counter-input"
      />
      <button onClick={inc} disabled={quantity === max}>
        +
      </button>
    </div>
  );
};

export default Counter;
