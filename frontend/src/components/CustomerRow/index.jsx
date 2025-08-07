import React from "react";
import "./styles.css";

const CustomerRow = ({ customer }) => {
  return (
    <div className="customer-row">
      <span>{customer.name}</span>
      <span>{customer.email}</span>
      <span>{customer.address}</span>
      <span>{customer.totalOrders}</span>
    </div>
  );
};

export default CustomerRow;
