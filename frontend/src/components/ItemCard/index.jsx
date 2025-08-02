import React from "react";
import "./styles.css";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";

const ItemCard = ({ id, img, title, description, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id: id,
      img,
      title,
      description,
      price,
    };
    addToCart(product);
  };

  return (
    <div className="item-card">
      <div className="image-wrapper">
        <img src={img} alt={title} />
      </div>
      <div className="cardinfo-wrapper">
        <p className="card-title">{title}</p>
        <p className="card-desc">{description}</p>
        <div className="price-add">
          <p className="price">${price}</p>

          <button className="add-to-cart" onClick={handleAddToCart}>
            <FaCartArrowDown />
            <p>Add</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
