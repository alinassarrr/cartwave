import { useCart } from "../../contexts/CartContext";
import Counter from "./Counter";
import "./styles.css";
import { BsTrash } from "react-icons/bs";

const CartItemCard = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQty) => {
    updateQuantity(item.id, newQty);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const total = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item-card">
      <div className="item-img">
        <img src={item.image} alt={item.title} />
      </div>

      <div className="item-details">
        <p className="item-title">{item.title}</p>
        <p className="item-decs">{item.description}</p>
        <p className="item-price">$ {item.price}</p>
      </div>

      <div className="item-actions">
        <Counter initial={item.quantity} onChange={handleQuantityChange} />

        <div className="total-price">${total}</div>

        <div className="remove" onClick={handleRemove}>
          <BsTrash color="red" size={18} />
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
