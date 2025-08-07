import "./styles.css";

const OrderFilters = ({
  status,
  setStatus,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  search,
  setSearch,
}) => {
  return (
    <div className="order-filters">
      <div className="filter-group">
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="packed">Packed</option>
          <option value="shipped">Shipped</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Date From</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Date To</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      <div className="filter-group search-group">
        <label>Search</label>
        <input
          type="text"
          placeholder="Order #, Customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default OrderFilters;
