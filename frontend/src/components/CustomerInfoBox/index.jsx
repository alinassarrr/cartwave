import "./styles.css";

const CustomerInfoBox = ({ customer }) => {
  return (
    <div className="customer-info-box">
      <h3>Customer Information</h3>

      <div className="customer-info">
        <div className="info-row">
          <span className="label">Name:</span>
          <span className="value">{customer.name}</span>
        </div>

        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{customer.email}</span>
        </div>

        <div className="info-row">
          <span className="label">Phone:</span>
          <span className="value">{customer.phone}</span>
        </div>

        <div className="info-row">
          <span className="label">Total Orders:</span>
          <span className="value">{customer.totalOrders}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoBox;
