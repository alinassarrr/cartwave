import "./styles.css";

const TableHeaderRow = () => {
  return (
    <div className="table-header-row">
      <div className="th checkbox-col">
        <input type="checkbox" disabled />
      </div>
      <div className="th">Order #</div>
      <div className="th">Customer</div>
      <div className="th">Date</div>
      <div className="th">Total</div>
      <div className="th">Status</div>
      <div className="th">Actions</div>
    </div>
  );
};

export default TableHeaderRow;
