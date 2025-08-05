import Button from "../Button";
import React, { useState } from "react";
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
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  const handleStatusChange = async (newStatus) => {
    setLocalStatus(newStatus);

    // try {
    //   const response = awai axios.put (`status api/${orderId}/status`, {status: newStatus,});
    //   console.log("updated", response.data);
    // } catch (error) {
    //   console.error("failed", error);
    // }
  };

  return (
    <div className="summary-card">
      <div className="summary-checkbox">
        <input type="checkbox" />
      </div>
      <div className="summary-order">
        <strong
          className="clickable-order-id"
          onClick={() => navigate(`/admin/orders/${orderId.replace("#", "")}`)}
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
        <OrderStatusStamp status={localStatus} />
      </div>
      <div className="summary-actions">
        <Button
          text={localStatus}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="action-button"
        />
        {isDropdownOpen && (
          <StatusDropdown
            currentStatus={localStatus}
            onSelect={handleStatusChange}
            onClose={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
