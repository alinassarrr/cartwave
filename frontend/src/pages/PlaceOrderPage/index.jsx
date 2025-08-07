import React, { useState } from "react";
// import { useCart } from "../../contexts/CartContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../store/cart/slice";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import EmptyCart from "./EmptyCart";
import "./styles.css";
import { ordersService } from "../../api/orders";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  // const { cart, getCartTotal, getCartCount, clearCart } = useCart();

  const createOrderAPI = async (orderData) => {
    try {
      const response = await ordersService.createOrder(orderData);
      return { ...response, fromAPI: true };
    } catch (error) {
      console.error("Failed to create order via API:", error);
      throw new Error("Failed to place order");
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Lebanon",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    // if (!formData.state.trim()) newErrors.state = "State is required";
    // if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    setErrors(newErrors);
    console.log("Validation errors:", newErrors); // Add this line
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Add this line
  };

  const handlePlaceOrder = async () => {
    console.log("Place Order button clicked!");
    if (!validateForm()) return;
    console.log("Form validation passed!");

    setIsSubmitting(true);

    try {
      // Create order data in the format expected by the backend
      const orderData = {
        total_amount: cartTotal,
        payment_method: "cash_on_delivery",
        notes: "",
        shipping_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
        },
        billing_address: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
        },
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      let result;
      try {
        result = await createOrderAPI(orderData);
        console.log("order placed successfully", result);
      } catch (apiError) {
        console.warn("API failed, using localStorage fallback:", apiError);

        const existingOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );
        const updatedOrders = [...existingOrders, orderData];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        result = { orderId: orderData.orderId, success: true };
      }

      // Get existing orders from localStorage
      // const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

      // Add new order to the array
      // const updatedOrders = [...existingOrders, orderData];

      // Save back to localStorage
      // localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // Clear the cart after successful order
      dispatch(clearCart());

      // Show success message
      const message = result.fromAPI
        ? `Order placed successfully! Order Number: ${
            result.order_number || "N/A"
          }`
        : `Order placed successfully (offline mode)! Order ID: ${
            result.orderId || "N/A"
          }`;
      alert(message);

      // Navigate to orders page or home
      navigate("/orders");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container order-placement">
      <div className=" container order-header">
        <div className="back-cart" onClick={() => navigate("/cart")}>
          <BsArrowLeftCircle />
        </div>
        <h1>Place Your Order</h1>
      </div>
      <div className="order-content container">
        <OrderForm
          formData={formData}
          handleInputChange={handleInputChange}
          errors={errors}
        />
        <OrderSummary
          onPlaceOrder={handlePlaceOrder}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPage;
