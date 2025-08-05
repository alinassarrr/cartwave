import React from "react";
import { useCart } from "../../contexts/CartContext";

const OrderSummary = ({ onPlaceOrder, isSubmitting }) => {
  const { cart, getCartTotal, getCartCount } = useCart();

  return (
    <div className="order-summary-section">
      <h2>Order Summary</h2>
      <div className="order-items">
        <h3>Items ({getCartCount()})</h3>
        {cart.map((item) => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="item-details">
              <h4>{item.title}</h4>
              <p className="item-variants">
                {item.color && <span>Color: {item.color.name}</span>}
                {item.size && <span>Size: {item.size.name}</span>}
              </p>
              <p className="item-quantity">Qty: {item.quantity}</p>
            </div>
            <div className="item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="total-row total">
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        <button
          className="place-order-btn"
          onClick={onPlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
