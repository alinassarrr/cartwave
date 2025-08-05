import "./styles.css";

const AdminOrderItemsList = ({ items }) => {
  return (
    <div className="order-items-list">
      <h3>Order Items</h3>

      {items.map((item, index) => (
        <div key={index} className="order-item">
          <div className="item-left">
            {item.image ? (
              <img src={item.image} alt={item.name} />
            ) : (
              <div className="item-placeholder"></div>
            )}
            <div className="item-info">
              <strong>{item.name}</strong>
              <span className="sku">{item.sku}</span>
            </div>
          </div>

          <div className="item-right">
            <span>{item.quantity}x</span>
            <span className="price">${item.price.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderItemsList;
