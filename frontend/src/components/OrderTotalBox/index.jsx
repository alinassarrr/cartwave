import "./styles.css";

const OrderTotalBox = ({ subtotal, shipping, tax, total }) => {
  const safeSubtotal = Number(subtotal) || 0;
  const safeShipping = Number(shipping) || 0;
  const safeTax = Number(tax) || 0;
  const safeTotal = Number(total) || 0;
  const calculatedTotal = safeTotal || safeSubtotal + safeShipping + safeTax;

  return (
    <div className="order-total-box">
      <h3>Order Summary</h3>
      <div className="total-row">
        <span>Subtotal:</span>
        <span>${safeSubtotal.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Shipping:</span>
        <span>${safeShipping.toFixed(2)}</span>
      </div>
      <div className="total-row">
        <span>Tax:</span>
        <span>${safeTax.toFixed(2)}</span>
      </div>
      <div className="total-row total">
        <span>Total:</span>
        <span>${calculatedTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderTotalBox;
