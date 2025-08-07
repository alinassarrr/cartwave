import OrderStatusStamp from "../OrderStatusStamp";
import StatusDropdown from "../StatusDropdown";
import "./styles.css";
import { useNavigate } from "react-router-dom";
// import axios

const SummaryCard = ({
  orderId,
  itemCount,
  customerName,
  email,
  date,
  time,
  total,
  paymentMethod,
  status,
  id,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const handleStatusChange = async (orderId, newStatus) => {
    if (onStatusChange) {
      await onStatusChange(orderId, newStatus);
    }
  };

  return (
    <div className="summary-card">
      <div className="summary-checkbox">
        <input type="checkbox" />
      </div>
      <div className="summary-order">
        <strong
          className="clickable-order-id"
          onClick={() => navigate(`/admin/orders/${id}`)}
        >
          {orderId}
        </strong>
        <span>{itemCount}</span>
      </div>
      <div className="summary-customer">
        <strong>{customerName}</strong>
        <span>{email}</span>
      </div>
      <div className="summary-date">
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="summary-total">
        <span>{total}</span>
        <span>{paymentMethod}</span>
      </div>
      <div className="summary-status">
        <OrderStatusStamp status={status} />
      </div>
      <div className="summary-actions">
        <StatusDropdown
          currentStatus={status}
          orderId={id}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default SummaryCard;
