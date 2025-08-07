import React from "react";
// import { useCart } from "../../contexts/CartContext";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../store/cart/slice";

const OrderSummary = ({ onPlaceOrder, isSubmitting }) => {
  // const { cart, getCartTotal, getCartCount } = useCart();
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="order-summary-section">
      <h2>Order Summary</h2>
      <div className="order-items">
        <h3>
          Items ({cart.reduce((count, item) => count + item.quantity, 0)})
        </h3>
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
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="total-row total">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
        <button
          className="place-order-btn"
          onClick={() => {
            console.log("Button clicked!");
            onPlaceOrder();
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
