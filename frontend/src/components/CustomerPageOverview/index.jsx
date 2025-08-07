import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import CustomerRow from "../CustomerRow";
// import axios from "axios";
import "./styles.css";

const CustomerPageOverview = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    /*
    axios.get("https://your-backend-url.com/api/users")
      .then((res) => {
        const users = res.data;
        const filtered = users.filter(user => user.role === "user");
        setCustomers(filtered);
      })
      .catch((err) => console.error("API error:", err));
    */

    // Mock data
    setCustomers([
      {
        id: 1,
        name: "Salem Beyrouti",
        email: "salem@example.com",
        address: "Beirut, Lebanon",
        totalOrders: 5,
      },
      {
        id: 2,
        name: "Jana Ahmad",
        email: "jana@example.com",
        address: "Tripoli, Lebanon",
        totalOrders: 2,
      },
      {
        id: 3,
        name: "Salem Beyrouti",
        email: "salem@example.com",
        address: "Beirut, Lebanon",
        totalOrders: 5,
      },
      {
        id: 4,
        name: "Salem Beyrouti",
        email: "salem@example.com",
        address: "Beirut, Lebanon",
        totalOrders: 5,
      },
      {
        id: 5,
        name: "Salem Beyrouti",
        email: "salem@example.com",
        address: "Beirut, Lebanon",
        totalOrders: 5,
      },
    ]);
  }, []);

  return (
    <div className="customer-overview">
      <SectionHeader
        title="Customers"
        subtitle="List of all registered customers and their order history"
      />

      <div className="customers-table">
        <div className="customers-header-row">
          <span>Name</span>
          <span>Email</span>
          <span>Address</span>
          <span>Total Orders</span>
        </div>

        {customers.map((customer) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerPageOverview;
