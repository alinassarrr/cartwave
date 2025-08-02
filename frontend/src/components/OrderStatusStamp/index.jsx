import "./styles.css";

const statusColors = {
  Pending: "pending",
  Paid: "paid",
  Shipped: "shipped",
};

const OrderStatusStamp = ({ status }) => {
  const className = `status-stamp ${statusColors[status] || "default"}`;

  return <span className={className}>{status}</span>;
};

export default OrderStatusStamp;
