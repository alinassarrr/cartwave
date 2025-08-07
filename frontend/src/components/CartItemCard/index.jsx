// import { useCart } from "../../contexts/CartContext";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../store/cart/slice";
import Counter from "./Counter";
import "./styles.css";
import { BsTrash } from "react-icons/bs";

const CartItemCard = ({ item }) => {
  // const { updateQuantity, removeFromCart } = useCart();
  const dispatch = useDispatch();

  const handleQuantityChange = (newQty) => {
    // updateQuantity(item.id, newQty);
    dispatch(updateQuantity({ id: item.id, quantity: newQty }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
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
