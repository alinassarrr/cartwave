import "./styles.css";

const OrderSummaryCard = ({ label, value, icon }) => {
  return (
    <div className="order-summary-card">
      <div className="order-summary-text">
        <span className="label">{label}</span>
        <span className="value">{value}</span>
      </div>
      <div className="order-summary-icon">{icon}</div>
    </div>
  );
};

export default OrderSummaryCard;
