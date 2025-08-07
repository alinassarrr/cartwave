import { useEffect, useState } from "react";
import SummaryCard from "../SummaryCard";
import OrderFilters from "../OrderFilters";
import StatusDropdown from "../StatusDropdown";
import { adminService } from "../../api/admin";
import "./styles.css";
import TableHeaderRow from "../TableHeaderRow";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const filters = {
        status: status || undefined,
        search: search || undefined,
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        page: pagination.current_page,
      };

      const response = await adminService.getOrders(filters);
      const data = response.data || response;

      if (data.data) {
        // Paginated response
        setOrders(
          data.data.map((order) => ({
            orderId: order.order_number || `#${order.id}`,
            itemCount: `${order.items?.length || 0} items`,
            customerName:
              `${order.user?.first_name || ""} ${
                order.user?.last_name || ""
              }`.trim() || "Unknown Customer",
            email: order.user?.email || "No email",
            date: new Date(order.created_at).toLocaleDateString(),
            time: new Date(order.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            total: `$${order.total?.toLocaleString() || "0"}`,
            paymentMethod: "Cash on Delivery", // Default since we don't have this field
            status: order.status,
            id: order.id,
          }))
        );
        setPagination({
          current_page: data.current_page || 1,
          last_page: data.last_page || 1,
          total: data.total || 0,
        });
      } else if (Array.isArray(data)) {
        // Direct array response
        setOrders(
          data.map((order) => ({
            orderId: order.order_number || `#${order.id}`,
            itemCount: `${order.items?.length || 0} items`,
            customerName:
              `${order.user?.first_name || ""} ${
                order.user?.last_name || ""
              }`.trim() || "Unknown Customer",
            email: order.user?.email || "No email",
            date: new Date(order.created_at).toLocaleDateString(),
            time: new Date(order.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            total: `$${order.total?.toLocaleString() || "0"}`,
            paymentMethod: "Cash on Delivery",
            status: order.status,
            id: order.id,
          }))
        );
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    try {
      await adminService.updateOrderStatus(orderId, newStatus);
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (err) {
      console.error("Error updating order status:", err);
      fetchOrders();
      alert("Failed to update order status - reverting changes");
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }));
  };

  useEffect(() => {
    fetchOrders();
  }, [status, dateFrom, dateTo, search, pagination.current_page]);

  if (loading) return <div>Loading orders...</div>;

  if (error) return <div className="error">{error}</div>;

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
        {orders.length > 0 ? (
          orders.map((order, i) => (
            <SummaryCard
              key={order.id || i}
              {...order}
              onStatusChange={handleStatusChange}
            />
          ))
        ) : (
          <div className="no-orders">No orders found</div>
        )}
      </div>

      {pagination.last_page > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page <= 1}
            className="pagination-btn"
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {pagination.current_page} of {pagination.last_page}(
            {pagination.total} total orders)
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page >= pagination.last_page}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default OrdersManagement;
