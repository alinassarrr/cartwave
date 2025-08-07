import "./styles.css";

const statusColors = {
  pending: "pending",
  paid: "paid",
  packed: "packed",
  shipped: "shipped",
};

const OrderStatusStamp = ({ status }) => {
  const className = `status-stamp ${statusColors[status] || "default"}`;

  return <span className={className}>{status}</span>;
};

export default OrderStatusStamp;
