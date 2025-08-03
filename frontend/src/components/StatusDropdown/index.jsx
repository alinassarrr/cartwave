import React from "react";
import "./styles.css";

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Paid",
];

const StatusDropdown = ({ currentStatus, onSelect, onClose }) => {
  const handleChange = (e) => {
    const newStatus = e.target.value;
    onSelect(newStatus);
    onClose();
  };

  return (
    <div className="status-dropdown">
      <select
        value={currentStatus}
        onChange={handleChange}
        autoFocus
        onBlur={onClose}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;
