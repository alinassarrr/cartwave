import React, { useState } from "react";
import "./styles.css";
import { FaCartArrowDown, FaEye, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ id, img, title, description, price, variants }) => {
  const { addToCart, isProductInCart } = useCart();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  // if product already in the cart
  const isInCart = isProductInCart(id);

  const handleViewDetails = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = async () => {
    setIsAdding(true);

    const cartItem = {
      id: id,
      productId: id,
      title,
      price,
      image: img,
      quantity: 1,
      color: variants?.color?.[0] || null,
      size: variants?.size?.[0] || null,
    };

    addToCart(cartItem);
  };

  const handleViewInCart = () => {
    navigate("/cart");
  };

  return (
    <div className="item-card">
      <div className="image-wrapper" onClick={handleViewDetails}>
        <img src={img} alt={title} />
        <div className="image-overlay">
          <button className="view-details-btn">
            <FaEye />
            <span>View Details</span>
          </button>
        </div>
      </div>

      <div className="cardinfo-wrapper">
        <p className="card-title">{title}</p>
        <p className="card-desc">{description}</p>

        <div className="price-add">
          <p className="price">${price}</p>

          <div className="action-buttons">
            {isInCart ? (
              <button className="view-in-cart-btn" onClick={handleViewInCart}>
                <FaShoppingCart />
                <span>View in Cart</span>
              </button>
            ) : (
              <button
                className={`add-to-cart ${isAdding ? "adding" : ""}`}
                onClick={handleAddToCart}
              >
                <>
                  <FaCartArrowDown />
                  <span>Add to Cart</span>
                </>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
