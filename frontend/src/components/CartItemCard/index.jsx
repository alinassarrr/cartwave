import { useState } from "react";
import Counter from "./Counter";
import "./styles.css";

const CartItemCard = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 5;

  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);
  };

  const total = (price * quantity).toFixed(2);

  return (
    <div className="cart-item-card">
      <div className="item-img">
        <img src="public/img/itemcard/items.png" alt="Product" />
      </div>

      <div className="item-details">
        <p className="item-title">Wireless Headphones</p>
        <p className="item-decs">Bluetooth, Noise-Cancelling</p>
        <p className="item-price">$ {price}</p>
      </div>

      <div className="item-actions">
        <Counter initial={quantity} onChange={handleQuantityChange} />

        <div className="total-price">${total}</div>

        <button className="remove">Remove</button>
      </div>
    </div>
  );
};

export default CartItemCard;
