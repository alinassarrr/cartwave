import { useEffect, useState } from "react";
import SummaryCard from "../SummaryCard";
import OrderFilters from "../OrderFilters";
import "./styles.css";
import TableHeaderRow from "../TableHeaderRow";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // axios.get ("/api/orders")
    // .then ((res) => {
    //     setOrders(res.data);
    //     setLoading(false);
    // })
    // .catch((err) => {
    //     console.error("failed to fetch orders", err);
    //     setLoading(false);
    // });

    const mockOrders = [
      {
        orderId: "#ORD-2025-001",
        itemCount: "3 items",
        customerName: "Salem Beyrouti",
        email: "salem_beyrouti@hotmail.com",
        date: "Jan 26, 2025",
        time: "10:30 AM",
        total: "$299.99",
        paymentMethod: "Credit Card",
        status: "Pending",
      },
      {
        orderId: "#ORD-2025-001",
        itemCount: "3 items",
        customerName: "Salem Beyrouti",
        email: "salem_beyrouti@hotmail.com",
        date: "Jan 26, 2025",
        time: "10:30 AM",
        total: "$299.99",
        paymentMethod: "Credit Card",
        status: "Delivered",
      },
      {
        orderId: "#ORD-2025-001",
        itemCount: "3 items",
        customerName: "Salem Beyrouti",
        email: "salem_beyrouti@hotmail.com",
        date: "Jan 26, 2025",
        time: "10:30 AM",
        total: "$299.99",
        paymentMethod: "Credit Card",
        status: "Shipped",
      },
      {
        orderId: "#ORD-2025-001",
        itemCount: "3 items",
        customerName: "Salem Beyrouti",
        email: "salem_beyrouti@hotmail.com",
        date: "Jan 26, 2025",
        time: "10:30 AM",
        total: "$299.99",
        paymentMethod: "Credit Card",
        status: "Pending",
      },
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading..</div>;

  return (
    <>
      <div className="filters">
        <h3>Filters</h3>
        <OrderFilters
          status={status}
          setStatus={setStatus}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          search={search}
          setSearch={setSearch}
        />
      </div>
      <TableHeaderRow />
      <div className="summary-list">
        {orders.map((o, i) => (
          <SummaryCard
            key={i}
            {...o}
            onActionClick={() => console.log(`Change status of ${o.orderId}`)}
          />
        ))}
      </div>
    </>
  );
};

export default OrdersManagement;
