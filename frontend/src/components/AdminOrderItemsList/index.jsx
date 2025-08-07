import "./styles.css";
import { FaBox } from "react-icons/fa6";

const AdminOrderItemsList = ({ items }) => {
  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.style.display = "none";
    e.target.nextSibling.style.display = "block";
  };
  return (
    <div className="order-items-list">
      <h3>Order Items</h3>

      {items.map((item, index) => (
        <div key={index} className="order-item">
          <div className="item-left">
            {item.image ? (
              <>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={handleImageError}
                />
                <div className="item-placeholder" style={{ display: "none" }}>
                  <span>
                    <FaBox />
                  </span>
                </div>
              </>
            ) : (
              <div className="item-placeholder">
                <span>
                  <FaBox />
                </span>
              </div>
            )}
            <div className="item-info">
              <strong>{item.name}</strong>
              <span className="sku">{item.sku}</span>
            </div>
          </div>

          <div className="item-right">
            <span>{item.quantity}x</span>
            <span className="price">
              ${(Number(item.price) || 0).toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderItemsList;
