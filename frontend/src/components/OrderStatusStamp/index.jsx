import "./styles.css";

const statusColors = {
  Pending: "Pending",
  Paid: "Paid",
  Shipped: "Shipped",
  Processing: "Processing",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
};

const OrderStatusStamp = ({ status }) => {
  const className = `status-stamp ${statusColors[status] || "default"}`;

  return <span className={className}>{status}</span>;
};

export default OrderStatusStamp;
