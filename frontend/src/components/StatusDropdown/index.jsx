import "./styles.css";
import { useState, useEffect, useRef } from "react";

const StatusDropdown = ({ currentStatus, orderId, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = [
    { value: "pending", label: "Pending", color: "#ffa500" },
    { value: "paid", label: "Paid", color: "#00cccc" },
    { value: "packed", label: "Packed", color: "#2196f3" },
    { value: "shipped", label: "Shipped", color: "#4caf50" },
  ];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      await onStatusChange(orderId, newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to change status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStatusOption = () => {
    return (
      statusOptions.find((option) => option.value === currentStatus) || {
        value: currentStatus,
        label: currentStatus,
        color: "#666",
      }
    );
  };

  const currentOption = getCurrentStatusOption();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="status-dropdown" ref={dropdownRef}>
      <button
        className={`status-button ${currentStatus}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        style={{ borderColor: currentOption.color }}
      >
        <span
          className="status-indicator"
          style={{ backgroundColor: currentOption.color }}
        ></span>
        {loading ? "Updating..." : currentOption.label}
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="status-dropdown-menu">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              className={`status-option ${
                option.value === currentStatus ? "current" : ""
              }`}
              onClick={() => handleStatusChange(option.value)}
              disabled={loading}
            >
              <span
                className="status-indicator"
                style={{ backgroundColor: option.color }}
              ></span>
              {option.label}
              {option.value === currentStatus && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
