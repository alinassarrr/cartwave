import "./styles.css";

const OrderTotalBox = ({ subtotal, shipping, tax }) => {
  const total = subtotal + shipping + tax;

  return (
    <div className="order-total-box">
      <h3>Order Summary</h3>
      <div className="total-row">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Shipping:</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="total-row total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderTotalBox;
