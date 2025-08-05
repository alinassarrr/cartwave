import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="container order-placement">
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products to place an order</p>
        <button
          onClick={() => navigate("/products")}
          className="continue-shopping"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
