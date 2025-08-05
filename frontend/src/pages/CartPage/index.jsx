import React from "react";
// import { useCart } from "../../contexts/CartContext";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../store/cart/slice";
import CartItemCard from "../../components/CartItemCard";
import "./styles.css";
import { BsTrash } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  // const { cart, getCartTotal, clearCart } = useCart();
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigate = () => {
    navigate("/orders");

  const handleClearCart = () => {
    dispatch(clearCart());

  };
  if (cart.length === 0) {
    return (
      <div className="container cart-page">
        <div className="empty">
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container cart-header">
        <h1>Shopping Cart</h1>
      </div>

      <div className="container cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleNavigate}>
            Proceed to Checkout
          </button>
        </div>
        <div className="bottom-cart">
          <div className="back-cart" onClick={handleBack}>
            <BsArrowLeftCircle />
            <p>Go back Shopping</p>
          </div>
          <div className="clear-cart" onClick={handleClearCart}>
            <BsTrash />
            <p>Clear Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
