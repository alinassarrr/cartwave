import React, { useState, useEffect } from "react";
import { BsSearch, BsEye } from "react-icons/bs";
import "./styles.css";
import OrderStatusStamp from "../../OrderStatusStamp";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Mock data for orders
  const mockOrders = [
    {
      orderId: "ORD-2024-001",
      orderDate: "2024-01-15T10:30:00Z",
      status: "Pending",
      customer: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@email.com",
      },
      totals: {
        total: 299.99,
        itemCount: 3,
      },
      items: [
        { name: "Nike Air Max", quantity: 1, price: 129.99 },
        { name: "Adidas T-Shirt", quantity: 2, price: 85.0 },
      ],
    },
    {
      orderId: "ORD-2024-002",
      orderDate: "2024-01-20T14:15:00Z",
      status: "Paid",
      customer: {
        firstName: "Sarah",
        lastName: "Wilson",
        email: "sarah.wilson@email.com",
      },
      totals: {
        total: 189.5,
        itemCount: 2,
      },
      items: [
        { name: "Puma Sneakers", quantity: 1, price: 89.99 },
        { name: "Under Armour Hoodie", quantity: 1, price: 99.51 },
      ],
    },
    {
      orderId: "ORD-2024-003",
      orderDate: "2024-01-25T09:45:00Z",
      status: "Shipped",
      customer: {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@email.com",
      },
      totals: {
        total: 450.0,
        itemCount: 4,
      },
      items: [
        { name: "Jordan Retro", quantity: 1, price: 180.0 },
        { name: "Nike Socks", quantity: 3, price: 90.0 },
      ],
    },
    {
      orderId: "ORD-2024-004",
      orderDate: "2024-01-28T16:20:00Z",
      status: "pending",
      customer: {
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@email.com",
      },
      totals: {
        total: 125.75,
        itemCount: 1,
      },
      items: [{ name: "Reebok Classic", quantity: 1, price: 125.75 }],
    },
    {
      orderId: "ORD-2024-005",
      orderDate: "2024-01-30T11:10:00Z",
      status: "cancelled",
      customer: {
        firstName: "David",
        lastName: "Miller",
        email: "david.miller@email.com",
      },
      totals: {
        total: 89.99,
        itemCount: 1,
      },
      items: [{ name: "Converse Chuck Taylor", quantity: 1, price: 89.99 }],
    },
    {
      orderId: "ORD-2024-006",
      orderDate: "2024-02-02T13:25:00Z",
      status: "delivered",
      customer: {
        firstName: "Lisa",
        lastName: "Garcia",
        email: "lisa.garcia@email.com",
      },
      totals: {
        total: 320.0,
        itemCount: 2,
      },
      items: [
        { name: "New Balance 990", quantity: 1, price: 190.0 },
        { name: "Nike Dri-FIT Shorts", quantity: 1, price: 130.0 },
      ],
    },
    {
      orderId: "ORD-2024-007",
      orderDate: "2024-02-05T08:40:00Z",
      status: "shipped",
      customer: {
        firstName: "Alex",
        lastName: "Taylor",
        email: "alex.taylor@email.com",
      },
      totals: {
        total: 275.5,
        itemCount: 3,
      },
      items: [
        { name: "Adidas Ultraboost", quantity: 1, price: 180.0 },
        { name: "Nike Cap", quantity: 1, price: 25.5 },
        { name: "Puma Socks", quantity: 1, price: 70.0 },
      ],
    },
    {
      orderId: "ORD-2024-008",
      orderDate: "2024-02-08T15:55:00Z",
      status: "pending",
      customer: {
        firstName: "Rachel",
        lastName: "Anderson",
        email: "rachel.anderson@email.com",
      },
      totals: {
        total: 199.99,
        itemCount: 2,
      },
      items: [
        { name: "Vans Old Skool", quantity: 1, price: 69.99 },
        { name: "Adidas Track Jacket", quantity: 1, price: 130.0 },
      ],
    },
  ];

  useEffect(() => {
    // Set mock orders instead of reading from localStorage
    setOrders(mockOrders);
  }, []);

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        order.customer.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [orders, searchTerm]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // const handleViewOrder = (order) => {
  //   // In a real app, this would navigate to a detailed order view
  //   alert(
  //     `Order Details for ${order.orderId}\nTotal: $${order.totals.total.toFixed(
  //       2
  //     )}\nStatus: ${order.status}\nItems: ${order.totals.itemCount}`
  //   );
  // };

  return (
    <div className="orders-list-section">
      <div className="search-section">
        <div className="search-container">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search orders by ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <h4>{orders.length}</h4>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <h4>{orders.filter((o) => o.status === "delivered").length}</h4>
          <p>Delivered</p>
        </div>
        <div className="stat-card">
          <h4>
            ${orders.reduce((sum, o) => sum + o.totals.total, 0).toFixed(2)}
          </h4>
          <p>Total Spent</p>
        </div>
      </div>

      <div className="orders-container">
        <h3>Order History</h3>
        {filteredOrders.length === 0 ? (
          <div className="empty-orders">
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-head">
                  <h4>#{order.orderId}</h4>
                  <OrderStatusStamp status={order.status} />
                </div>

                <div className="order-details">
                  <p>
                    <strong>Date:</strong> {formatDate(order.orderDate)}
                  </p>
                  <p>
                    <strong>Items:</strong> {order.totals.itemCount}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.totals.total.toFixed(2)}
                  </p>
                </div>

                <div className="view">
                  <button className="view-btn">
                    <BsEye />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
